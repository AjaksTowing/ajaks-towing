import VideoPlayer from "@/components/VideoPlayer";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `VideoBanner`.
 */
export type VideoBannerProps = SliceComponentProps<Content.VideoBannerSlice>;

/**
 * Component for "VideoBanner" Slices.
 */
const VideoBanner = ({ slice }: VideoBannerProps): JSX.Element => {
  return (
    <section
      className="relative my-16 md:my-32"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.keyText(slice.primary.videourl) && (
        <VideoPlayer slice={slice} />
      )}
    </section>
  );
};

export default VideoBanner;
