import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateCompanyLocation from "@/hooks/api/company-location/useCreateCompanyLocation";
import useGetProvinces from "@/hooks/api/location/useGetProvinces";
import useGetRegencies from "@/hooks/api/location/useGetRegencies";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { companyLocationSchema } from "../schemas";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-100">
      Loading Map...
    </div>
  ),
});

interface AddLocationModalProps {
  onSuccess: () => void;
}

export function AddLocationModal({ onSuccess }: AddLocationModalProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null,
  );
  const { mutate: createLocation } = useCreateCompanyLocation();
  const { data: provinces } = useGetProvinces({});

  const formik = useFormik({
    initialValues: {
      address: "",
      regencyId: "",
      postalCode: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: companyLocationSchema,
    onSubmit: (values) => {
      createLocation(
        {
          ...values,
          regencyId: Number(values.regencyId),
        },
        {
          onSuccess: () => {
            onSuccess();
          },
        },
      );
    },
  });

  const regencyQuery = React.useMemo(
    () => (selectedProvinceId ? { provinceId: selectedProvinceId } : {}),
    [selectedProvinceId],
  );
  const { data: regencies } = useGetRegencies(regencyQuery);

  const handleProvinceChange = (provinceId: string) => {
    const newProvinceId = provinceId ? Number(provinceId) : null;
    if (newProvinceId !== selectedProvinceId) {
      setSelectedProvinceId(newProvinceId);
      formik.setValues({
        ...formik.values,
        regencyId: "",
      });
    }
  };

  const handleRegencyChange = (regencyId: string) => {
    formik.setFieldValue("regencyId", regencyId);
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add Company Location</DialogTitle>
      </DialogHeader>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter street address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className={
              formik.errors.address && formik.touched.address
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.address && formik.touched.address && (
            <p className="text-xs text-red-500">{formik.errors.address}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Province</Label>
            <Select
              value={selectedProvinceId?.toString() || ""}
              onValueChange={(value) => {
                handleProvinceChange(value);
                formik.setFieldTouched("regencyId", true);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces?.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Regency</Label>
            <Select
              value={formik.values.regencyId}
              onValueChange={(value) => {
                handleRegencyChange(value);
                formik.setFieldTouched("regencyId", true);
              }}
              disabled={!selectedProvinceId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select regency" />
              </SelectTrigger>
              <SelectContent>
                {regencies?.map((regency) => (
                  <SelectItem key={regency.id} value={regency.id.toString()}>
                    {regency.regency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.errors.regencyId && formik.touched.regencyId && (
              <p className="text-xs text-red-500">{formik.errors.regencyId}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="Enter postal code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postalCode}
            className={
              formik.errors.postalCode && formik.touched.postalCode
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.postalCode && formik.touched.postalCode && (
            <p className="text-xs text-red-500">{formik.errors.postalCode}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Select Location on Map</Label>
          <div className="h-[300px] overflow-hidden rounded-lg border">
            <MapComponent
              position={position}
              onLocationSelect={(lat, lng) => {
                setPosition([lat, lng]);
                formik.setFieldValue("latitude", lat.toString());
                formik.setFieldValue("longitude", lng.toString());
                formik.setFieldTouched("latitude", true);
                formik.setFieldTouched("longitude", true);
              }}
            />
          </div>
          {formik.errors.latitude && formik.touched.latitude && (
            <p className="text-xs text-red-500">{formik.errors.latitude}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Selected Coordinates</Label>
          <Input
            value={`${formik.values.latitude}, ${formik.values.longitude}`}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" className="bg-[#0a65cc] hover:bg-[#254e7e]">
            Save Location
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
