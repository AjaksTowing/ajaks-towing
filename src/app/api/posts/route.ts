import { createClient } from "@/prismicio";
import { NextRequest } from "next/server";
import { BlogPostDocument } from "../../../../prismicio-types";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  if (!payload.postCount) {
    return Response.json([]);
  }

  const client = createClient();
  const blogPostDocuments: BlogPostDocument[] = await client.getAllByType(
    "blog_post",
    {
      limit: +payload.postCount.toString(),
    },
  );

  return Response.json(blogPostDocuments);
}
