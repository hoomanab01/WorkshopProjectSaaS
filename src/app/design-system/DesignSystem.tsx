"use client";

import { useEffect, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { CATEGORIES, type ComponentId } from "./catalog";
import { Demo } from "./Showcase";
import { actionsDemos } from "./_demos/actions";
import { chatDemos } from "./_demos/chat";
import { dataDisplayDemos } from "./_demos/data-display";
import { feedbackDemos } from "./_demos/feedback";
import { formsDemos } from "./_demos/forms";
import { layoutDemos } from "./_demos/page-layout";
import { menusDemos } from "./_demos/menus";
import { navigationDemos } from "./_demos/navigation";
import { overlaysDemos } from "./_demos/overlays";

// Type-checked: adding a component to the catalog without a demo is a build error.
const DEMOS: Record<ComponentId, ComponentType> = {
  ...actionsDemos,
  ...formsDemos,
  ...dataDisplayDemos,
  ...feedbackDemos,
  ...overlaysDemos,
  ...menusDemos,
  ...navigationDemos,
  ...layoutDemos,
  ...chatDemos,
};

const TOTAL = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

function sourceOf(id: ComponentId) {
  return id === "button" ? "@/components/Button · @/components/ui/button" : `@/components/ui/${id}`;
}

// Highlights the nav entry for the component currently on screen.
function useActiveId() {
  const [active, setActive] = useState<string>(CATEGORIES[0].items[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    CATEGORIES.forEach((c) => c.items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function DesignSystem() {
  const active = useActiveId();

  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10 lg:px-8">
      <nav aria-label="Components" className="sticky top-6 hidden max-h-[calc(100vh-3rem)] w-52 shrink-0 self-start overflow-y-auto pb-6 lg:block">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="mb-5">
            <a href={`#${category.id}`} className="mb-1 block text-xs font-semibold tracking-wide text-foreground uppercase">
              {category.name}
            </a>
            <ul>
              {category.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                      active === item.id && "bg-muted font-medium text-foreground",
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <main className="min-w-0 flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Design system</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            All {TOTAL} components in the project, in {CATEGORIES.length} groups. The button comes from Figma. The rest
            come from ShadCN, styled with the Figma colours, corners and font.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {category.name}
              </a>
            ))}
          </div>
        </header>

        <div className="flex flex-col gap-16">
          {CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`} className="scroll-mt-6">
              <div className="mb-8 border-b pb-3">
                <h2 id={`${category.id}-heading`} className="text-xl font-semibold text-foreground">
                  {category.name}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">{category.items.length}</span>
                </h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <div className="flex flex-col gap-12">
                {category.items.map((item) => {
                  const Example = DEMOS[item.id];
                  return (
                    <Demo key={item.id} id={item.id} name={item.name} description={item.description} source={sourceOf(item.id)}>
                      <Example />
                    </Demo>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
