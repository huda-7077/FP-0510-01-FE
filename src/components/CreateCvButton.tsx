import { Gem } from "lucide-react";
import Link from "next/link";

const CreateCvButton = () => {
  return (
    <div>
      <Link href="/dashboard/user/cv-generator">
        <div className="group relative inline-flex w-full items-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl md:w-fit">
          <Gem className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="relative z-10">Create CV</span>
          <div className="absolute right-0 top-0 origin-bottom-left -translate-y-full translate-x-1/3 rotate-45 transform bg-yellow-500 px-5 py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-900">
              Pro
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/10 to-purple-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>
    </div>
  );
};

export default CreateCvButton;
