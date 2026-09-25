"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DirectionProvider } from "@/components/ui/direction";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Caption } from "../Showcase";

function SeparatorDemo() {
  return (
    <div className="max-w-sm text-sm">
      <p className="font-medium text-foreground">2026 Polaris RZR XP 1000</p>
      <p className="text-muted-foreground">Sport side-by-side</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-muted-foreground">
        <span>Details</span>
        <Separator orientation="vertical" />
        <span>Photos</span>
        <Separator orientation="vertical" />
        <span>History</span>
      </div>
    </div>
  );
}

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="warranty" className="max-w-lg">
      <AccordionItem value="warranty">
        <AccordionTrigger>What does the warranty cover?</AccordionTrigger>
        <AccordionContent>Engine and drivetrain for 2 years from the delivery date.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="trade">
        <AccordionTrigger>Do you accept trade-ins?</AccordionTrigger>
        <AccordionContent>Yes. We appraise trade-ins on the spot.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="delivery">
        <AccordionTrigger>Can you deliver?</AccordionTrigger>
        <AccordionContent>Free delivery within 50 miles of the showroom.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function CollapsibleDemo() {
  return (
    <Collapsible className="flex max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-foreground">3 open work orders</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Show all work orders">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border px-4 py-2 text-sm">WO-311 · Oil change</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-lg border px-4 py-2 text-sm">WO-312 · Tyre replacement</div>
        <div className="rounded-lg border px-4 py-2 text-sm">WO-315 · Winter storage prep</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ScrollAreaDemo() {
  const models = Array.from({ length: 30 }, (_, i) => `Model ${String(i + 1).padStart(2, "0")}`);
  return (
    <div className="flex flex-wrap gap-6">
      <div>
        <Caption>Vertical</Caption>
        <ScrollArea className="h-56 w-48 rounded-lg border">
          <div className="p-4">
            {models.map((m) => (
              <div key={m} className="border-b py-2 text-sm last:border-0">
                {m}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div>
        <Caption>Horizontal</Caption>
        <ScrollArea className="w-72 rounded-lg border whitespace-nowrap">
          <div className="flex gap-3 p-4">
            {models.slice(0, 12).map((m) => (
              <div key={m} className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-muted text-sm">
                {m}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-h-48 max-w-2xl rounded-lg border">
      <ResizablePanel defaultSize="30%">
        <div className="flex h-full items-center justify-center p-6 text-sm">Unit list</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="60%">
            <div className="flex h-full items-center justify-center p-6 text-sm">Unit details</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="40%">
            <div className="flex h-full items-center justify-center p-6 text-sm">Notes</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function DirectionDemo() {
  return (
    <div className="grid gap-2">
      <Caption>Right-to-left: the tab order and keyboard arrows flip</Caption>
      <div dir="rtl">
        <DirectionProvider dir="rtl">
          <Tabs defaultValue="1">
            <TabsList>
              <TabsTrigger value="1">المخزون</TabsTrigger>
              <TabsTrigger value="2">العملاء</TabsTrigger>
              <TabsTrigger value="3">الصيانة</TabsTrigger>
            </TabsList>
          </Tabs>
        </DirectionProvider>
      </div>
    </div>
  );
}

export const layoutDemos = {
  separator: SeparatorDemo,
  accordion: AccordionDemo,
  collapsible: CollapsibleDemo,
  "scroll-area": ScrollAreaDemo,
  resizable: ResizableDemo,
  direction: DirectionDemo,
};
