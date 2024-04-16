import { cn } from "@/cn";
import Bounded from "@/components/layout/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";
import PrintIcon from "../../../public/assets/icons/print.png";
import ShareIcon from "../../../public/assets/icons/share.png";

/**
 * Props for `Body`.
 */
export type BodyProps = SliceComponentProps<Content.BodySlice>;

/**
 * Component for "Body" Slices.
 */
const Body = ({ slice }: BodyProps): JSX.Element => {
  return (
    <Bounded
      className="grid w-full md:grid-cols-[1fr_35ch]"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose max-w-full md:prose-xl 2xl:prose-2xl prose-li:marker:text-[#DD841C]">
        <PrismicRichText field={slice.primary.body} />
      </div>
      <div
        className={cn(
          "hidden w-full flex-col items-center gap-6 md:flex",
          slice.items.length == 0 && "md:hidden",
        )}
      >
        <div className="flex h-max gap-8">
          <Image src={ShareIcon} alt="Share" />
          <Image src={PrintIcon} alt="Print" />
        </div>

        <hr className="w-[65%] border-4 border-[#DD841C]" />

        <div className="w-[65%]">
          <div>
            <strong className="text-lg font-medium">Related Blogs</strong>
          </div>

          <div className="flex flex-col gap-5">
            {slice.items.map(async (item: any) => {
              if (!isFilled.contentRelationship(item.related_post)) {
                return null;
              }

              const client = createClient();
              const relatedPost: Content.BlogPostDocument =
                await client.getByID(item.related_post.id);

              return (
                <Link
                  className={
                    "my-4 border-b border-t border-black border-opacity-20 py-2"
                  }
                  href={"/blog/" + relatedPost.uid}
                  key={relatedPost.id}
                >
                  {relatedPost.data.meta_title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Body;
