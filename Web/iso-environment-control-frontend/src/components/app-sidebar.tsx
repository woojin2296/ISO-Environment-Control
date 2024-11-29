import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  versions: ["1.0.0"],
  navMain: [
    {
      title: "Home",
      url: "/",
      items: [
        {
          title: "Dashboard",
          url: "/",
          isActive: false,
        },
      ],
    },
    {
      title: "Realtime Data",
      url: "/realtime-data",
      items: [
        {
          title: "Freezer",
          url: "/realtime-data/freezer",
          isActive: false,
        },
        {
          title: "Refrigerator",
          url: "/realtime-data/refrigerator",
          isActive: false,
        },
        {
          title: "Labotary",
          url: "/realtime-data/rab",
          isActive: false,
        },
        {
          title: "Warehouse",
          url: "/realtime-data/warehouse",
          isActive: false,
        },
      ],
    },
    {
      title: "Historical Data",
      url: "/historical-data",
      items: [
        {
          title: "Freezer",
          url: "/historical-data/freezer",
          isActive: false,
        },
        {
          title: "Refrigerator",
          url: "/historical-data/refrigerator",
          isActive: false,
        },
        {
          title: "Labotary",
          url: "/historical-data/rab",
          isActive: false,
        },
        {
          title: "Warehouse",
          url: "/historical-data/warehouse",
          isAvtive: false,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
