"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DataCard } from "@/components/data-card";
import { DataChart } from "@/components/data-chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export default function Home() {
  const interval = 5;

  const [sensor5, setSensor5] = React.useState();
  const [sensor6_1, setSensor6_1] = React.useState(0);
  const [sensor6_2, setSensor6_2] = React.useState(0);
  const [sensor6_3, setSensor6_3] = React.useState(0);
  const [sensor6_4, setSensor6_4] = React.useState(0);
  const [sensor6_5, setSensor6_5] = React.useState(0);
  const [sensor6_6, setSensor6_6] = React.useState(0);
  const [sensor6_7, setSensor6_7] = React.useState(0);
  const [sensor6_8, setSensor6_8] = React.useState(0);
  const [sensor6_9, setSensor6_9] = React.useState(0);
  const [sensor6_10, setSensor6_10] = React.useState(0);

  React.useEffect(() => {
    getData();
    const id = setInterval(() => {
      getData();
    }, interval * 1000);
    return () => clearInterval(id);
  }, []);

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-M2M-RI", "12345");
    myHeaders.append("X-M2M-Origin", "SOrigin");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor5/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor5(data["m2m:cin"].con))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-1/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_1(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-2/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_2(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-3/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_3(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-4/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_4(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-5/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_5(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-6/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_6(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-7/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_7(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-8/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_8(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-9/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_9(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));

    fetch(
      `http://203.253.128.177:7579/Mobius/ISO-Environment-Control/Sensor6-10/la`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setSensor6_10(data["m2m:cin"].con.voltage))
      .catch((error) => console.error(error));
  };

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
                <BreadcrumbPage>Smart Farm</BreadcrumbPage>
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
            <DataCard
              title="SmartFarm"
              description="Temperature"
              timestamp={sensor5 ? sensor5["timestamp"] : "No data"}
              value={sensor5 ? sensor5["temperature"] + "°C" : "No data°C"}
            />
            <DataCard
              title="SmartFarm"
              description="Humidity"
              timestamp={sensor5 ? sensor5["timestamp"] : "No data"}
              value={sensor5 ? sensor5["humidity"] + "%" : "No data%"}
            />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            <DataChart title="Sensor1" description="test1" value={sensor6_1} />
            <DataChart title="Sensor2" description="test2" value={sensor6_2} />
            <DataChart title="Sensor3" description="test3" value={sensor6_3} />
            <DataChart title="Sensor4" description="test4" value={sensor6_4} />
            <DataChart title="Sensor5" description="test5" value={sensor6_5} />
            <DataChart title="Sensor6" description="test6" value={sensor6_6} />
            <DataChart title="Sensor7" description="test7" value={sensor6_7} />
            <DataChart title="Sensor8" description="test8" value={sensor6_8} />
            <DataChart title="Sensor9" description="test9" value={sensor6_9} />
            <DataChart title="Sensor10" description="test10" value={sensor6_10} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
