"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { MailIcon, SearchIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Caption } from "../Showcase";

const MAKES = ["Polaris", "Can-Am", "Honda", "Yamaha", "Kawasaki", "Suzuki", "Arctic Cat", "Ski-Doo"];

function FieldDemo() {
  return (
    <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>Customer</FieldLegend>
        <FieldDescription>Who is buying this unit.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="f-name">Full name</FieldLabel>
            <Input id="f-name" placeholder="Jordan Lee" />
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="f-email">Email</FieldLabel>
            <Input id="f-email" type="email" defaultValue="jordan@" aria-invalid />
            <FieldError>Enter a full email address.</FieldError>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="f-marketing" />
            <FieldContent>
              <FieldLabel htmlFor="f-marketing">Send service reminders</FieldLabel>
              <FieldDescription>By email, before each scheduled service.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

function LabelDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="l-terms" />
      <Label htmlFor="l-terms">Customer signed the bill of sale</Label>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="grid max-w-md gap-4">
      <Input placeholder="Stock number" />
      <Input type="email" placeholder="Email" />
      <Input type="file" />
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="Invalid value" aria-invalid />
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="grid max-w-md gap-2">
      <Label htmlFor="t-notes">Service notes</Label>
      <Textarea id="t-notes" placeholder="Describe the work done…" />
    </div>
  );
}

function InputGroupDemo() {
  return (
    <div className="grid max-w-md gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search VIN, stock # or customer" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" inputMode="decimal" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="customer@email.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function InputOTPDemo() {
  return (
    <InputOTP maxLength={6} aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-64" aria-label="Vehicle type">
        <SelectValue placeholder="Vehicle type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Off-road</SelectLabel>
          <SelectItem value="atv">ATV</SelectItem>
          <SelectItem value="utv">UTV / side-by-side</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>On-road</SelectLabel>
          <SelectItem value="motorcycle">Motorcycle</SelectItem>
          <SelectItem value="scooter">Scooter</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other</SelectLabel>
          <SelectItem value="snowmobile">Snowmobile</SelectItem>
          <SelectItem value="pwc">Personal watercraft</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function NativeSelectDemo() {
  return (
    <NativeSelect aria-label="Condition" defaultValue="">
      <NativeSelectOption value="" disabled>
        Condition
      </NativeSelectOption>
      <NativeSelectOption value="new">New</NativeSelectOption>
      <NativeSelectOption value="used">Used</NativeSelectOption>
      <NativeSelectOption value="cpo">Certified pre-owned</NativeSelectOption>
    </NativeSelect>
  );
}

function ComboboxDemo() {
  return (
    <Combobox items={MAKES}>
      <ComboboxInput placeholder="Search makes" className="w-64" aria-label="Make" />
      <ComboboxContent>
        <ComboboxEmpty>No makes found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      {[
        ["c-1", "Pre-delivery inspection done", true],
        ["c-2", "Registration filed", false],
        ["c-3", "Keys handed over", false],
      ].map(([id, label, checked]) => (
        <div key={id as string} className="flex items-center gap-2">
          <Checkbox id={id as string} defaultChecked={checked as boolean} />
          <Label htmlFor={id as string}>{label}</Label>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <Checkbox id="c-4" disabled />
        <Label htmlFor="c-4">Disabled</Label>
      </div>
    </div>
  );
}

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="finance" aria-label="Payment method">
      {[
        ["cash", "Cash"],
        ["finance", "Dealer financing"],
        ["lease", "Lease"],
      ].map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`r-${value}`} />
          <Label htmlFor={`r-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function SwitchDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="s-online" defaultChecked />
        <Label htmlFor="s-online">Show on website</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s-hold" />
        <Label htmlFor="s-hold">Hold for customer</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s-disabled" disabled />
        <Label htmlFor="s-disabled">Disabled</Label>
      </div>
    </div>
  );
}

function SliderDemo() {
  const [range, setRange] = useState([8000, 22000]);
  return (
    <div className="grid max-w-md gap-6">
      <div>
        <Caption>Price range: ${range[0].toLocaleString("en-US")} – ${range[1].toLocaleString("en-US")}</Caption>
        <Slider value={range} onValueChange={setRange} min={0} max={40000} step={500} aria-label="Price range" />
      </div>
      <div>
        <Caption>Single value</Caption>
        <Slider defaultValue={[40]} aria-label="Volume" />
      </div>
    </div>
  );
}

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 25));
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 8, 21),
    to: new Date(2026, 8, 25),
  });
  return (
    <div className="flex flex-wrap items-start gap-6">
      <div>
        <Caption>Single date</Caption>
        <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} className="rounded-lg border" />
      </div>
      <div>
        <Caption>Date range</Caption>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          defaultMonth={range?.from}
          numberOfMonths={2}
          className="rounded-lg border"
        />
      </div>
    </div>
  );
}

export const formsDemos = {
  field: FieldDemo,
  label: LabelDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  "input-group": InputGroupDemo,
  "input-otp": InputOTPDemo,
  select: SelectDemo,
  "native-select": NativeSelectDemo,
  combobox: ComboboxDemo,
  checkbox: CheckboxDemo,
  "radio-group": RadioGroupDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  calendar: CalendarDemo,
};
