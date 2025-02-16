import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, LucideIcon, Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import UserSidebarLink from "./components/UserSidebarLink";

interface SidebarProps {
  links: { name: string; url: string; icon: LucideIcon }[];
  isOpen: boolean;
  onToggle: () => void;
}

// const UserSidebar = ({ links, isOpen, onToggle }: SidebarProps) => {
//   return (
//     <>
//       <Button
//         variant="ghost"
//         size="icon"
//         className={cn(
//           "fixed bottom-4 right-4 z-40 rounded-full lg:hidden",
//           "bg-blue-600 shadow-lg hover:bg-blue-500",
//         )}
//         onClick={onToggle}
//       >
//         {isOpen ? <X color="white" /> : <Menu color="white" />}
//       </Button>

//       <div
//         className={cn(
//           "fixed inset-y-0 left-0 top-32 z-30 h-[calc(100vh-65px)] w-64 transform border-r border-gray-200 bg-white ps-4 transition-transform duration-200 ease-in-out lg:sticky lg:translate-x-0",
//           !isOpen && "-translate-x-full",
//         )}
//       >
//         <div className="flex h-full flex-col">
//           <div className="flex-1 space-y-2 overflow-y-auto p-4">
//             <div className="mb-4">
//               <p className="px-3 text-xs font-medium uppercase text-gray-500">
//                 CANDIDATE DASHBOARD
//               </p>
//             </div>
//             <Link
//               href="/dashboard/admin/jobs/create"
//               className="flex w-full sm:hidden"
//             >
//               <Button
//                 variant="default"
//                 className="w-full bg-blue-600 hover:bg-blue-800 md:flex"
//               >
//                 <Plus className="mr-2 h-4 w-4" /> Post A Job
//               </Button>
//             </Link>

//             <div className="space-y-2">
//               {links.map((link, index) => (
//                 <UserSidebarLink
//                   key={index}
//                   icon={link.icon}
//                   label={link.name}
//                   url={link.url}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="p-4">
//             <UserSidebarLink icon={LogOut} label="Log out" url="/logout" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
const UserSidebar = ({ links, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed bottom-4 right-4 z-40 rounded-full lg:hidden",
          "bg-blue-600 shadow-lg hover:bg-blue-500",
        )}
        onClick={onToggle}
      >
        {isOpen ? <X color="white" /> : <Menu color="white" />}
      </Button>

      <div
        className={cn(
          "fixed left-0 top-[65px] z-30 h-[calc(100vh-65px)] w-64 transform border-r border-gray-200 bg-white ps-4 transition-transform duration-200 ease-in-out lg:sticky lg:top-32 lg:h-[calc(100vh-128px)] lg:translate-x-0",
          !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-2 p-4">
            <div className="mb-4">
              <p className="px-3 text-xs font-medium uppercase text-gray-500">
                CANDIDATE DASHBOARD
              </p>
            </div>
            <Link
              href="/dashboard/admin/jobs/create"
              className="flex w-full sm:hidden"
            >
              <Button
                variant="default"
                className="w-full bg-blue-600 hover:bg-blue-800 md:flex"
              >
                <Plus className="mr-2 h-4 w-4" /> Post A Job
              </Button>
            </Link>

            <div className="space-y-2">
              {links.map((link, index) => (
                <UserSidebarLink
                  key={index}
                  icon={link.icon}
                  label={link.name}
                  url={link.url}
                />
              ))}
            </div>
          </div>

          <div className="border-t p-4">
            <UserSidebarLink icon={LogOut} label="Log out" url="/logout" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
