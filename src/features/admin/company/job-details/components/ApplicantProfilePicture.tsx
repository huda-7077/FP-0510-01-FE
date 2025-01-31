import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetInitials from "@/hooks/useGetInitials";
import { FC } from "react";

interface ApplicantProfilePictureProps {
  profilePicture: string;
  fullName: string;
  ringColor: string;
}

const ApplicantProfilePicture: FC<ApplicantProfilePictureProps> = ({
  profilePicture,
  fullName,
  ringColor,
}) => {
  const { getInitials } = useGetInitials();

  return (
    <Avatar className="h-20 w-20 ring-4 ring-white/20">
      <AvatarImage
        src={profilePicture}
        alt={fullName}
        className="object-cover"
      />
      <AvatarFallback className={`bg-blue-100 text-xl font-bold ${ringColor}`}>
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default ApplicantProfilePicture;
