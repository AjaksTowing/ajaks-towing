import { cn } from "@/cn";
import { ImageField, KeyTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

type PostCardProps = {
  meta_image: ImageField;
  last_publication_date: string;
  meta_title: KeyTextField;
  meta_description: KeyTextField;
  uid: string;
  className?: string;
};

export default function PostCard({
  meta_image,
  last_publication_date,
  meta_title,
  meta_description,
  uid,
  className,
}: PostCardProps) {
  return (
    <Link href={`/blog/${uid}`} className="flex gap-1">
      <div className={cn("bg-white", className)}>
        <PrismicNextImage field={meta_image} />

        <div className="flex flex-col gap-4 p-5">
          <span className="text-sm font-medium text-[#DD841C]">
            {new Date(last_publication_date)
              .toDateString()
              .replace(/(\w+) (\w+) (\w+) (\w+)/gm, "$3 $2 $4")}
          </span>
          <h2 className="line-clamp-2 text-2xl">{meta_title}</h2>

          <p className="line-clamp-4 text-sm md:text-base">
            {meta_description}
          </p>

          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            <span>Explore</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
