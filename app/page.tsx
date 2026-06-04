import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";

const CafeExperience = dynamic(
  () => import("@/components/cafe-experience").then((mod) => mod.CafeExperience),
  { ssr: false }
);

export default function Home() {
  let images: string[] = [];
  
  try {
    const imagesDir = path.join(process.cwd(), "public/images/instagram");
    const files = fs.readdirSync(imagesDir);
    images = files
      .filter((file) => file.endsWith(".jpg") || file.endsWith(".png"))
      .slice(0, 16)
      .map((file) => `/images/instagram/${file}`);
  } catch (error) {
    console.error("Failed to read gallery images:", error);
  }

  return <CafeExperience instagramImages={images} />;
}
