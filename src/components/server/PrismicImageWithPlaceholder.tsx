import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { getPlaiceholder } from "plaiceholder";

type PrismicImageWithPlaceholderProps = {
  field: ImageField;
  className?: string;
};

export default async function PrismicImageWithPlaceholder({
  field,
  className,
}: PrismicImageWithPlaceholderProps) {
  if (!isFilled.image(field)) return <div></div>;

  const { base64 } = await getPlaiceholder(
    Buffer.from(await (await fetch(field.url)).arrayBuffer()),
  );

  return (
    <PrismicNextImage
      field={field}
      placeholder="blur"
      blurDataURL={base64}
      className={clsx("w-screen object-cover", className)}
    />
  );
}
