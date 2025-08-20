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

const transformVisitorTrend = (trendData) => {
  const labels = trendData?.labels || [];
  const datasets = trendData?.datasets || [];

  const result = labels.map((label, index) => {
    const entry = {
      day: label[0],
    };

    datasets.forEach((ds) => {
      if (ds.label === "guest") {
        entry.resident = ds.data[index];
      } else if (ds.label === "service") {
        entry.service = ds.data[index];
      } else if (ds.label === "company") {
        entry.company = ds.data[index];
      }
    });

    return entry;
  });

  return result;
};


export default function ChartPage() {
  const { stats, loading, error } = useVisitorStats();
  const visitorTrend = stats?.visitor_trend || {};
  const chartData = transformVisitorTrend(visitorTrend);
  const maxYValue = Math.max(
    ...chartData.flatMap((item) => [item.company, item.resident, item.service])
  );
  const dynamicMax = Math.ceil((maxYValue + 5) / 10) * 10;
  

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
                domain={[0, dynamicMax]}
                tickFormatter={(value) => (Number.isInteger(value) ? value : "")}
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
