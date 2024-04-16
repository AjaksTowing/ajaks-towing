"use client";

import { cn } from "@/cn";
import { ImageFieldImage, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BlogPostDocument,
  PageDocument,
  SettingsDocument,
} from "../../prismicio-types";
import Bounded from "./layout/Bounded";

export type CustomPageDocument = PageDocument & {
  data: {
    dropdown_items: BlogPostDocument[];
  };
};

type HeaderNavigationProps = {
  pages: CustomPageDocument[];
  settings: SettingsDocument;
};

const isHome = (uid: string): boolean => {
  return ["/", "/home"].includes(uid);
};

["grid-cols-1", "grid-cols-2", "grid-cols-3"];

export default function HeaderNavigation({
  pages,
  settings,
}: HeaderNavigationProps) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const uid = usePathname();
  const mobileBreakpoint = 1024;
  const [modalVisible, setModalVisible] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(function () {
    setInnerWidth(window.innerWidth);

    window.addEventListener("resize", function () {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  useEffect(
    function () {
      document.body.classList.toggle("overflow-hidden", modalVisible);

      if (!mobileMenuRef.current) return;

      gsap
        .timeline()
        .fromTo(
          mobileMenuRef.current,
          {
            height: 0,
          },
          {
            height: "85svh",
          },
        )
        .play();
    },
    [mobileMenuRef, modalVisible],
  );

  return (
    <>
      <header
        className={cn(
          "z-10 w-full text-sm capitalize",
          isHome(uid) ? "absolute text-white" : "relative bg-white",
        )}
      >
        <Bounded
          className={cn(
            "mt-1 flex w-full place-items-center items-center justify-between py-5 md:mt-1",
            isHome(uid) && "border-b border-white border-opacity-25",
          )}
        >
          {innerWidth <= mobileBreakpoint && (
            <div onClick={() => setModalVisible((bool) => !bool)}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          )}

          <Link href={"/"}>
            {isFilled.image(settings.data.logo) ? (
              <>
                {innerWidth <= mobileBreakpoint ? (
                  <div className="max-w-24">
                    <HeaderImage field={settings.data.fallback_og_image} />
                  </div>
                ) : (
                  <div className="max-w-80">
                    <HeaderImage field={settings.data.logo} />
                  </div>
                )}
              </>
            ) : (
              <HeaderImage field={settings.data.fallback_og_image} />
            )}
          </Link>

          {innerWidth > mobileBreakpoint && (
            <Menu closeModal={() => {}} settings={settings} pages={pages} />
          )}
        </Bounded>
      </header>

      {modalVisible && (
        <div
          ref={mobileMenuRef}
          className="fixed bottom-0 left-0 right-0 z-40 w-screen overflow-y-auto overflow-x-hidden rounded-t-lg bg-white text-sm"
        >
          <div
            onClick={() => setModalVisible(false)}
            className="m-5 ml-auto w-max rounded bg-gray-50 p-2 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6 cursor-pointer"
              fill="black"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {window.innerWidth < 768 && (
            <Menu
              closeModal={() => setModalVisible(false)}
              settings={settings}
              pages={pages}
            />
          )}
        </div>
      )}
    </>
  );
}

const HeaderImage = ({ field }: { field: ImageFieldImage }) => {
  const uid = usePathname();

  return (
    isFilled.image(field) && (
      <PrismicNextImage
        className={cn("brightness-0", isHome(uid) && "invert")}
        field={field}
      />
    )
  );
};

const Menu = ({
  settings,
  pages,
  closeModal,
}: HeaderNavigationProps & { closeModal: () => void }) => {
  const uid = usePathname();

  return (
    <>
      <nav>
        <ul className="mb-2 flex flex-col items-center gap-2 md:flex-row md:gap-8">
          {pages.map((page: PageDocument) => (
            <Link
              href={
                (page.data.act_as_button
                  ? page.data.button_trigger ?? page.url
                  : page.url) as string
              }
              onClick={(e) => {
                if (page.data.act_as_button) {
                  e.preventDefault();
                  const a = document.createElement("a");

                  if (page.data.button_trigger) {
                    a.setAttribute("href", page.data.button_trigger);
                    a.click();
                  }
                }

                closeModal();
              }}
              key={page.id}
              className="group relative w-full gap-2 border border-gray-100/60 bg-gray-50 p-3 md:flex md:w-auto md:border-none md:bg-transparent md:p-0"
            >
              <span>
                <PrismicText field={page.data.title} />
              </span>

              {page.data.isdropdown && (
                <>
                  <Image
                    src={"/assets/icons/downward-arrow.png"}
                    alt="DropDownArrow"
                    width={12}
                    height={12}
                    className={cn(
                      "hidden object-contain md:block",
                      isHome(uid) ? "brightness-0 invert" : "inline",
                    )}
                  />

                  <div className="relative w-max max-w-2xl pt-2 text-black hover:block group-hover:block md:absolute md:left-1/2 md:top-full md:hidden md:-translate-x-1/2">
                    <div className="rounded border-none border-gray-100 md:border md:bg-white md:p-4 md:shadow">
                      <h4 className="mb-2 hidden text-xl font-medium md:block">
                        <PrismicText field={page.data.title} />
                      </h4>

                      <div
                        className={cn(
                          "capitalize md:grid",
                          `md:grid-cols-${
                            page.data.dropdown_items.length > 3
                              ? 3
                              : page.data.dropdown_items.length
                          }`,
                        )}
                      >
                        {page.data.dropdown_items.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-2 rounded p-2 hover:bg-gray-100"
                          >
                            <Image
                              className="mt-1 -rotate-90 object-contain"
                              src={"/assets/icons/downward-arrow.png"}
                              alt="DropDownArrow"
                              width={12}
                              height={12}
                            />
                            <Link href={`/${page.uid}/${item.uid}`}>
                              <PrismicText field={item.data.title} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Link>
          ))}
        </ul>
      </nav>

      <ul className="hidden flex-col items-center gap-2 md:flex md:flex-row md:gap-8">
        {settings.data.cta.map((cta) => {
          return (
            <PrismicNextLink
              key={cta.label}
              className="flex w-full items-center gap-2 border border-gray-100/60 bg-gray-50 p-3 md:border-none md:bg-transparent"
              field={cta.link}
              onClick={closeModal}
            >
              <div className="brightness-0 md:brightness-100">
                <HeaderImage field={cta.icon} />
              </div>
              <span>{cta.label}</span>
            </PrismicNextLink>
          );
        })}
      </ul>
    </>
  );
};
