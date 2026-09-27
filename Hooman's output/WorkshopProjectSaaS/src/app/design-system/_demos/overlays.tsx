"use client";

import { CalendarIcon, InfoIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit customer</DialogTitle>
          <DialogDescription>Update contact details. Changes save when you click Save.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="d-name">Name</Label>
            <Input id="d-name" defaultValue="Jordan Lee" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="d-phone">Phone</Label>
            <Input id="d-phone" defaultValue="(555) 014-2231" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete unit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this unit?</AlertDialogTitle>
          <AlertDialogDescription>
            Stock P-1042 and its photos will be removed. This can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SheetDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["right", "left", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Open from {side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Filter inventory</SheetTitle>
              <SheetDescription>Narrow the list of units.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 px-4">
              <Label htmlFor={`sh-make-${side}`}>Make</Label>
              <Input id={`sh-make-${side}`} placeholder="Any make" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Book a test ride</DrawerTitle>
            <DrawerDescription>2026 Honda Rebel 500 · Saturday morning</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Confirm booking</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon />
          Set delivery date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <p className="text-sm font-medium text-foreground">Delivery</p>
          <div className="grid gap-2">
            <Label htmlFor="p-date">Date</Label>
            <Input id="p-date" type="date" defaultValue="2026-10-02" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="p-time">Time</Label>
            <Input id="p-time" type="time" defaultValue="10:00" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@jordanlee</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className="grid gap-1 text-sm">
            <p className="font-medium text-foreground">Jordan Lee</p>
            <p className="text-muted-foreground">Customer since 2021 · 3 units bought</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function TooltipDemo() {
  return (
    <div className="flex gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="What is MSRP?">
            <InfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Manufacturer&apos;s suggested retail price</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltips also work with the keyboard</TooltipContent>
      </Tooltip>
    </div>
  );
}

export const overlaysDemos = {
  dialog: DialogDemo,
  "alert-dialog": AlertDialogDemo,
  sheet: SheetDemo,
  drawer: DrawerDemo,
  popover: PopoverDemo,
  "hover-card": HoverCardDemo,
  tooltip: TooltipDemo,
};
