import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import Image from "next/image";

const Developerbar = () => {
  return (
    <nav className="sticky left-0 top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center p-4">
          <div className="relative h-20 w-20">
            <Image
              src="/supajobIcon.png"
              alt="icon"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="default"
            className="hidden bg-blue-600 hover:bg-blue-800 md:flex"
          >
            <Plus className="mr-2 h-4 w-4" /> Tombol Gaguna
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Developerbar;
