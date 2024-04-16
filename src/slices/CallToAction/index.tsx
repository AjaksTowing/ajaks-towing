import Bounded from "@/components/layout/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      className="md:-my-8 md:mt-24"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex items-center justify-between rounded bg-gray-900 p-10 py-20">
        <div className="flex flex-col gap-4">
          <p className="text-gray-300">{slice.primary.tagline}</p>
          <h4 className="text-4xl text-white">{slice.primary.heading}</h4>
        </div>
        <PrismicNextLink field={slice.primary.button_trigger}>
          <button className="flex gap-2 rounded bg-gray-50 p-4">
            <span>{slice.primary.button_label}</span>
            {/* Right arrow svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </PrismicNextLink>
      </div>
    </Bounded>
  );
};

export default CallToAction;
