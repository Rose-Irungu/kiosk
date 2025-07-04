"use client"

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Legend,
  YAxis,
  ResponsiveContainer
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent
} from "@/components/ui/chart"

const chartData = [
  { day: "M", company: 155, resident: 180, service: 110 },
  { day: "T", company: 198, resident: 148, service: 90 },
  { day: "W", company: 182, resident: 158, service: 158 },
  { day: "T", company: 200, resident: 178, service: 104 },
  { day: "F", company: 168, resident: 135, service: 75 },
  { day: "S", company: 30, resident: 140, service: 70 },
  { day: "S", company: 55, resident: 150, service: 68 },
]

const chartConfig = {
  company: {
    label: "Company Visitors",
    color: "#7C3AED", // Purple
  },
  resident: {
    label: "Resident’s Visitors",
    color: "#065F46", // Deep Green
  },
  service: {
    label: "Service Providers",
    color: "#FACC15", // Yellow
  },
}

export default function ChartPage() {
  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Visitors Trend</h2>

      {/* Smaller, calibrated chart container */}
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="day"
              axisLine
              tickLine
              tickMargin={8}
              label={{ value: "Day of the Week", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              axisLine
              tickLine
              tick={{ fontSize: 12 }}
              label={{ value: "Visitors", angle: -90, position: "insideLeft", dx: -10 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" labelKey="day" />}
            />
            <Legend content={<ChartLegendContent />} />
            <Bar dataKey="company" fill="var(--color-company)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resident" fill="var(--color-resident)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="service" fill="var(--color-service)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
