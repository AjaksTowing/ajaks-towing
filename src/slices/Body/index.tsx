import Bounded from "@/components/layout/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose max-w-full md:prose-xl 2xl:prose-2xl prose-li:marker:text-[#DD841C]">
        <PrismicRichText field={slice.primary.body} />
      </div>
    </Bounded>
  );
};

export default Body;
