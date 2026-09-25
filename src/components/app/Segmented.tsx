"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type SegmentedOption = {
  value: string;
  label: string;
  icon?: ReactNode;
  count?: number;
  /** Shown but not selectable yet (no design for it). */
  comingSoon?: boolean;
};

// The grey pill switch from the Deals design ("Board view / Tree view", "Sourcing / Marketing / Offer").
export function Segmented({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: SegmentedOption[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(next) => {
        const option = options.find((o) => o.value === next);
        if (next && !option?.comingSoon) onValueChange(next);
      }}
      className="gap-2 rounded-lg bg-(--surface-neutral-default) p-0.5"
    >
      {options.map((option) => {
        const selected = option.value === value;
        const item = (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className={cn(
              "h-auto gap-2 rounded-lg! border border-transparent px-[9px] py-[3px] text-sm leading-[18px] font-normal text-(--text-paragraph) shadow-none",
              "hover:bg-(--surface-neutral-white)/60 data-[state=on]:border-(--stroke-neutral-dark) data-[state=on]:bg-(--surface-neutral-white)",
              "data-[state=on]:font-semibold data-[state=on]:text-(--text-heading)",
            )}
          >
            {option.icon}
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-sm font-normal text-(--text-paragraph)",
                  selected ? "bg-(--surface-neutral-default)" : "bg-(--surface-neutral-white)",
                )}
              >
                {option.count}
              </span>
            )}
          </ToggleGroupItem>
        );
        return option.comingSoon ? (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>{item}</TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
          </Tooltip>
        ) : (
          item
        );
      })}
    </ToggleGroup>
  );
}
