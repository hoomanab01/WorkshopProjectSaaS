"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { FigmaIcon } from "./FigmaIcon";

const ICONS = "/figma/deals";

type NavItem = { label: string; icon: string; href?: string };

// Only Deals has a page so far; the other entries are placeholders from the design.
const NAV: { label?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: "Dashboard", icon: "grid" },
      { label: "Inbox", icon: "inbox" },
      { label: "Calendar", icon: "calendar" },
    ],
  },
  {
    label: "Main",
    items: [
      { label: "Contacts", icon: "users" },
      { label: "Properties", icon: "properties" },
      { label: "Deals", icon: "deal", href: "/deals" },
    ],
  },
  {
    label: "AI",
    items: [
      { label: "Assistants", icon: "assistants" },
      { label: "Workflows", icon: "zap" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Exposés", icon: "share-2" },
      { label: "Campaigns", icon: "volume-2" },
      { label: "Data import", icon: "file-plus" },
    ],
  },
];

const itemClass =
  "h-[34px] gap-3 rounded-lg p-2 font-medium text-(--text-paragraph) hover:bg-(--surface-neutral-dark)/60 hover:text-(--text-paragraph) data-active:bg-(--surface-neutral-dark) data-active:text-(--text-paragraph)";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar" onClick={toggleSidebar}>
      <FigmaIcon src={`${ICONS}/sidebar.svg`} size={20} />
    </Button>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-(--stroke-information)">
      <SidebarHeader className="h-[50px] flex-row items-center justify-between border-b border-(--stroke-information) px-6 py-0">
        {/* Placeholder: the design shows another company's logo. */}
        <div className="flex h-5 w-20 items-center justify-center rounded bg-(--surface-neutral-dark) text-xs font-semibold text-(--text-paragraph)">
          Logo
        </div>
        <SidebarToggle />
      </SidebarHeader>

      <SidebarContent className="gap-4 p-6">
        <InputGroup className="h-[34px] rounded-xl border-(--stroke-information) bg-(--surface-neutral-white)">
          <InputGroupAddon className="pl-4">
            <FigmaIcon src={`${ICONS}/search.svg`} />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." aria-label="Search" />
        </InputGroup>

        {NAV.map((group, i) => (
          <SidebarGroup key={group.label ?? i} className="gap-1 p-0">
            {group.label && (
              <SidebarGroupLabel className="h-8 px-2 text-xs font-semibold text-(--text-label)">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1">
              {group.items.map((item) => {
                const icon = <FigmaIcon src={`${ICONS}/${item.icon}.svg`} />;
                return (
                  <SidebarMenuItem key={item.label}>
                    {item.href ? (
                      <SidebarMenuButton asChild isActive={pathname === item.href} className={itemClass}>
                        <Link href={item.href}>
                          {icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton className={itemClass}>
                        {icon}
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-1 px-6 pt-0 pb-6">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton className={itemClass}>
              <span className="flex rounded-lg bg-(--surface-neutral-white) p-1">
                <FigmaIcon src={`${ICONS}/bell.svg`} />
              </span>
              <span>Notifications</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarFallback className="bg-(--surface-neutral-white) text-sm font-medium text-(--text-label)">
                HA
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 font-medium">
              <p className="truncate text-sm leading-[18px] text-(--text-paragraph)">Hooman Abbasi</p>
              <p className="truncate text-xs text-(--text-label)">Hooman@duxica.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-xs" aria-label="Account menu">
                  <FigmaIcon src={`${ICONS}/more-vertical.svg`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                <DropdownMenuItem>Account settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
