import { Button } from "@/components/ui/button";
import {
  Calendar,
  Check,
  Globe,
  House,
  Link,
  Mail,
  Map,
  MapPinHouse,
  PhoneCall,
  Timer,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { Company } from "@/types/company";

interface CompanyOverviewProps {
  company?: Company;
}

const CompanyOverview = ({ company }: CompanyOverviewProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = `Check out this company: ${company?.name}`;
  const shareDescription = `${company?.name} in the ${company?.industry} industry. Location: ${company?.companyLocations?.[0]?.regency?.regency}, ${company?.companyLocations?.[0]?.regency?.province?.province}`;

  // Handle copying the link to clipboard
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  // Determine the appropriate icon for each link
  const getLinkIcon = (url: string) => {
    if (url.includes("facebook.com"))
      return <FaFacebookF className="h-7 w-7" />;
    if (url.includes("youtube.com")) return <FaYoutube className="h-7 w-7" />;
    if (url.includes("instagram.com"))
      return <FaInstagram className="h-7 w-7" />;
    if (url.includes("twitter.com") || url.includes("x.com"))
      return <FaXTwitter className="h-7 w-7" />;
    return <Globe className="h-7 w-7" />; // Default icon for unknown links
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Company Stats Section */}
      <div className="space-y-9 rounded-lg border-[1px] border-blue-200 p-8 shadow-sm">
        <div className="space-y-5">
          <h2>Company Stats</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Calendar className="h-7 w-7 text-blue-600" />
              <p className="text-[11px] font-extralight text-gray-400">
                ESTABLISHED YEAR:
              </p>
              <p className="text-sm">{company?.establishedYear || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <UsersRound className="h-7 w-7 text-blue-600" />
              <p className="text-[11px] font-extralight text-gray-400">
                TEAM SIZE:
              </p>
              <p className="text-sm">
                {company?.employeeCount || "N/A"} Candidates
              </p>
            </div>
            <div className="space-y-1">
              <House className="h-7 w-7 text-blue-600" />
              <p className="text-[11px] font-extralight text-gray-400">
                INDUSTRY:
              </p>
              <p className="text-sm">{company?.industry || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Share Profile Section */}
        <div className="space-y-4 border-t-[1px] border-blue-200 pt-5">
          <h2>Share Profile:</h2>
          <div className="flex flex-wrap items-center gap-3">
            {/* Copy Link Button */}
            <Button
              className="rounded-sm bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-blue-50"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Link className="mr-1 h-5 w-5" />
                  Copy Link
                </>
              )}
            </Button>

            <LinkedinShareButton
              url={shareUrl}
              title={shareTitle}
              summary={shareDescription}
              source={company?.name}
            >
              <LinkedinIcon size={37} round />
            </LinkedinShareButton>

            <FacebookShareButton url={shareUrl} hashtag="#CompanyProfile">
              <FacebookIcon size={37} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={shareTitle}
              hashtags={[
                "CompanyProfile",
                company?.industry?.replace(/\s+/g, "") || "",
              ]}
            >
              <XIcon size={37} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={shareTitle}
              separator=":: "
            >
              <WhatsappIcon size={37} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>

      <div className="space-y-9 rounded-lg border-[1px] border-blue-200 p-8 shadow-sm">
        <div className="space-y-5">
          <h2>Contact Information</h2>

          <div className="flex items-center gap-5 border-b-[1px] p-3 pb-5">
            <Mail className="h-7 w-7 text-blue-600" />
            <div className="space-y-1">
              <p className="text-[11px] font-extralight text-gray-400">
                EMAIL ADDRESS
              </p>
              <a
                className="text-sm hover:text-blue-600"
                href={`mailto:${company?.users?.[0]?.email || "#"}`}
              >
                {company?.users?.[0]?.email || "N/A"}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-b-[1px] p-3 pb-5">
            <div className="flex items-center gap-5">
              <MapPinHouse className="h-7 w-7 text-blue-600" />
              <div className="space-y-1">
                <p className="text-[11px] font-extralight text-gray-400">
                  LOCATIONS
                </p>
              </div>
            </div>

            {company?.companyLocations?.slice(0, 3).map((location, index) => (
              <div key={index} className="ml-12 flex items-center gap-2">
                <a
                  className="text-sm hover:text-blue-600"
                  href={
                    location?.latitude && location?.longitude
                      ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {location
                    ? `${location.address}, ${location.regency.regency}, ${location.regency.province.province}`
                    : "N/A"}
                </a>
              </div>
            ))}

            {company && company?.companyLocations.length > 3 && (
              <div className="ml-12 flex items-center gap-2 text-sm text-gray-500">
                {company.companyLocations.length - 3} more location
                {company.companyLocations.length - 3 > 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 border-b-[1px] p-3 pb-5">
            <PhoneCall className="h-7 w-7 text-blue-600" />
            <div className="space-y-1">
              <p className="text-[11px] font-extralight text-gray-400">PHONE</p>
              <a
                className="text-sm hover:text-blue-600"
                href={`tel:${company?.users?.[0]?.phoneNumber || "#"}`}
              >
                {company?.users?.[0]?.phoneNumber || "N/A"}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 pb-5">
            <div className="space-y-1">
              <p className="text-[11px] font-extralight text-gray-400">LINKS</p>
              <div className="flex flex-wrap gap-2">
                {company?.links
                  ?.split(",")
                  .map((link: string, index: number) => (
                    <Button
                      key={index}
                      className="bg-blue-600 p-3 text-white hover:bg-blue-100 hover:text-blue-600"
                    >
                      <a
                        href={link.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getLinkIcon(link.trim())}
                      </a>
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
