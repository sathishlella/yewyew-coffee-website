"use server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import {
  ApifyInstagramItem,
  InstagramPost,
  InstagramPostType,
  SyncInstagramResult
} from "@/types/instagram";

type ApifyRunResponse = {
  data?: {
    id: string;
    status: "READY" | "RUNNING" | "SUCCEEDED" | "FAILED" | "TIMED-OUT" | "ABORTED";
    defaultDatasetId?: string;
  };
};

const APIFY_BASE_URL = "https://api.apify.com/v2";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}.`);
  return value;
}

function normalizeActorId(actorId: string) {
  return actorId.replace("/", "~");
}

async function fetchJson<T>(url: string, init: RequestInit = {}, timeoutMs = 60000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {})
      }
    });

    const bodyText = await response.text();
    if (!response.ok) {
      throw new Error(`Request failed ${response.status}: ${bodyText.slice(0, 500)}`);
    }

    return bodyText ? (JSON.parse(bodyText) as T) : ({} as T);
  } finally {
    clearTimeout(timeout);
  }
}

function toPostType(item: ApifyInstagramItem): InstagramPostType {
  const raw = `${item.type ?? ""} ${item.productType ?? ""}`.toLowerCase();
  if (item.isVideo || raw.includes("video") || raw.includes("reel")) return "Video";
  return "Image";
}

function pickDisplayUrl(item: ApifyInstagramItem) {
  if (item.displayUrl) return item.displayUrl;
  if (item.imageUrl) return item.imageUrl;
  if (item.images?.[0]) return item.images[0];
  if (item.videoUrl) return item.videoUrl;
  return null;
}

function normalizeItems(items: ApifyInstagramItem[]): InstagramPost[] {
  return items
    .flatMap((item) => item.latestPosts ?? item)
    .map((item) => {
      const displayUrl = pickDisplayUrl(item);
      const id = item.id ?? item.shortCode;
      if (!id || !displayUrl) return null;

      return {
        id,
        displayUrl,
        caption: item.caption ?? item.text ?? null,
        timestamp: item.timestamp ?? item.takenAt ?? new Date().toISOString(),
        type: toPostType(item)
      } satisfies InstagramPost;
    })
    .filter((item): item is InstagramPost => item !== null);
}

async function waitForRun({
  token,
  runId,
  initial
}: {
  token: string;
  runId: string;
  initial: NonNullable<ApifyRunResponse["data"]>;
}) {
  let run = initial;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (run.status === "SUCCEEDED") return run;
    if (["FAILED", "TIMED-OUT", "ABORTED"].includes(run.status)) {
      throw new Error(`Apify run ${runId} ended with status ${run.status}.`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    const next = await fetchJson<ApifyRunResponse>(
      `${APIFY_BASE_URL}/actor-runs/${runId}?token=${token}`,
      {},
      20000
    );
    if (!next.data) throw new Error(`Apify run ${runId} returned an empty status payload.`);
    run = next.data;
  }

  throw new Error(`Apify run ${runId} did not finish before the polling timeout.`);
}

export async function syncInstagram(): Promise<SyncInstagramResult> {
  const token = requiredEnv("APIFY_TOKEN");
  const profile = requiredEnv("APIFY_INSTAGRAM_PROFILE");
  const actorId = normalizeActorId(process.env.APIFY_INSTAGRAM_ACTOR ?? "apify/instagram-scraper");
  const resultsLimit = Number(process.env.APIFY_INSTAGRAM_RESULTS_LIMIT ?? "24");

  try {
    const runResponse = await fetchJson<ApifyRunResponse>(
      `${APIFY_BASE_URL}/acts/${actorId}/runs?token=${token}&waitForFinish=60`,
      {
        method: "POST",
        body: JSON.stringify({
          directUrls: [`https://www.instagram.com/${profile.replace(/^@/, "")}/`],
          resultsType: "posts",
          resultsLimit,
          addParentData: false,
          searchType: "user"
        })
      },
      70000
    );

    if (!runResponse.data?.id) {
      throw new Error("Apify did not return a run id.");
    }

    const run = await waitForRun({
      token,
      runId: runResponse.data.id,
      initial: runResponse.data
    });

    if (!run.defaultDatasetId) {
      throw new Error(`Apify run ${run.id} succeeded without a defaultDatasetId.`);
    }

    const items = await fetchJson<ApifyInstagramItem[]>(
      `${APIFY_BASE_URL}/datasets/${run.defaultDatasetId}/items?token=${token}&clean=true`,
      {},
      60000
    );
    const posts = normalizeItems(items);

    const rows = posts.map((post) => ({
      instagram_id: post.id,
      display_url: post.displayUrl,
      caption: post.caption,
      taken_at: post.timestamp,
      media_type: post.type,
      raw: post,
      updated_at: new Date().toISOString()
    }));

    if (rows.length === 0) {
      return {
        runId: run.id,
        datasetId: run.defaultDatasetId,
        fetched: items.length,
        upserted: 0,
        skipped: items.length
      };
    }

    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("cafe_assets")
      .upsert(rows, { onConflict: "instagram_id" });

    if (error) {
      throw new Error(`Supabase upsert failed: ${error.message}`);
    }

    return {
      runId: run.id,
      datasetId: run.defaultDatasetId,
      fetched: items.length,
      upserted: rows.length,
      skipped: Math.max(0, items.length - rows.length)
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Instagram sync error.";
    throw new Error(`syncInstagram failed: ${message}`);
  }
}
