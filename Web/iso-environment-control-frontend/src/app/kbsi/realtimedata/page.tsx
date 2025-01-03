"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataCard } from "@/components/data-card"
import { DataChart } from "@/components/data-chart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"

export default function Home() {
  const interval = 60

  const [sensor5, setSensor5] = React.useState()

  React.useEffect(() => {
    getData()
    const id = setInterval(() => {
      getData()
    }, interval * 1000)
    return () => clearInterval(id)
  }, [])

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-M2M-RI", "12345");
    myHeaders.append("X-M2M-Origin", "SOrigin");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor4/la`, requestOptions)
        .then((res) => res.json())
        .then((data) => setSensor5(data["m2m:cin"].con))
        .catch((error) => console.error(error));
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Remote Monitoring System
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>KBSI</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <DataCard title="SmartFarm" description="Temperature" timestamp={sensor5 ? sensor5['timestamp'] : "No data"} value={sensor5 ? sensor5['temperature'] + "°C" : "No data°C"} />
            <DataCard title="SmartFarm" description="Humidity" timestamp={sensor5 ? sensor5['timestamp'] : "No data"} value={sensor5 ? sensor5['humidity'] + "%" : "No data%"} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
