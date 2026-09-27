"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AlertCircleIcon, BikeIcon, CheckCircle2Icon, PlusIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Caption } from "../Showcase";

function AlertDemo() {
  return (
    <div className="grid max-w-xl gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Deal funded</AlertTitle>
        <AlertDescription>The lender approved financing for Jordan Lee.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Recall notice</AlertTitle>
        <AlertDescription>3 units in stock are affected by a manufacturer recall.</AlertDescription>
      </Alert>
    </div>
  );
}

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast("Unit added to inventory")}>
        Plain
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Deal saved", { description: "Polaris RZR XP 1000 · Jordan Lee" })}
      >
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Payment failed", { description: "The card was declined." })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Unit archived", { action: { label: "Undo", onClick: () => toast("Restored") } })
        }
      >
        With action
      </Button>
    </div>
  );
}

function ProgressDemo() {
  const [value, setValue] = useState(40);
  return (
    <div className="grid max-w-md gap-2">
      <Caption>Uploading inspection photos… {value}%</Caption>
      <Progress value={value} aria-label="Upload progress" />
      <div className="mt-2 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setValue((v) => Math.max(0, v - 20))}>
          −20%
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue((v) => Math.min(100, v + 20))}>
          +20%
        </Button>
      </div>
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner />
      <Spinner className="size-6" />
      <Button disabled>
        <Spinner />
        Saving
      </Button>
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

function EmptyDemo() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BikeIcon />
        </EmptyMedia>
        <EmptyTitle>No units yet</EmptyTitle>
        <EmptyDescription>Add your first vehicle to start tracking inventory.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon />
          Add unit
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export const feedbackDemos = {
  alert: AlertDemo,
  sonner: ToastDemo,
  progress: ProgressDemo,
  spinner: SpinnerDemo,
  skeleton: SkeletonDemo,
  empty: EmptyDemo,
};
