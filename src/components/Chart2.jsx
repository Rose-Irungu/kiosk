"use client"

import React from "react"
import { PieChart, Pie, Cell, Label } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmergencyStatsChart({ ongoing, resolved }) {
  const chartData = [
    { name: "Resolved", value: resolved, fill: "#22C55E" },
    { name: "Ongoing", value: ongoing, fill: "#8B5CF6" },
  ]

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="flex flex-col justify-center w-full max-w-[537px] h-auto md:h-[221px] rounded-[10px] p-4 md:p-6 bg-white gap-[12px]">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="text-sm font-semibold text-gray-900">
          Emergency Dashboard Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-3 px-0 pt-2">
        <PieChart width={140} height={140}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={68}
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

        <div className="flex flex-col gap-3 text-sm pl-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#22C55E]" />
            <span className="text-gray-700">Resolved</span>
            <span className="ml-auto font-semibold text-green-600">
              {resolved}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#8B5CF6]" />
            <span className="text-gray-700">Ongoing</span>
            <span className="ml-auto font-semibold text-purple-600">
              {ongoing}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
