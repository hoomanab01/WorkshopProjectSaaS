"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { BikeIcon, ChevronRightIcon, WrenchIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UNITS = [
  { stock: "P-1042", unit: "2026 Polaris RZR XP 1000", status: "In stock", price: 22499 },
  { stock: "C-2210", unit: "2025 Can-Am Outlander 700", status: "Sold", price: 9899 },
  { stock: "H-0318", unit: "2026 Honda Rebel 500", status: "On hold", price: 7299 },
  { stock: "Y-7751", unit: "2024 Yamaha YZ250F", status: "In stock", price: 8599 },
];

const STATUS_BADGE = {
  "In stock": "secondary",
  Sold: "destructive",
  "On hold": "outline",
} as const;

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function TableDemo() {
  return (
    <Table>
      <TableCaption>Inventory at the main showroom.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Stock #</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {UNITS.map((u) => (
          <TableRow key={u.stock}>
            <TableCell className="font-medium">{u.stock}</TableCell>
            <TableCell>{u.unit}</TableCell>
            <TableCell>
              <Badge variant={STATUS_BADGE[u.status as keyof typeof STATUS_BADGE]}>{u.status}</Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">{money(u.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">{money(UNITS.reduce((s, u) => s + u.price, 0))}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function CardDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>2026 Polaris RZR XP 1000</CardTitle>
          <CardDescription>Stock P-1042 · 12 miles</CardDescription>
          <CardAction>
            <Badge variant="secondary">In stock</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="text-sm">
          Sport side-by-side, 114 hp, Ghost Gray. Arrived on 12 September.
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline">View</Button>
          <Button>Start deal</Button>
        </CardFooter>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Units sold this month</CardTitle>
          <CardDescription>September 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tabular-nums text-foreground">48</p>
          <p className="text-sm text-muted-foreground">12% more than August</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ItemDemo() {
  return (
    <div className="flex max-w-lg flex-col gap-6">
      <ItemGroup>
        <Item>
          <ItemMedia variant="icon">
            <BikeIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>2026 Honda Rebel 500</ItemTitle>
            <ItemDescription>Ready for pickup · Jordan Lee</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Notify
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <WrenchIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Oil change and valve check</ItemTitle>
            <ItemDescription>Bay 3 · due today at 2:00 pm</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </ItemActions>
        </Item>
      </ItemGroup>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline item</ItemTitle>
          <ItemDescription>With a border, for standalone rows.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Muted, small</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">In stock</Badge>
      <Badge variant="destructive">Overdue</Badge>
      <Badge variant="outline">On hold</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar size="sm">
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>SK</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}

function KbdDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span>
        Search: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      </span>
      <span>
        Save: <KbdGroup><Kbd>Ctrl</Kbd><Kbd>S</Kbd></KbdGroup>
      </span>
      <span>
        Close: <Kbd>Esc</Kbd>
      </span>
    </div>
  );
}

const SALES = [
  { month: "Apr", new: 28, used: 14 },
  { month: "May", new: 41, used: 19 },
  { month: "Jun", new: 52, used: 22 },
  { month: "Jul", new: 47, used: 25 },
  { month: "Aug", new: 36, used: 21 },
  { month: "Sep", new: 31, used: 17 },
];

const salesConfig = {
  new: { label: "New units", color: "var(--chart-1)" },
  used: { label: "Used units", color: "var(--chart-2)" },
} satisfies ChartConfig;

function ChartDemo() {
  return (
    <ChartContainer config={salesConfig} className="h-64 w-full max-w-2xl">
      <BarChart accessibilityLayer data={SALES}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="new" fill="var(--color-new)" radius={4} />
        <Bar dataKey="used" fill="var(--color-used)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

function CarouselDemo() {
  return (
    <div className="px-12">
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {["Front", "Side", "Rear", "Dash", "Engine"].map((view, i) => (
            <CarouselItem key={view}>
              <div className="flex aspect-video items-center justify-center rounded-xl bg-muted text-lg font-medium text-foreground">
                {i + 1}. {view} view
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function AspectRatioDemo() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} className="rounded-xl bg-muted">
        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">16 : 9 photo area</div>
      </AspectRatio>
    </div>
  );
}

export const dataDisplayDemos = {
  table: TableDemo,
  card: CardDemo,
  item: ItemDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  kbd: KbdDemo,
  chart: ChartDemo,
  carousel: CarouselDemo,
  "aspect-ratio": AspectRatioDemo,
};
