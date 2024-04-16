import { createClient } from "@/prismicio";
import { MetadataRoute } from "next";
import {
  BlogPostDocument,
  PageDocument,
  ServicePageDocument,
} from "../../prismicio-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // Getting all the documents from the Prismic Repository
  const pages: PageDocument[] = await client.getAllByType("page");
  const posts: BlogPostDocument[] = await client.getAllByType("blog_post");
  const services: ServicePageDocument[] =
    await client.getAllByType("service_page");

  // Define a path for every Document.
  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.SITE_URL}${page.url}`,
    priority: page.url === "/" ? 1 : 0.5,
    lastModified: new Date(page.last_publication_date),
  }));

  // Define paths for every Blog Post
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.SITE_URL}/blog/${post.uid}`,
    priority: 0.7,
    lastModified: new Date(post.last_publication_date),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${process.env.SITE_URL}/services/${service.uid}`,
    priority: 0.8,
    lastModified: new Date(service.last_publication_date),
  }));

  return [...pageEntries, ...postEntries, ...serviceEntries].sort(
    (a, b) => b.priority! - a.priority!,
  );
}

export const revalidate = 0;
