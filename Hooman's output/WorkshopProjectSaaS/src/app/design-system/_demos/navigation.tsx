"use client";

import Link from "next/link";
import {
  BikeIcon,
  CalendarIcon,
  ChevronsUpDownIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Caption } from "../Showcase";

const NAV = [
  { label: "Dashboard", icon: HomeIcon, active: true },
  { label: "Inventory", icon: BikeIcon, badge: "128" },
  { label: "Customers", icon: UsersIcon },
  { label: "Service", icon: WrenchIcon, badge: "6" },
  { label: "Calendar", icon: CalendarIcon },
];

function SidebarDemo() {
  return (
    <div className="h-96 overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-0 h-full">
        <Sidebar collapsible="none" className="h-full border-r">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BikeIcon className="size-4" />
                  </div>
                  <div className="grid text-left leading-tight">
                    <span className="font-semibold">Ridge Powersports</span>
                    <span className="text-xs text-muted-foreground">Main showroom</span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dealership</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add">
                <PlusIcon />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton isActive={item.active}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
          Page content goes here
        </div>
      </SidebarProvider>
    </div>
  );
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-1">
              {[
                ["New units", "Current model year stock"],
                ["Used units", "Trade-ins and pre-owned"],
                ["Parts & accessories", "Helmets, tyres, oil and more"],
              ].map(([title, text]) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <Link href="#navigation-menu">
                      <div className="text-sm font-medium text-foreground">{title}</div>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Service</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-1">
              {["Book a service", "Work orders", "Warranty claims"].map((title) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <Link href="#navigation-menu">{title}</Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#navigation-menu">Reports</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function TabsDemo() {
  return (
    <div className="grid gap-8">
      <div>
        <Caption>Default</Caption>
        <Tabs defaultValue="details" className="max-w-md">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">Service history</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="text-sm">
            VIN, colour, mileage and options.
          </TabsContent>
          <TabsContent value="history" className="text-sm">
            4 previous services.
          </TabsContent>
          <TabsContent value="docs" className="text-sm">
            Title, bill of sale and warranty.
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <Caption>Line</Caption>
        <Tabs defaultValue="all">
          <TabsList variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#breadcrumb">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#breadcrumb">Inventory</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>P-1042</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function PaginationDemo() {
  return (
    <Pagination className="justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#pagination" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#pagination" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export const navigationDemos = {
  sidebar: SidebarDemo,
  "navigation-menu": NavigationMenuDemo,
  tabs: TabsDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
};
