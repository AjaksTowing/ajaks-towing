"use client";

import { cn } from "@/cn";
import { useEffect, useState } from "react";
import { BlogPostDocument } from "../../prismicio-types";
import PostCard from "./PostCard";

type ClientSideBlogPostsProps = {
  initialCount: number;
};

export default function ClientSideBlogPosts(props: ClientSideBlogPostsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [posts, setPosts] = useState<BlogPostDocument[]>([]);

  const getPosts = async function (postCount: number) {
    setIsLoading(true);
    const request = await fetch("/api/posts", {
      method: "POST",
      cache: "force-cache",
      body: JSON.stringify({
        postCount,
      }),
      next: { tags: ["prismic"] },
    });

    try {
      // Check if you are out of posts
      const fetchedPosts = await request.json();

      if (postCount > fetchedPosts.length) {
        setReachedEnd(true);
      }

      setPosts(fetchedPosts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getMorePosts = () => {
    const postCount = props.initialCount + posts.length + 3;
    return getPosts(postCount);
  };

  useEffect(
    function () {
      getPosts(props.initialCount);
    },
    [props.initialCount],
  );

  return (
    <>
      <div className={cn(`grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8`)}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            last_publication_date={post.last_publication_date}
            meta_description={post.data.meta_description}
            meta_image={post.data.meta_image}
            meta_title={post.data.meta_title}
            uid={post.uid}
          />
        ))}
      </div>

      {isLoading && "Loading..."}

      <div className="flex w-full items-center justify-center py-16">
        {!reachedEnd ? (
          <button
            onClick={getMorePosts}
            className="border-2 border-current bg-transparent p-4 text-[#DD841C]"
          >
            LOAD MORE
          </button>
        ) : (
          <span>You have reached the end!</span>
        )}
      </div>
    </>
  );
}
