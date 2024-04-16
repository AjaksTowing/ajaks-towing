import { cn } from "@/cn";
import Bounded from "@/components/layout/Bounded";
import PrismicImageWithPlaceholder from "@/components/server/PrismicImageWithPlaceholder";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const ScrollTo = dynamic(() => import("@/components/ScrollTo"), {
  ssr: false
});

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex justify-center">
        <h3 className="mb-20 text-2xl font-medium">What Our Clients Say?</h3>
      </div>

      <div className={`no-scrollbar flex overflow-x-scroll`}>
        {slice.items.map((item, index) => (
          <div
            id={"testimonial_" + index}
            key={item.author_name}
            className={cn(
              "no-scrollbar min-w-full border-l border-r border-black/10 px-8 md:min-w-[33.3%]",
            )}
          >
            <PrismicText field={item.testimonial} />

            <div className="mt-7 flex gap-2">
              <PrismicImageWithPlaceholder
                field={item.author_image}
                className="size-10 max-w-10 rounded-full"
              />

              <div className="flex flex-col">
                <p>
                  <strong>{item.author_name}</strong>
                </p>
                <span className="text-xs">{item.author_tagline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center gap-1">
        {slice.items.map((item, idx: number) => {
          return (
            <ScrollTo
              skip={3}
              count={slice.items.length}
              id={"testimonial_" + idx}
              key={"testimonial_" + idx}
            />
          );
        })}
      </div>
    </Bounded>
  );
};

export default Testimonials;
