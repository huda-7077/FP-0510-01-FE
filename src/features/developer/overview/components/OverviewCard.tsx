import { FC } from "react";

interface OverviewCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  bgColor: string;
}

const OverviewCard: FC<OverviewCardProps> = ({
  title,
  value,
  icon,
  bgColor,
}) => {
  return (
    <div className={`rounded-lg p-6 shadow-md ${bgColor} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
