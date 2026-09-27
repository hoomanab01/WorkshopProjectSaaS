"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Caption } from "../Showcase";
import { FigmaButtonMatrix } from "../FigmaButtonMatrix";

function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Caption>ShadCN button names, drawn with the Figma button</Caption>
        <div className="flex flex-wrap items-center gap-3">
          <Button>default → primary</Button>
          <Button variant="secondary">secondary → secondary-grey</Button>
          <Button variant="outline">outline → tertiary</Button>
          <Button variant="destructive">
            <TrashIcon />
            destructive
          </Button>
          <Button variant="ghost">ghost → link-neutral</Button>
          <Button variant="link">link → link-color</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm">sm → s</Button>
          <Button>default → m</Button>
          <Button size="lg">
            <PlusIcon />
            lg → l
          </Button>
          <Button size="icon-sm" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button size="icon" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button size="icon-lg" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <Caption>Every version in the Figma set (the default column is live)</Caption>
        <FigmaButtonMatrix />
      </div>
    </div>
  );
}

function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Save unit</Button>
        <ButtonGroupSeparator />
        <Button size="icon" aria-label="More save options">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Qty</ButtonGroupText>
        <Button variant="outline" size="icon" aria-label="Decrease">
          −
        </Button>
        <Button variant="outline" size="icon" aria-label="Increase">
          +
        </Button>
      </ButtonGroup>
    </div>
  );
}

function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" defaultPressed aria-label="Favourite">
        <StarIcon />
        Favourite
      </Toggle>
      <Toggle size="sm" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle size="lg" disabled aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  );
}

function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Centre">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" variant="outline" defaultValue={["atv", "utv"]} aria-label="Vehicle types">
        <ToggleGroupItem value="atv">ATV</ToggleGroupItem>
        <ToggleGroupItem value="utv">UTV</ToggleGroupItem>
        <ToggleGroupItem value="moto">Motorcycle</ToggleGroupItem>
        <ToggleGroupItem value="snow">Snowmobile</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export const actionsDemos = {
  button: ButtonDemo,
  "button-group": ButtonGroupDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
};
