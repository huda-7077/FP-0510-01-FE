import { CertificateData } from "@/types/certificate";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { format } from "date-fns";

interface CertificateProps {
  certificate: CertificateData;
}

const Certificate: React.FC<CertificateProps> = ({ certificate }) => {
  const { fullName, title, badgeImage, createdAt, certificateUrl } =
    certificate;

  return (
    <div className="flex items-center justify-center p-2 md:p-1">
      <div className="w-full overflow-x-auto">
        <div className="relative mx-auto flex h-[794px] w-[1123px] min-w-[1123px] flex-col items-center justify-center border border-gray-300 bg-white p-12 text-center shadow-lg">
          <div className="absolute bottom-10 left-8 right-8 top-10 border-2 border-gray-400"></div>

          <div className="absolute left-24 top-24">
            <img src={badgeImage} alt="Badge" className="w-20" />
          </div>

          <div className="absolute right-24 top-24">
            <img src="/logo.svg" alt="Logo" className="w-40" />
          </div>

          <h2 className="text-4xl font-bold">Certificate of Completion</h2>
          <p className="mt-2 text-gray-600">
            This certificate is proudly presented to
          </p>

          <h1 className="mt-4 text-4xl font-bold">{fullName}</h1>
          <p className="mt-4 text-lg">for successfully completing</p>

          <h3 className="text-3xl font-medium">{title}</h3>

          <div className="mt-2 w-2/3 border-t pt-4">
            <p className="text-sm text-gray-600">Date of Completion</p>
            <p className="text-lg font-medium text-gray-800">
              {format(new Date(createdAt), "dd MMMM yyyy")}
            </p>
          </div>

          <div className="absolute bottom-28 left-28">
            <QRCodeCanvas value={certificateUrl} size={90} />
          </div>

          <div className="absolute bottom-14">
            <p className="mt-2 text-start text-sm text-gray-600">
              Certificate verification at
              <span>
                {" "}
                <a href={certificateUrl}>{certificateUrl}</a>
              </span>
            </p>
          </div>

          <div className="absolute bottom-24 right-24 text-center">
            <img
              src="/static/huda-signature.png"
              alt="Huda Signature"
              className="mx-auto mb-2 w-40"
            />

            <p className="text-xl font-semibold">Muhammad Masyhuda</p>
            <p className="text-sm text-gray-500">Developer of Supajob</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
