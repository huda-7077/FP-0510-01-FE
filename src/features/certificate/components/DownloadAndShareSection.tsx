import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CertificateData } from "@/types/certificate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Share2 } from "lucide-react";
import React from "react";
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
import CertificateTemplate from "./CertifcateTemplate";

interface DownloadAndShareSectionProps {
  certificate: CertificateData;
}

const DownloadAndShareSection: React.FC<DownloadAndShareSectionProps> = ({
  certificate,
}) => {
  const { fullName, title, badgeImage, createdAt, certificateUrl } =
    certificate;

  const shareTitle = `${fullName}'s Certificate of Completion`;
  const shareQuote = `I am proud to share that I have successfully completed the ${title} course!`;

  return (
    <div className="px-2 md:py-1">
      <Card className="mx-auto max-w-[1123px] rounded-none bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {badgeImage && (
                <div className="h-16 w-16 rounded-lg bg-yellow-100 p-2">
                  <img
                    src={badgeImage}
                    alt={`${title} badge`}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certificate of Completion
                </h3>
                <p className="text-sm text-gray-600">
                  Proudly presented to{" "}
                  <span className="font-bold">{fullName}</span> for successfully
                  completing <span className="font-bold">{title}</span> courses
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-3">
              <PDFDownloadLink
                document={
                  <CertificateTemplate
                    fullName={fullName}
                    title={title}
                    badgeImage={badgeImage}
                    createdAt={createdAt}
                    certificateUrl={certificateUrl}
                  />
                }
                fileName={`Certificate ${title} ${fullName}.pdf`}
              >
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </PDFDownloadLink>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="cursor-pointer">
                    <FacebookShareButton
                      url={certificateUrl}
                      hashtag="#CertificateOfCompletion"
                      className="flex w-full items-center"
                    >
                      <FacebookIcon size={24} round className="mr-2" />
                      Facebook
                    </FacebookShareButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <TwitterShareButton
                      url={certificateUrl}
                      title={shareQuote}
                      hashtags={["CertificateOfCompletion"]}
                      className="flex w-full items-center"
                    >
                      <XIcon size={24} round className="mr-2" />
                      Twitter
                    </TwitterShareButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <LinkedinShareButton
                      url={certificateUrl}
                      title={shareTitle}
                      summary={shareQuote}
                      source="Certificate Platform"
                      className="flex w-full items-center"
                    >
                      <LinkedinIcon size={24} round className="mr-2" />
                      LinkedIn
                    </LinkedinShareButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <WhatsappShareButton
                      url={certificateUrl}
                      title={shareQuote}
                      separator=":: "
                      className="flex w-full items-center"
                    >
                      <WhatsappIcon size={24} round className="mr-2" />
                      WhatsApp
                    </WhatsappShareButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadAndShareSection;
