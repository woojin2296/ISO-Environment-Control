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
  navMain: [
    {
      title: "Home",
      items: [
        {
          title: "Dashboard",
          url: "/",
          isActive: false,
        },
      ],
    },
    {
      title: "Data History",
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
          title: "Labotatory",
          url: "/historical-data/laboratory",
          isActive: false,
        },
        {
          title: "Storage",
          url: "/historical-data/storage",
          isAvtive: false,
        },
      ],
    },
    {
      title: "Smart Farm",
      items: [
        {
          title: "Dashboard",
          url: "/farm/realtimedata",
          isActive: false,
        },
        {
          title: "Data History",
          url: "/farm/historicaldata",
          isActive: false,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
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
