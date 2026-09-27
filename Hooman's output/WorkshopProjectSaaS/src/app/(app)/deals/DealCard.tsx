"use client";

import Image from "next/image";
import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FigmaIcon } from "@/components/app/FigmaIcon";
import { cn } from "@/lib/utils";
import type { Deal } from "./deals-data";

const ICONS = "/figma/deals";

function Detail({ icon, children }: { icon: string; children: string }) {
  return (
    <p className="flex items-center gap-1 text-xs font-medium text-black/40">
      <FigmaIcon src={`${ICONS}/${icon}.svg`} size={12} />
      {children}
    </p>
  );
}

function StatusBubble({ icon, dark, done }: { icon: string; dark?: boolean; done?: boolean }) {
  return (
    <span
      className={cn(
        "relative flex size-6 items-center justify-center rounded-full",
        dark ? "bg-black" : "bg-[#e9e9e9]",
      )}
    >
      <FigmaIcon src={`${ICONS}/${icon}.svg`} />
      {done && <FigmaIcon src={`${ICONS}/status-check.svg`} size={12} className="absolute top-0 left-4" />}
    </span>
  );
}

type DealCardProps = HTMLAttributes<HTMLDivElement> & {
  deal: Deal;
  /** True for the copy that follows the pointer while dragging. */
  overlay?: boolean;
  /** True for the card left behind in the list while its copy is dragged. */
  placeholder?: boolean;
  style?: CSSProperties;
};

export const DealCard = forwardRef<HTMLDivElement, DealCardProps>(function DealCard(
  { deal, overlay, placeholder, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex cursor-grab touch-none flex-col gap-2 rounded-lg border border-(--stroke-information) bg-(--surface-neutral-white) p-[7px] outline-none focus-visible:ring-2 focus-visible:ring-ring",
        overlay && "cursor-grabbing shadow-lg",
        placeholder && "opacity-40",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-sm leading-[18px] font-medium text-(--text-paragraph)">{deal.title}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for ${deal.title}`}
              className="-my-1 -mr-1"
              // Keep the menu button from starting a drag.
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <FigmaIcon src={`${ICONS}/card-more.svg`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Open deal</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-1">
        <Detail icon="card-owner">{`Owner: ${deal.owner}`}</Detail>
        <Detail icon="card-phone">{deal.phone}</Detail>
        <Detail icon="card-email">{deal.email}</Detail>
      </div>

      {deal.activity && (
        <div className="flex items-center gap-1 rounded-lg bg-(--surface-neutral-default) px-2 py-1">
          <span className="flex min-w-0 flex-1 items-center gap-1">
            <Image
              src={deal.activity.avatar}
              width={16}
              height={16}
              alt=""
              className="size-4 rounded-full bg-white object-cover"
            />
            <span className="truncate text-[11px] leading-[16.5px] font-semibold text-black/72">
              {deal.activity.person}
            </span>
          </span>
          <span className="flex flex-1 items-center gap-0.5">
            <FigmaIcon src={`${ICONS}/calling.svg`} className="motion-safe:animate-spin motion-safe:[animation-duration:2s]" />
            <span className="px-0.5 text-xs font-semibold text-primary">{deal.activity.label}</span>
          </span>
        </div>
      )}

      {deal.progress && (
        <div className="flex items-center gap-2" aria-label="Deal progress">
          <StatusBubble icon="status-shield" dark done />
          <StatusBubble icon="status-calendar" dark done />
          <FigmaIcon src={`${ICONS}/status-arrow.svg`} />
          <StatusBubble icon="status-home" />
        </div>
      )}
    </div>
  );
});
