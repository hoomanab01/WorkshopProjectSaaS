import type { ReactNode } from "react";

// One component's block on the preview page: name, what it's for, where it lives, and the demo.
export function Demo({
  id,
  name,
  description,
  source,
  children,
}: {
  id: string;
  name: string;
  description: string;
  source: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h3 id={`${id}-title`} className="text-base font-semibold text-foreground">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <code className="font-mono text-xs text-muted-foreground">{source}</code>
      </div>
      <div className="rounded-xl border bg-background p-6">{children}</div>
    </section>
  );
}

// A small caption above one example inside a demo.
export function Caption({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-xs font-medium text-muted-foreground">{children}</p>;
}
