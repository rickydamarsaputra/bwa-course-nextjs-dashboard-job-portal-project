import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, {FC} from "react";

interface SettingsPageProps{

}

const SettingsPage: FC<SettingsPageProps> = ({})=>{
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
          <div>lorem 1</div>
        </TabsContent>
        <TabsContent value="socialLinks">
          <div>lorem 2</div>
        </TabsContent>
        <TabsContent value="teams">
          <div>lorem 3</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;