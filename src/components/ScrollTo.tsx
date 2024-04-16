"use client";

import { cn } from "@/cn";
import { useEffect, useState } from "react";

type ScrollToProps = {
  id: string;
  count: number;
  skip: number;
};

export default function ScrollTo({ id, count, skip }: ScrollToProps) {
  const [innerWidth, setInnerWidth] = useState(0);

  const scrollToId = () => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        inline: "end",
        block: "nearest",
        behavior: "smooth",
      });
    }

    setCurrentActive();
  };

  const setCurrentActive = () => {
    const scrollToElementBaseId = id.substring(0, id.length - 1);
    const scrollToElementIds: HTMLDivElement[] = Array.from(
      { length: count },
      (_, idx) => "trigger_" + scrollToElementBaseId + idx,
    )
      .map((id) => document.getElementById(id))
      .filter((element) => element as HTMLDivElement) as HTMLDivElement[];

    scrollToElementIds.forEach((element: HTMLDivElement) => {
      element.classList.remove("trigger-active");
      element.classList.remove("trigger-outline");

      if (element.getAttribute("id") === `trigger_${id}`) {
        element.classList.add("trigger-active");
      } else {
        element.classList.add("trigger-outline");
      }
    });
  };

  useEffect(() => {
    setInnerWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  useEffect(
    function () {
      let step = skip;
      let active = false;
      const scrollToElementBaseId = id.substring(0, id.length - 1);

      if (innerWidth < 768) {
        step = 1;
      }

      for (let i = 0; i < count; i++) {
        const element = document.getElementById(
          "trigger_" + scrollToElementBaseId + i,
        );

        if (element) {
          element.classList.add("hidden");

          if (i % step === 0) {
            element.classList.remove("hidden");
          }

          if (!active) {
            element.classList.add("trigger-active");
            active = true;
          }
        }
      }
    },
    [innerWidth, skip, count, id],
  );

  return (
    <div
      id={"trigger_" + id}
      className={cn("trigger-outline size-4 cursor-pointer rounded-full")}
      onClick={scrollToId}
    ></div>
  );
}