// "use client";

import PaymentPage from "@/features/subscriptions/payments";

// import { useParams } from "next/navigation";
// import { useFormik } from "formik";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Upload } from "lucide-react";
// import useGetPayment from "@/hooks/api/payment/useGetPayment";
// import useUpdatePayment from "@/hooks/api/payment/useUpdatePayment";

// const ManualPaymentPage = () => {
//   const { uuid } = useParams();
//   const { data: getPayment, isPending: isGetPaymentPending } = useGetPayment(
//     uuid as string,
//   );
//   const { mutateAsync: updatePayment, isPending: isUpdatePaymentPending } =
//     useUpdatePayment();

//   const formik = useFormik({
//     initialValues: {
//       uuid: uuid as string,
//       action: "" as "CANCEL" | "CONFIRM",
//       paymentProof: null as File | null,
//     },
//     onSubmit: async (values) => {
//       await updatePayment(values);
//     },
//   });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       formik.setFieldValue("paymentProof", event.target.files[0]);
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-md px-4 py-8">
//       <h1 className="mb-6 text-2xl font-bold">Submit Payment Proof</h1>
//       <p className="mb-4 text-gray-600">Payment ID: {uuid}</p>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="payment-proof">Upload Payment Proof</Label>
//           <div className="mt-1 flex items-center">
//             <Label
//               htmlFor="payment-proof"
//               className="flex h-32 w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none"
//             >
//               {formik.values.paymentProof ? (
//                 <span className="text-sm text-gray-600">
//                   {formik.values.paymentProof.name}
//                 </span>
//               ) : (
//                 <span className="flex items-center space-x-2">
//                   <Upload className="h-6 w-6 text-gray-600" />
//                   <span className="font-medium text-gray-600">
//                     Drop files to Attach, or browse
//                   </span>
//                 </span>
//               )}
//               <Input
//                 id="payment-proof"
//                 type="file"
//                 className="hidden"
//                 onChange={handleFileChange}
//                 accept="image/*,.pdf"
//               />
//             </Label>
//           </div>
//         </div>
//         <Button
//           type="submit"
//           className="w-full"
//           disabled={formik.isSubmitting || isUpdatePaymentPending}
//         >
//           {formik.isSubmitting || isUpdatePaymentPending
//             ? "Submitting..."
//             : "Submit Payment Proof"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default ManualPaymentPage;

const Payments = ({ params }: { params: { uuid: string } }) => {
  return <PaymentPage uuid={params.uuid} />;
};

export default Payments;
