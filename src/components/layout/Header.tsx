import { createClient } from "@/prismicio";
import { PageDocument } from "../../../prismicio-types";
import HeaderNavigation from "../HeaderNavigation";

export default async function Header() {
  const client = createClient();

  const items = await Promise.all([
    client.getSingle("settings"),
    client.getAllByType("page"),
  ]);

  let pages: PageDocument<string>[] = filterAndSortDocument(items[1]);

  const dropdownItems = await Promise.all(
    pages.map(async (page) => {
      return client.getAllByIDs(
        page.data.dropdown_items
          .map((item: any) => item.link.id)
          .filter((id) => id),
      );
    }),
  );

  const mutated = pages.map((page, i) => {
    return {
      ...page,
      data: {
        ...page.data,
        dropdown_items: dropdownItems[i],
      },
    };
  });

  return <HeaderNavigation pages={mutated as any} settings={items[0]} />;
}

function filterAndSortDocument(documents: any[]) {
  return documents
    .filter((a) => a.data.add_to_menu)
    .sort((a, b) => {
      const aDate = new Date(a.first_publication_date);
      const bDate = new Date(b.first_publication_date);

      return aDate.getTime() - bDate.getTime();
    });
}
