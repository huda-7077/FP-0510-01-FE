import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BadgeData } from "@/types/badge";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { SlBadge } from "react-icons/sl";

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  badge: BadgeData;
}

export function DetailsDialog({ isOpen, onClose, badge }: DetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader hidden></DialogHeader>
      <DialogContent className="max-h-[90vh] max-w-sm overflow-y-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
        <SlBadge className="ml-3 mt-3 h-7 w-7 text-amber-600 transition-colors group-hover:text-amber-500" />

        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={badge.badgeImage}
              alt={badge.badgeName}
              width={100}
              height={100}
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
        <DialogTitle className="line-clamp-2 flex h-10 w-full items-center justify-center break-all text-2xl font-semibold text-gray-950">
          {badge.badgeName}
        </DialogTitle>
        <div className="border-t-4"></div>
        <DialogDescription className="line-clamp-2 flex h-10 w-full items-center justify-center break-all text-sm font-semibold text-gray-700">
          {badge.description}
        </DialogDescription>
        <div className="text-xs font-semibold text-gray-700">
          Awarded At:{" "}
          {format(new Date(badge.awardedAt), "hh:mm aa dd MMM yyyy")}
        </div>

        <div className="mt-2 flex justify-center">
          <Link
            href={badge.certificate.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Certificate Link
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
