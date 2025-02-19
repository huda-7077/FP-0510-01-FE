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
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const provinceChartConfig = {
  users: {
    label: "Users",
    color: "#2562ea",
  },
} satisfies ChartConfig;

interface UsersByProvinceCardProps {
  data: { province: string; users: number }[];
}

const UsersByProvinceCard: FC<UsersByProvinceCardProps> = ({ data }) => {
  const chartHeight = Math.max(272, data.length * 50);
  const cardHeight = chartHeight + 150;

  return (
    <Card
      className="group rounded-2xl border-2 border-gray-200 bg-white shadow-none transition-all duration-300 ease-in-out hover:border-blue-600"
      style={{ height: `${cardHeight}px` }}
    >
      <CardHeader>
        <CardTitle className="text-2xl group-hover:text-blue-600">
          Province Distribution
        </CardTitle>
        <CardDescription>
          Distribution of users by province ranges
        </CardDescription>
      </CardHeader>
      <CardContent style={{ height: `${chartHeight}px` }}>
        <ChartContainer
          className="max-w-[274px] sm:max-w-[512px] md:max-w-[632px] lg:max-w-[680px] xl:max-w-[880px] 2xl:max-w-[1080px]"
          config={provinceChartConfig}
          style={{ height: `${chartHeight}px` }}
        >
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
            height={chartHeight}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="province"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="users" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="users"
              layout="vertical"
              fill="var(--color-users)"
              radius={4}
            >
              <LabelList
                dataKey="province"
                position="insideLeft"
                offset={8}
                className="fill-[#ffffff]"
                fontSize={12}
              />
              <LabelList
                dataKey="users"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UsersByProvinceCard;
