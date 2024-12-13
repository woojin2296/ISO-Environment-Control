"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { SensorData, DateRange } from "@/lib/Type"

export default function Home() {

  const [data, setData] = React.useState<SensorData[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });


  function getData () {
    const result: SensorData[] = [];

    const startDate = dateRange.from.toISOString().slice(0, 10).replace(/-/g, "").concat("T000000");
    const endDate = dateRange.to.toISOString().slice(0, 10).replace(/-/g, "").concat("T235959");

    const limit = 2000;
    let offset = 0;
    let hasMore = true;

    const url = `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor1?ty=4&rcn=4&fu=2&cra=${startDate}&crb=${endDate}&lim=${limit}&ofst=${offset}`;
    
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-M2M-RI", "12345");
    myHeaders.append("X-M2M-Origin", "SOrigin");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => data["m2m:rsp"]["m2m:cin"] || [])
        .then((data) => data.map((item: any) => item.con))
        .then((data) => {
          result.push(...data)
          
          console.log(data.length)
          if (data.length < limit) {
            hasMore = false;
            console.log("No more data")
          }
          else {
            offset += limit;
          }
        })
        .catch((error) => console.error(error));
        
    // while (hasMore) {
    //   fetch(url, requestOptions)
    //     .then((res) => res.json())
    //     .then((data) => data["m2m:rsp"]["m2m:cin"] || [])
    //     .then((data) => data.map((item: any) => item.con))
    //     .then((data) => {
    //       result.push(...data)
          
    //       if (data.length < limit) {
    //         console.log("No more data")
    //       }
    //       else {
    //         offset += limit;
    //       }
    //       console.log(result)
    //     })
    //     .catch((error) => console.error(error));
    // }
  }

  getData();

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
          <Button>Search</Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
