import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText } from "@prismicio/react";
import Link from "next/link";
import { PageDocument } from "../../../prismicio-types";
import Bounded from "./Bounded";

import Image from "next/image";
import Facebook from "../../../public/assets/icons/facebook.svg";
import Instagram from "../../../public/assets/icons/instagram.svg";
import Linkedin from "../../../public/assets/icons/linkedin.svg";
import Twitter from "../../../public/assets/icons/twitter.svg";
import Youtube from "../../../public/assets/icons/youtube.svg";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const pages: PageDocument[] = (await client.getAllByType("page")).filter(
    (page) => page.data.add_to_menu,
  );

  const socialIcons = {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
  };

  return (
    <footer className="bg-black bg-opacity-95 text-white">
      <Bounded className="mt-0 md:mt-0">
        <div className="gap4 flex flex-col border-b border-white border-opacity-10 py-5 sm:grid sm:grid-cols-2 sm:items-center">
          <div>
            <p>
              {isFilled.richText(settings.data.newsletter_text) ? (
                <PrismicText field={settings.data.newsletter_text} />
              ) : (
                "Stay ahead in a rapidly changing world. Subscribe to Aquaseen, our monthly look at the critical issues facing global businesses."
              )}
            </p>
          </div>
          <form
            action="#"
            method="POST"
            className="mt-8 flex flex-col items-start gap-2 sm:flex-row"
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full rounded-none border border-none bg-white bg-opacity-10 p-3 text-gray-700 outline-none ring-[#FFDDB5] focus:ring-2"
              />
              <div className="mt-3">
                <input
                  type="checkbox"
                  name="has_read_terms"
                  className="mr-2 rounded-none"
                />
                <span>
                  *I have read the privacy policy and agree to its terms.
                </span>
              </div>
            </div>
            <button className="w-full min-w-36 rounded-none bg-[#DD841C] p-3 uppercase outline-none ring-[#FFDDB5] focus:ring-2 sm:w-max">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-12 py-[50px] md:grid md:grid-cols-4 md:place-items-center md:gap-16">
          <div className="flex h-full w-full flex-col items-center gap-6 border-r border-white border-opacity-10">
            {isFilled.image(settings.data.fallback_og_image) ? (
              <PrismicNextImage field={settings.data.fallback_og_image} />
            ) : (
              'Place a fallback image in the "fallback_og_image" field of the "settings"'
            )}

            <p className="text-sm">{settings.data.meta_description}</p>
          </div>

          <div className="flex h-full w-full flex-col justify-center border-r border-white border-opacity-10">
            {isFilled.keyText(settings.data.site_name) && (
              <h4 className="mb-6 text-2xl font-semibold">
                {settings.data.site_name}
              </h4>
            )}

            <ul className="flex list-inside list-disc flex-col gap-2">
              {pages.map((page) => {
                return (
                  <li key={page.id}>
                    <Link
                      href={page.url as string}
                      className="border-white hover:border-b"
                    >
                      <PrismicText field={page.data.title} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex h-full w-full flex-col justify-center border-r border-white border-opacity-10">
            <div className="mb-6 flex flex-col gap-2">
              <h4 className="text-2xl font-semibold">Contact Us</h4>

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
                  {isFilled.keyText(settings.data.address) &&
                    settings.data.address}
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

          <div className="flex h-full w-full flex-col justify-center">
            <h4 className="mb-6 text-2xl font-semibold">Follow Us</h4>

            <div className="grid grid-cols-[50px_1fr] grid-rows-3 gap-y-6">
              {settings.data.social_links.map((socialLink) => {
                if (!socialLink.icon) {
                  return null;
                }

                if (!socialIcons[socialLink.icon]) {
                  return null;
                }

                return (
                  <PrismicLink
                    title={socialLink.icon}
                    field={socialLink.link}
                    key={socialLink.icon}
                  >
                    <Image
                      alt={socialLink.icon}
                      key={socialLink.icon}
                      width={30}
                      height={27}
                      className="object-contain brightness-0 invert"
                      src={socialIcons[socialLink.icon]}
                    />
                  </PrismicLink>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white border-opacity-10 py-5">
          <div className="flex gap-6">
            {settings.data.menu?.map(async (item) => {
              if (!isFilled.contentRelationship(item.link)) return null;

              const content: PageDocument = await client.getByID(item.link.id);
              return (
                <Link
                  key={content.id}
                  href={content.url as string}
                  className="border-white hover:border-b"
                >
                  <PrismicText field={content.data.title} />
                </Link>
              );
            })}

            <Link href={"/sitemap.xml"}>Sitemap</Link>
          </div>
          <div>
            <p>&copy; 2023 {settings.data.site_name}, Inc</p>
          </div>
        </div>
      </Bounded>
    </footer>
  );
}
