import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity"; // Import the correct type

// Use environment variables for flexibility
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "cqs4hc57",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false, // Set to false for real-time updates
  apiVersion: "2023-01-01", // Use a stable API version
});

const builder = imageUrlBuilder(client);

// Correct type instead of `any`
export const urlFor = (source: Image) => builder.image(source);
