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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const ageChartData = [
  { age: "< 17", userAges: 0 },
  { age: "18-24", userAges: 0 },
  { age: "25-34", userAges: 0 },
  { age: "35-44", userAges: 0 },
  { age: "45-54", userAges: 0 },
  { age: "55-64", userAges: 0 },
  { age: "65+", userAges: 0 },
];

const ageChartConfig = {
  userAges: {
    label: "User Ages",
    color: "#2562ea",
  },
} satisfies ChartConfig;

interface AgeRangesCardProps {
  data: { age: string; userAges: number }[];
}

const AgeRangesCard: FC<AgeRangesCardProps> = ({ data }) => {
  return (
    <Card className="group h-full rounded-2xl border-2 border-gray-200 bg-white shadow-none transition-all duration-300 ease-in-out hover:border-blue-600">
      <CardHeader>
        <CardTitle className="text-2xl group-hover:text-blue-600">
          Age Distribution
        </CardTitle>
        <CardDescription>Distribution of users by age ranges</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer
          config={ageChartConfig}
          className="mx-auto h-[224px] max-w-[272px] md:h-[260px] md:max-w-[292px] lg:h-[340px] lg:max-w-[320px] xl:h-[348px] xl:max-w-[400px] 2xl:h-[452px] 2xl:max-w-[500px] [&_.recharts-text]:fill-background"
        >
          <BarChart
            accessibilityLayer
            data={data.length <= 0 ? ageChartData : data}
            layout="vertical"
            className="-ms-4 md:-ms-4 xl:-ms-2"
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="userAges" hide />
            <YAxis
              dataKey="age"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              fontWeight="bold"
            />
            <ChartTooltip content={<ChartTooltipContent nameKey="age" />} />
            <Bar dataKey="userAges" fill="#2562ea" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AgeRangesCard;
