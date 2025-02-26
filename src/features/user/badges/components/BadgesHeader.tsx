import { Badge } from "@/components/ui/badge";

interface BadgesHeaderProps {
  totalBadges: number;
}

export const BadgesHeader = ({ totalBadges }: BadgesHeaderProps) => {
  return (
    <div className="space-y-4 border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Badges</h1>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700"
          >
            {totalBadges}
          </Badge>
        </div>
      </div>
    </div>
  );
};
