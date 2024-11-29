"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataCard } from "@/components/data-card"
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
  const interval = 3

  const [currentTime, setCurrentTime] = React.useState(new Date())

  const [sensor1, setSensor1] = React.useState()
  const [sensor2, setSensor2] = React.useState()
  const [sensor3, setSensor3] = React.useState()
  const [sensor4, setSensor4] = React.useState()

  React.useEffect(() => {
    getData()
    const id = setInterval(() => {
      getData()
    }, interval * 1000)
    return () => clearInterval(id)
  }, [])

  const getData = () => {
    setCurrentTime(new Date())

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-M2M-RI", "12345");
    myHeaders.append("X-M2M-Origin", "SOrigin");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor1/la`, requestOptions)
        .then((res) => res.json())
        .then((data) => setSensor1(data["m2m:cin"].con))
        .catch((error) => console.error(error));
    
    fetch(`http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor2/la`, requestOptions)
        .then((res) => res.json())
        .then((data) => setSensor2(data["m2m:cin"].con))
        .catch((error) => console.error(error));

    fetch(`http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor3/la`, requestOptions)
        .then((res) => res.json())
        .then((data) => setSensor3(data["m2m:cin"].con))
        .catch((error) => console.error(error));

    fetch(`http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor4/la`, requestOptions)
        .then((res) => res.json())
        .then((data) => setSensor4(data["m2m:cin"].con))
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
                <BreadcrumbPage>History</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Freezer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          In development
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
