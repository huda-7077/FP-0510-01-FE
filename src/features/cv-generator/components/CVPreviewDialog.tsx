"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CVTemplate from "./CVTemplate";

interface CVPreviewDialogProps {
  cvData: any;
  showPDF: boolean;
  setShowPDF: (showPDF: boolean) => void;
}

const CVPreviewDialog = ({
  cvData,
  showPDF,
  setShowPDF,
}: CVPreviewDialogProps) => {
  if (!cvData) return null;
  const name = cvData.fullName;

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <Dialog open={showPDF} onOpenChange={setShowPDF}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            CV Preview
          </DialogTitle>
          <DialogDescription className="hidden text-gray-600 md:block">
            Preview your generated CV
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {isMobile ? (
            <div className="flex flex-col items-center space-y-4 p-4">
              <p className="text-center text-gray-700">
                PDF preview is not available on mobile devices. Please download
                the PDF to view it.
              </p>
            </div>
          ) : (
            <PDFViewer
              showToolbar={false}
              className="h-[70vh] w-full rounded-lg border border-gray-200"
            >
              <CVTemplate {...cvData} />
            </PDFViewer>
          )}
        </div>
        <DialogFooter className="flex items-center justify-center">
          <PDFDownloadLink
            document={<CVTemplate {...cvData} />}
            fileName={`CV_${name}_by_Supajob_CV_Generator.pdf`}
          >
            <Button className="bg-blue-600 hover:bg-blue-700">
              Download CV
            </Button>
          </PDFDownloadLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewDialog;
