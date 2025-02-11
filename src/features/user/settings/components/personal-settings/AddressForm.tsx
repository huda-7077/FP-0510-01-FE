"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetProvinces from "@/hooks/api/location/useGetProvinces";
import useGetRegencies from "@/hooks/api/location/useGetRegencies";

interface AddressFormProps {
  values: {
    currentAddress: string;
    provinceId?: string;
    regencyId?: string;
  };
  errors: {
    currentAddress?: string;
    provinceId?: string;
    regencyId?: string;
  };
  touched: {
    currentAddress?: boolean;
    provinceId?: boolean;
    regencyId?: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: any) => void;
}

const AddressForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}: AddressFormProps) => {
  const { data: provinces } = useGetProvinces({});
  const { data: regencies } = useGetRegencies({
    provinceId: values.provinceId ? Number(values.provinceId) : undefined,
  });

  const handleProvinceChange = async (provinceId: string) => {
    setFieldValue("provinceId", provinceId);
    setFieldValue("regencyId", "");
    setFieldValue("latitude", "");
    setFieldValue("longitude", "");

    const selectedProvince = provinces?.find(
      (province) => province.id.toString() === provinceId,
    );
  };

  const handleRegencyChange = async (regencyId: string) => {
    setFieldValue("regencyId", regencyId);

    const selectedRegency = regencies?.find(
      (regency) => regency.id.toString() === regencyId,
    );
    const selectedProvince = provinces?.find(
      (province) => province.id.toString() === values.provinceId,
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currentAddress">Current Address</Label>
        <Input
          id="currentAddress"
          name="currentAddress"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.currentAddress}
          placeholder="Enter your street address"
          className={
            errors.currentAddress && touched.currentAddress
              ? "border-red-500"
              : ""
          }
        />
        {errors.currentAddress && touched.currentAddress && (
          <p className="text-xs text-red-500">{errors.currentAddress}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Select
            name="provinceId"
            value={values.provinceId}
            onValueChange={handleProvinceChange}
          >
            <SelectTrigger
              className={
                errors.provinceId && touched.provinceId ? "border-red-500" : ""
              }
            >
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
          {errors.provinceId && touched.provinceId && (
            <p className="text-xs text-red-500">{errors.provinceId}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="regency">Regency</Label>
          <Select
            name="regencyId"
            value={values.regencyId}
            onValueChange={handleRegencyChange}
            disabled={!values.provinceId}
          >
            <SelectTrigger
              className={
                errors.regencyId && touched.regencyId ? "border-red-500" : ""
              }
            >
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
          {errors.regencyId && touched.regencyId && (
            <p className="text-xs text-red-500">{errors.regencyId}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
