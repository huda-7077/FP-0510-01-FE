import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, MailWarning } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";

interface ProfileAlertProps {
  profileData?: User;
  isLoading?: boolean;
}

const ProfileAlert = ({ profileData, isLoading = false }: ProfileAlertProps) => {
  const isProfileComplete = profileData && 
    !!profileData.fullName && 
    !!profileData.phoneNumber && 
    !!profileData.currentAddress && 
    !!profileData.dateOfBirth &&
    !!profileData.headline &&
    !!profileData.educationLevel;

  const isEmailVerified = profileData?.isVerified;
  
  return (
    <div className="flex flex-col gap-6">
      {!isLoading && !isProfileComplete && (
        <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-[#e05151] p-4 text-white duration-150 hover:shadow-lg md:flex-row md:p-7">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={profileData?.profilePicture || "/anonymous.svg"}
                alt={profileData?.fullName || "User"}
                className="object-cover"
              />
              <AvatarFallback>
                <Image
                  src="/anonymous.svg"
                  alt="Anonymous User"
                  width={48}
                  height={48}
                  priority
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg">Your profile editing is not completed</h1>
              <p className="text-xs md:text-sm">
                complete your profile editing & build your custom Resume
              </p>
            </div>
          </div>
          <Link href="/dashboard/user/settings">
            <Button
              variant="outline"
              className="group self-start rounded-md bg-white text-[#e05151] shadow-none transition-colors hover:bg-slate-50 hover:text-[#e05151] sm:self-auto"
            >
              Edit Profile
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && !isEmailVerified && (
        <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-orange-500 p-4 text-white duration-150 hover:shadow-lg md:flex-row md:p-7">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <MailWarning className="text-white" />
            <h1 className="md:text-base text-sm">
              Verify your email to access all Supajob features, including applying
              for jobs and connecting with employers.
            </h1>
          </div>
          <Link href="/dashboard/user/settings">
            <Button
              variant="outline"
              className="group self-start rounded-md bg-white text-orange-500 shadow-none transition-colors hover:bg-slate-50 hover:text-[#e05151] sm:self-auto"
            >
              Verify Email
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileAlert;