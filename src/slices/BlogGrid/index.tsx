import ClientSideBlogPosts from "@/components/ClientSideBlogPosts";
import Bounded from "@/components/layout/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BlogGrid`.
 */
export type BlogGridProps = SliceComponentProps<Content.BlogGridSlice>;

/**
 * Component for "BlogGrid" Slices.
 */
const BlogGrid = async ({ slice }: BlogGridProps): Promise<JSX.Element> => {
  const { posts_count } = slice.primary;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ClientSideBlogPosts initialCount={+(posts_count ?? 6)} />
    </Bounded>
  );
};

export default BlogGrid;
