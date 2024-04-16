import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      className="relative mb-16 md:mb-48"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.image(slice.primary.background_image) && (
        <PrismicNextImage
          className="pointer-events-none h-screen w-screen object-cover"
          field={slice.primary.background_image}
        />
      )}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold">
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="text-5xl text-white">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.subheading) && (
          <h3 className="mt-6 text-3xl text-gray-200">
            <PrismicText field={slice.primary.subheading} />
          </h3>
        )}
      </div>
    </section>
  );
};

export default Hero;
