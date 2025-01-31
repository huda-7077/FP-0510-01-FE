import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen flex-col items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={200} height={200} className="animate-bounce"/>
        <h1 className="text-4xl font-semibold italic animate-pulse">Coming Soon!</h1>
        <h1 className="text-3xl font-bold text-center">This Site is Under Construction</h1>
      </div>
    </div>
  );
}
