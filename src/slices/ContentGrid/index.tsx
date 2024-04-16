import Bounded from "@/components/layout/Bounded";
import PrismicImageWithPlaceholder from "@/components/server/PrismicImageWithPlaceholder";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import {
  BlogPostDocument,
  PageDocument,
  ServicePageDocument,
} from "../../../prismicio-types";

/**
 * Props for `ContentGrid`.
 */
export type ContentGridProps = SliceComponentProps<Content.ContentGridSlice>;

/**
 * Component for "ContentGrid" Slices.
 */
const ContentGrid = ({ slice }: ContentGridProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative">
        <h3 className="mx-auto w-max bg-gray-100 px-4 text-2xl uppercase">
          <PrismicText field={slice.primary.heading} />
        </h3>
        <hr className="absolute left-0 right-0 top-1/2 -z-10 -translate-y-1/2" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {slice.items.map(async (item) => {
          if (!isFilled.contentRelationship(item.card)) return null;

          const client = createClient();
          const content: PageDocument | ServicePageDocument | BlogPostDocument =
            await client.getByID(item.card.id);

          return (
            <Link
              href={
                content.url
                  ? content.url
                  : content.type == "service_page"
                    ? `/services/${content.uid}`
                    : `/blog/${content.uid}`
              }
              className="relative overflow-hidden rounded"
              key={content.id}
            >
              <div>
                <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-end gap-2 bg-gradient-to-b from-black/50 to-black/90 p-5 text-white">
                  <h3 className="line-clamp-2 text-2xl">
                    {content.data.meta_title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {content.data.meta_description}
                  </p>

                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                    <span>Explore</span>
                  </div>
                </div>
              </div>

              <PrismicImageWithPlaceholder
                field={content.data.meta_image}
                className="aspect-[547/439] object-cover"
              />
            </Link>
          );
        })}
      </div>
    </Bounded>
  );
};

export default ContentGrid;
