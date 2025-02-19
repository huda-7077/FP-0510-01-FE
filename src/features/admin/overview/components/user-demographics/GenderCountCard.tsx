"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";
import { Pie, PieChart } from "recharts";

const genderCountChartData = [
  { gender: "male", userGenders: 0, fill: "var(--color-male)" },
  { gender: "female", userGenders: 0, fill: "var(--color-female)" },
];

const genderCountChartConfig = {
  userGenders: {
    label: "Users",
  },
  male: {
    label: "Male",
    color: "#2462eb",
  },
  female: {
    label: "Female",
    color: "#4AA9FF",
  },
} satisfies ChartConfig;

interface GenderCountCardProps {
  data: { gender: string; userGenders: number; fill: string }[];
}

const GenderCountCard: FC<GenderCountCardProps> = ({ data }) => {
  return (
    <Card className="group rounded-2xl border-2 border-gray-200 bg-white shadow-none transition-all duration-300 ease-in-out hover:border-blue-600">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl group-hover:text-blue-600">
          Gender Distribution
        </CardTitle>
        <CardDescription>Distribution of users by gender</CardDescription>
      </CardHeader>
      <CardContent className="lg:m-0 lg:p-0 lg:pb-8">
        <ChartContainer
          config={genderCountChartConfig}
          className="mx-auto aspect-square max-h-[272px] lg:max-h-[360px] xl:max-h-[480px] [&_.recharts-text]:fill-background"
        >
          <PieChart accessibilityLayer>
            <Pie
              data={data.length <= 0 ? genderCountChartData : data}
              dataKey="userGenders"
            />
            <ChartTooltip content={<ChartTooltipContent nameKey="gender" />} />
            <ChartLegend content={<ChartLegendContent nameKey="gender" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GenderCountCard;
