"use client"

import React from "react"
import { PieChart, Pie, Cell, Label } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { name: "Resolved", value: 4, fill: "#22C55E" },
  { name: "Ongoing", value: 1, fill: "#8B5CF6" },
]

export default function EmergencyStatsChart() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="w-full max-w-[300px] bg-white p-4 shadow-sm rounded-xl">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="text-sm font-semibold text-gray-900">
          Emergency Dashboard Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-3 px-0 pt-2">
        {/* ✅ Increased Chart Size */}
        <PieChart width={140} height={140}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}     // ⬆️ Increased
            outerRadius={68}     // ⬆️ Increased
            stroke="none"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false}
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.fill} />
            ))}
            <Label
              position="center"
              content={({ cx, cy }) => {
                if (cx == null || cy == null) return null
                return (
                  <>
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      className="fill-gray-900 text-[20px] font-semibold"
                      style={{ dominantBaseline: "middle" }}
                    >
                      {total}
                    </text>
                    <text
                      x={cx}
                      y={cy + 16}
                      textAnchor="middle"
                      className="fill-gray-400 text-[11px]"
                    >
                      Total Emergencies
                    </text>
                  </>
                )
              }}
            />
          </Pie>
        </PieChart>

        {/* Legend (unchanged) */}
        <div className="flex flex-col gap-3 text-sm pl-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#22C55E]" />
            <span className="text-gray-700">Resolved</span>
            <span className="ml-auto font-semibold text-green-600">
              {chartData[0].value}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#8B5CF6]" />
            <span className="text-gray-700">Ongoing</span>
            <span className="ml-auto font-semibold text-purple-600">
              {chartData[1].value}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
