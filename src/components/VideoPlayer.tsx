"use client";
import { isFilled } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { useRef } from "react";

export default function VideoPlayer({ slice }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    console.log(videoRef.current, mobileVideoRef.current);
    if (videoRef.current) {
      videoRef.current.play();
    }

    if (mobileVideoRef.current) {
      mobileVideoRef.current.play();
    }

    triggerRef.current!.classList.add("hidden");
  };

  return (
    <>
      <video
        loop
        ref={videoRef}
        src={slice.primary.videourl}
        className="hidden h-auto w-auto md:block"
      ></video>

      <video
        loop
        ref={mobileVideoRef}
        src={slice.primary.mobile_videourl}
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover md:hidden"
      ></video>

      <div className="relative overflow-hidden bg-black/60 md:absolute md:bottom-0 md:left-0 md:right-0 md:top-0">
        <div className="ml-[8%] max-w-96 py-16 text-white md:translate-y-1/2 md:py-0">
          {isFilled.richText(slice.primary.heading) && (
            <h2 className="text-6xl">
              <PrismicText field={slice.primary.heading} />
            </h2>
          )}
          {isFilled.richText(slice.primary.body) && (
            <p className="mt-3">
              <PrismicText field={slice.primary.body} />
            </p>
          )}
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <button onClick={handleClick} ref={triggerRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="92"
            height="92"
            fill="none"
            viewBox="0 0 92 92"
          >
            <circle cx="46" cy="46" r="46" fill="#fff"></circle>
            <g clipPath="url(#clip0_2152_22)">
              <path
                fill="#DD841C"
                d="M35.688 25.944a1.27 1.27 0 00-.562.322.7.7 0 00-.211.483v38.5c0 .173.073.342.21.485.138.144.333.256.563.323.23.067.482.086.727.054.245-.032.47-.113.65-.233L65.7 46.628a.946.946 0 00.284-.287.65.65 0 00.1-.34.65.65 0 00-.1-.34.947.947 0 00-.284-.288l-28.638-19.25a1.52 1.52 0 00-.649-.232 1.794 1.794 0 00-.726.054v-.001z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_2152_22">
                <path
                  fill="#fff"
                  d="M0 0H56V81H0z"
                  transform="rotate(-90 42 32)"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </>
  );
}
