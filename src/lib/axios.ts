import { NEXT_PUBLIC_API_BASE_URL } from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
});
