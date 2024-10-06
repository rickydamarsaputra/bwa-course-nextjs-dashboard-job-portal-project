import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OverviewForm from "@/components/forms/OverviewForm";
import SocialMediaForm from "@/components/forms/SocialMediaForm";
import TeamForm from "@/components/forms/TeamForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import React, {FC} from "react";
import prisma from "../../../../lib/prisma";

interface SettingsPageProps{}

async function getDetailCompany() {
  const session = await getServerSession(authOptions);
  const company = await prisma.company.findFirst({
    where: {
      id: session?.user.id
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true
    }
  });

  return company;
}

const SettingsPage: FC<SettingsPageProps> = async ({}) => {
  const company = await getDetailCompany();

  return(
    <div>
      <div className="font-semibold text-lg mb-5">Settings</div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black" value="overview">Overview</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black" value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black" value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewForm detail={company?.CompanyOverview[0]}/>
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialMediaForm detail={company?.CompanySocialMedia[0]}/>
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;