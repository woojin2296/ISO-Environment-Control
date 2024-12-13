import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function DataCard({ title, description, timestamp, value}: { title: string, description: string, timestamp: string, value: string }) {

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
    <Card className="bg-muted/50">
      <div className="flex justify-between">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardHeader>
            <CardDescription>{ timestamp.includes("No data") ? <LoaderCircle className="animate-spin" /> : convertToKST(timestamp) }</CardDescription>
        </CardHeader>
      </div>
        
        <CardContent className="text-4xl">
            { value.includes("No data") ? <LoaderCircle className="animate-spin" /> : value }
        </CardContent>
    </Card>
  )
}
