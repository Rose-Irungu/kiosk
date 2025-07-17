"use client";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  ChartContainer,
  ChartLegendContent,
} from "@/components/ui/chart";

import useVisitorStats from "@/hooks/useVisitorStats";

const chartConfig = {
  company: {
    label: "Company Visitors",
    color: "#502deb",
  },
  resident: {
    label: "Resident’s Visitors",
    color: "#005e0e",
  },
  service: {
    label: "Service Providers",
    color: "#a996fe",
  },
};

// Utility to transform the nested object
const transformVisitorTrend = (trendData) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const labels = { Mon: "M", Tue: "T", Wed: "W", Thu: "T", Fri: "F", Sat: "S", Sun: "S" };

  return days.map((day) => ({
    day: labels[day],
    company: trendData?.company_visitor?.[day] || 0,
    resident: trendData?.visitor?.[day] || 0,
    service: trendData?.service_provider?.[day] || 0,
  }));
};

export default function ChartPage() {
  const { stats, loading, error } = useVisitorStats();
  const visitorTrend = stats?.visitor_trend || {};
  const chartData = transformVisitorTrend(visitorTrend);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Visitors Trend</h2>

      {loading ? (
        <p className="text-center py-10">Loading chart...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-10">{error}</p>
      ) : (
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="day"
                axisLine
                tickLine
                tickMargin={8}
                label={{
                  value: "Day of the Week",
                  position: "insideBottom",
                  dy: 10,
                }}
              />
              <YAxis
                axisLine
                tickLine
                tick={{ fontSize: 12 }}
                ticks={[0, 10, 20, 30, 40]}
                domain={[0, 40]}
              />
              <Legend content={<ChartLegendContent />} verticalAlign="top" align="center" />
              <Bar dataKey="company" fill={chartConfig.company.color} />
              <Bar dataKey="resident" fill={chartConfig.resident.color} />
              <Bar dataKey="service" fill={chartConfig.service.color} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  );
}
