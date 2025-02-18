import Navbar from "@/components/Navbar";
import HomePage from "@/features/home";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <div className="flex h-screen flex-col items-center justify-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
          className="animate-bounce"
        />
        <h1 className="animate-pulse text-4xl font-semibold italic">
          Coming Soon!
        </h1>
        <h1 className="text-center text-3xl font-bold">
          This Site is Under Construction
        </h1>
      </div> */}
      <HomePage />
    </div>
  );
}
