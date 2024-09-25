"use client"

import { Button } from "@/components/ui/button";
import React, {FC} from "react";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

interface SidebarProps{

}

const Sidebar: FC<SidebarProps> = ({})=>{
  const router = useRouter();

  return(
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">
            Dashboard
          </h2>
          <div className="space-y-3">
            <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push('/')}
            >
              <AiOutlineHome className="mr-4 text-lg"/>
              Home
            </Button>
            <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary">
              <AiOutlineMessage className="mr-4 text-lg"/>
              Messages
            </Button>
            <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary">
              <FaRegBuilding className="mr-4 text-lg"/>
              Company Profile
            </Button>
            <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary">
              <PiUsersThree className="mr-4 text-lg"/>
              All Aplicants
            </Button>
            <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push('/job-listings')}
            >
              <HiOutlineClipboardDocumentList className="mr-4 text-lg"/>
              Job Listing
            </Button>
            <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary">
              <CiCalendar className="mr-4 text-lg"/>
              My Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">
              Settings
            </h2>
            <div className="space-y-3">
              <Button variant={'ghost'} className="w-full justify-start rounded-none hover:text-primary"
                onClick={() => router.push('/settings')}
              >
                <IoSettingsOutline className="mr-4 text-lg"/>
                Settings
              </Button>
              <Button variant={'ghost'} className="w-full justify-start rounded-none text-red-500 hover:text-red-500 hover:bg-red-50">
                <IoIosLogOut className="mr-4 text-lg"/>
                Logout
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Sidebar;