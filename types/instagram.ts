export type InstagramPostType = "Image" | "Video";

export interface InstagramPost {
  id: string;
  displayUrl: string;
  caption: string | null;
  timestamp: string;
  type: InstagramPostType;
}

export interface ApifyInstagramItem {
  id?: string;
  shortCode?: string;
  displayUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  url?: string;
  caption?: string;
  text?: string;
  timestamp?: string;
  takenAt?: string;
  type?: string;
  productType?: string;
  isVideo?: boolean;
  images?: string[];
  latestPosts?: ApifyInstagramItem[];
}

export interface SyncInstagramResult {
  runId: string;
  datasetId: string;
  fetched: number;
  upserted: number;
  skipped: number;
}
