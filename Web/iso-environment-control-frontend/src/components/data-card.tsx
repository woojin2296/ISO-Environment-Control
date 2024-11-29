import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function DataCard({ title, description, value}: { title: string, description: string, value: string }) {
  return (
    <Card className="bg-muted/50">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-4xl">
            { value.includes("No data") ? <LoaderCircle className="animate-spin" /> : value }
        </CardContent>
    </Card>
  )
}
