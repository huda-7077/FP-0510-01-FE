import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#18191c] p-11 text-sm text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-7">
          <div className="col-span-1">
            <Image src="/logo-white.svg" alt="logo" width={112} height={26} />
            <p className="mt-2">
              Call now:{" "}
              <span className="font-semibold text-white"><a href="tel:3195550115">(319) 555-0115</a></span>
            </p>
            <p className="mt-2 text-xs">
              Jl. Anggajaya 2, Sanggrahan, Condongcatur, Kec. Depok, Kabupaten
              Sleman, Daerah Istimewa Yogyakarta, Indonesia
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-4">
            <div>
              <h3 className="mb-2 font-semibold text-white">Quick Link</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/subscriptions" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-white">Candidate</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Browse Employers
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/user" className="hover:text-white">
                    Candidate Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Saved Jobs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-white">Employers</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#" className="hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Browse Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/admin" className="hover:text-white">
                    Employers Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Applications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-white">Support</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-700 pt-6 md:flex-row">
          <p className="text-sm">
            © 2025 Supajob. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://www.youtube.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaYoutube size={20} />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaXTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
