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
import { DataTable } from "@/components/data-table"
import { subDays } from "date-fns"

export default function Home() {

  const [data, setData] = React.useState<SensorData[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: subDays(new Date(), 1),
    to: new Date(), 
  });

  function getData () {
    const result: SensorData[] = [];

    if (!dateRange || !dateRange.from || !dateRange.to) {
      setData([]);
      return;
    }

    const startDate = dateRange.from.toISOString().slice(0, 10).replace(/-/g, "").concat("T000000");
    const endDate = dateRange.to.toISOString().slice(0, 10).replace(/-/g, "").concat("T235959");

    const limit = 2000;
    let offset = 0;
    let hasMore = true;

    const url = `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor3?ty=4&rcn=4&fu=2&cra=${startDate}&crb=${endDate}&lim=${limit}&ofst=${offset}`;
    
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
      .then((data) => data.map((item: any) => {
        const conData = item.con;
        if (conData.timestamp) {
          conData.timestamp = convertToKST(conData.timestamp);
        }
        return conData;
      }))
      .then((data) => {
        result.push(...data)
        console.log(result)
        if (data.length < limit) {
          hasMore = false;
        }
        else {
          offset += limit;
        }
        setData(result);
      })
      .catch((error) => console.error(error));
  }

  React.useEffect(() => {
    getData();
  }, [dateRange]);

  function convertToKST(utcTimestamp: string): string {
    const formattedTimestamp = utcTimestamp.replace(/\//g, "-").replace(" ", "T") + "Z";
    const date = new Date(formattedTimestamp);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
    return formattedDate.replaceAll(" ", "").replace(".오전", " ").replace(".오후", " ");
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
                <BreadcrumbPage>Laboratory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <DataTable data={data} dateRange={dateRange} setDateRange={setDateRange}/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
