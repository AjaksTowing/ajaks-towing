import Bounded from "@/components/layout/Bounded";
import PrismicImageWithPlaceholder from "@/components/server/PrismicImageWithPlaceholder";
import { Content, isFilled } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner = ({ slice }: BannerProps): JSX.Element => {
  return (
    <section
      className={clsx("relative", slice.variation === "textBottom" && "mb-36")}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.image(slice.primary.background_image) && (
        <div className="relative">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-70" />

          <PrismicImageWithPlaceholder
            field={slice.primary.background_image}
            className={clsx(
              slice.variation === "textBottom" ? "h-[66vh]" : "h-screen",
            )}
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 top-0">
        <Bounded>
          <div
            className={clsx(
              "absolute flex w-full -translate-y-1/2 flex-col justify-center gap-6 border-t-4 border-[#DD841C] p-10 shadow",
              slice.variation === "textBottom"
                ? "top-full line-clamp-3 max-w-[90%] bg-white md:line-clamp-4 md:max-w-[60%]"
                : "top-1/2 aspect-[5/3] max-w-xs bg-white/90 md:max-w-md",
            )}
          >
            {slice.variation === "textBottom" && slice.primary.tagline && (
              <span className="font-light text-[#DD841C]">
                {slice.primary.tagline}
              </span>
            )}
            {isFilled.richText(slice.primary.heading) && (
              <h1
                className={clsx(
                  "text-3xl",
                  slice.variation === "textBottom" && "text-balance",
                )}
              >
                <PrismicText field={slice.primary.heading} />
              </h1>
            )}
            {slice.variation === "default" &&
              isFilled.richText(slice.primary.body) && (
                <p className="text-gray-800">
                  <PrismicText field={slice.primary.body} />
                </p>
              )}
          </div>
        </Bounded>
      </div>
    </section>
  );
};

export default Banner;
