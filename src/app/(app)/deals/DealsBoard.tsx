"use client";

import { useId, useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useDroppable,
  useSensor,
  useSensors,
  type Announcements,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useSidebar } from "@/components/ui/sidebar";
import { FigmaIcon } from "@/components/app/FigmaIcon";
import { Segmented } from "@/components/app/Segmented";
import { SidebarToggle } from "@/components/app/AppSidebar";
import { DealCard } from "./DealCard";
import { COLUMNS, DEALS, INITIAL_BOARD, PIPELINES, type ColumnId } from "./deals-data";

const ICONS = "/figma/deals";

type Board = Record<ColumnId, string[]>;

// Prefer whatever is under the pointer, so an empty column accepts a card.
// Keyboard moves have no pointer: use what the moved card overlaps, then the nearest target.
const collisionDetection: CollisionDetection = (args) => {
  const underPointer = pointerWithin(args);
  if (underPointer.length > 0) return underPointer;
  const overlapping = rectIntersection(args);
  return overlapping.length > 0 ? overlapping : closestCorners(args);
};

function columnOf(board: Board, id: string): ColumnId | undefined {
  if (id in board) return id as ColumnId;
  return (Object.keys(board) as ColumnId[]).find((col) => board[col].includes(id));
}

function SortableDeal({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <DealCard
      ref={setNodeRef}
      deal={DEALS[id]}
      placeholder={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    />
  );
}

function Column({ id, title, dealIds }: { id: ColumnId; title: string; dealIds: string[] }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <section
      aria-label={title}
      className="flex h-full w-64 shrink-0 flex-col gap-4 overflow-hidden rounded-2xl border border-(--color-neutral-100) bg-(--surface-neutral-default) pt-[15px] pb-4"
    >
      <h2 className="px-4 text-sm leading-[18px] font-medium text-(--text-heading)">{title}</h2>
      <SortableContext id={id} items={dealIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2"
        >
          {dealIds.map((dealId) => (
            <SortableDeal key={dealId} id={dealId} />
          ))}
        </div>
      </SortableContext>
    </section>
  );
}

export function DealsBoard() {
  const dndId = useId();
  const { open, isMobile } = useSidebar();
  const [view, setView] = useState("board");
  const [pipeline, setPipeline] = useState("sourcing");
  const [query, setQuery] = useState("");
  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    // A small distance, so clicks (e.g. on the card menu) don't start a drag.
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return board;
    return Object.fromEntries(
      (Object.keys(board) as ColumnId[]).map((col) => [
        col,
        board[col].filter((id) => DEALS[id].title.toLowerCase().includes(q)),
      ]),
    ) as Board;
  }, [board, query]);

  // What screen readers hear while a card is moved (instead of internal ids).
  const titleOf = (id: string | number) => DEALS[String(id)]?.title ?? String(id);
  const placeOf = (id: string | number) => {
    const col = columnOf(board, String(id));
    return COLUMNS.find((c) => c.id === col)?.title ?? "the board";
  };
  const announcements: Announcements = {
    onDragStart: ({ active }) => `Picked up ${titleOf(active.id)}.`,
    onDragOver: ({ active, over }) => (over ? `${titleOf(active.id)} is over ${placeOf(over.id)}.` : undefined),
    onDragEnd: ({ active, over }) =>
      over ? `${titleOf(active.id)} dropped in ${placeOf(over.id)}.` : `${titleOf(active.id)} dropped.`,
    onDragCancel: ({ active }) => `Moving ${titleOf(active.id)} was cancelled.`,
  };

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id));
  }

  // Moving into another column happens while dragging, so the card makes room as you go.
  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return;
    const from = columnOf(board, String(active.id));
    const to = columnOf(board, String(over.id));
    if (!from || !to || from === to) return;
    setBoard((prev) => {
      const target = prev[to];
      const overIndex = target.indexOf(String(over.id));
      const index = overIndex === -1 ? target.length : overIndex;
      return {
        ...prev,
        [from]: prev[from].filter((id) => id !== active.id),
        [to]: [...target.slice(0, index), String(active.id), ...target.slice(index)],
      };
    });
  }

  // Reordering inside one column happens on drop.
  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    const col = columnOf(board, String(active.id));
    if (!col || col !== columnOf(board, String(over.id))) return;
    const from = board[col].indexOf(String(active.id));
    const to = board[col].indexOf(String(over.id));
    if (from !== to && to !== -1) setBoard((prev) => ({ ...prev, [col]: arrayMove(prev[col], from, to) }));
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex min-h-[50px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-(--stroke-information) px-6 py-1.5">
        <div className="flex items-center gap-3">
          {(!open || isMobile) && <SidebarToggle />}
          <h1 className="text-xl leading-[26px] font-semibold text-(--text-heading)">Deals</h1>
        </div>
        <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 md:w-auto">
          <Segmented
            label="View"
            value={view}
            onValueChange={setView}
            options={[
              { value: "board", label: "Board view" },
              { value: "tree", label: "Tree view", icon: <FigmaIcon src={`${ICONS}/tree-view.svg`} />, comingSoon: true },
            ]}
          />
          <div className="flex min-w-0 basis-full items-center gap-2 md:basis-auto">
            <InputGroup className="h-[34px] w-full md:w-[332px] rounded-xl border-(--stroke-information) bg-(--surface-neutral-white)">
              <InputGroupAddon className="pl-4">
                <FigmaIcon src={`${ICONS}/search.svg`} />
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                placeholder="Search property..."
                aria-label="Search property"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
            <Button>
              <FigmaIcon src={`${ICONS}/plus.svg`} size={20} />
              Add deal
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 px-5 pt-5 pb-7.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Segmented
            label="Pipeline"
            value={pipeline}
            onValueChange={setPipeline}
            options={PIPELINES}
          />
          <Button variant="outline" size="sm">
            <FigmaIcon src={`${ICONS}/sliders.svg`} />
            Filters
          </Button>
        </div>

        <DndContext
          id={dndId}
          sensors={sensors}
          accessibility={{ announcements }}
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div className="flex min-h-0 flex-1 gap-2.5 overflow-x-auto">
            {COLUMNS.map((col) => (
              <Column key={col.id} id={col.id} title={col.title} dealIds={visible[col.id]} />
            ))}
          </div>
          <DragOverlay>{activeId ? <DealCard deal={DEALS[activeId]} overlay /> : null}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
