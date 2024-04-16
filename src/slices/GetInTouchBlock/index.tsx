import GetInTouchForm from "@/components/GetInTouchForm";
import Bounded from "@/components/layout/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `GetInTouchBlock`.
 */
export type GetInTouchBlockProps =
  SliceComponentProps<Content.GetInTouchBlockSlice>;

/**
 * Component for "GetInTouchBlock" Slices.
 */
const GetInTouchBlock = async ({
  slice,
}: GetInTouchBlockProps): Promise<JSX.Element> => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <Bounded
      className="mx-5 grid grid-rows-1 gap-16 rounded border border-black/10 bg-white p-8 py-16 shadow md:mx-auto md:grid-cols-2"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex h-full w-full flex-col justify-center border-r border-white border-opacity-10">
        <div className="mb-6 flex flex-col gap-2">
          <h4 className="text-2xl font-semibold">Get In Touch</h4>

          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#DD841C"
                d="M17 2a3 3 0 00-.75 5.905V13a.75.75 0 101.5 0V7.905A3.001 3.001 0 0017 2zM8 22h8c2.482 0 3.875 0 4.773-.594l-8.514-4.683-8.043 5.08C5.087 22 6.283 22 8 22zm2.758-6.102L2.51 11.362C2 12.263 2 13.64 2 16c0 2.666 0 4.075.736 4.964l8.022-5.066z"
              ></path>
              <path
                fill="#DD841C"
                d="M22 16c0-2.828 0-4.243-.879-5.121-.49-.49-1.146-.707-2.121-.803V13a2 2 0 01-4 0v-3H8c-2.045 0-3.35 0-4.25.332l17.937 9.865C22 19.3 22 18.006 22 16z"
              ></path>
            </svg>
            <address className="not-italic">
              {isFilled.keyText(settings.data.address) && settings.data.address}
            </address>
          </div>

          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#DD841C"
                d="M17 12a5 5 0 10-4.478-2.774c.091.177.115.38.067.574l-.298 1.113a.65.65 0 00.796.796l1.113-.298a.817.817 0 01.574.067A4.98 4.98 0 0017 12z"
              ></path>
              <path
                fill="#DD841C"
                d="M8.038 7.316l.649 1.163c.585 1.05.35 2.426-.572 3.35 0 0-1.12 1.118.91 3.147 2.027 2.027 3.147.91 3.147.91.923-.923 2.3-1.158 3.349-.573l1.163.65c1.585.884 1.772 3.106.379 4.5-.837.836-1.863 1.488-2.996 1.53-1.908.073-5.15-.41-8.4-3.66s-3.733-6.492-3.66-8.4C2.05 8.8 2.7 7.774 3.537 6.937c1.394-1.393 3.616-1.206 4.5.38"
              ></path>
            </svg>
            <span>
              {isFilled.keyText(settings.data.phone) && settings.data.phone}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-semibold">Store Hours</h4>

          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#DD841C"
                d="M17 12a5 5 0 10-4.478-2.774c.091.177.115.38.067.574l-.298 1.113a.65.65 0 00.796.796l1.113-.298a.817.817 0 01.574.067A4.98 4.98 0 0017 12z"
              ></path>
              <path
                fill="#DD841C"
                d="M8.038 7.316l.649 1.163c.585 1.05.35 2.426-.572 3.35 0 0-1.12 1.118.91 3.147 2.027 2.027 3.147.91 3.147.91.923-.923 2.3-1.158 3.349-.573l1.163.65c1.585.884 1.772 3.106.379 4.5-.837.836-1.863 1.488-2.996 1.53-1.908.073-5.15-.41-8.4-3.66s-3.733-6.492-3.66-8.4C2.05 8.8 2.7 7.774 3.537 6.937c1.394-1.393 3.616-1.206 4.5.38"
              ></path>
            </svg>
            <span>
              {isFilled.keyText(settings.data.store_hours) &&
                settings.data.store_hours}
            </span>
          </div>
        </div>
      </div>
      <GetInTouchForm />
    </Bounded>
  );
};

export default GetInTouchBlock;
