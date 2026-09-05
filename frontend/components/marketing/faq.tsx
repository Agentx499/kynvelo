"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

/* Radix accordion, already a dependency. v1 rendered FAQs as a 2x2 grid of
   four identical glass cards with every answer permanently expanded - which is
   not an FAQ, it is a wall of text. Collapsed by default, one open at a time. */
export function Faq({
  items,
}: {
  items: { q: string; a: React.ReactNode }[];
}) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="divide-y divide-line border-y border-line"
    >
      {items.map((item, i) => (
        <Accordion.Item key={i} value={`item-${i}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors hover:text-primary">
              <span className="font-display text-[19px] font-semibold text-ink group-hover:text-primary">
                {item.q}
              </span>
              <Plus
                className="mt-1 h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-200 group-data-[state=open]:rotate-45"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden">
            <div className="prose-measure pb-6 text-[15px] leading-relaxed text-ink-muted">
              {item.a}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
