import PostCard from "@/components/PostCard";
import Bounded from "@/components/layout/Bounded";
import PrismicImageWithPlaceholder from "@/components/server/PrismicImageWithPlaceholder";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

/**
 * Props for `BlogPreview`.
 */
export type BlogPreviewProps = SliceComponentProps<Content.BlogPreviewSlice>;

const ScrollTo = dynamic(() => import("@/components/ScrollTo"), {
  ssr: false
});

/**
 * Component for "BlogPreview" Slices.
 */
const BlogPreview = ({ slice }: BlogPreviewProps): JSX.Element => {
  return (
    <Bounded
      className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="hidden lg:block">
        <PrismicImageWithPlaceholder
          field={slice.primary.image}
          className="h-full w-auto rounded object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <h3 className="mx-auto w-max bg-gray-100 px-4 text-2xl uppercase">
            {slice.primary.heading}
          </h3>
          <hr className="absolute left-0 right-0 top-1/2 -z-10 -translate-y-1/2" />
        </div>

        <div className="no-scrollbar flex gap-4 overflow-y-hidden overflow-x-scroll">
          {slice.items.map(async (item, idx: number) => {
            if (!isFilled.contentRelationship(item.post)) {
              return null;
            }

            const client = createClient();
            const post: Content.BlogPostDocument = await client.getByID(
              item.post.id,
            );

            return (
              <div
                key={(slice.items[0].post as { id: string }).id + idx}
                id={(slice.items[0].post as { id: string }).id + idx}
                className="min-w-full md:min-w-[calc(50%_-_8px)]"
              >
                <PostCard
                  last_publication_date={post.last_publication_date}
                  meta_description={post.data.meta_description}
                  meta_image={post.data.meta_image}
                  meta_title={post.data.meta_title}
                  uid={post.uid}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-1">
          {slice.items.map((item, idx: number) => {
            if (!isFilled.contentRelationship(item.post)) {
              return null;
            }

            return (
              <ScrollTo
                skip={2}
                count={slice.items.length}
                id={(slice.items[0].post as { id: string }).id + idx}
                key={(slice.items[0].post as { id: string }).id + idx}
              />
            );
          })}
        </div>
      </div>
    </Bounded>
  );
};

export default BlogPreview;
