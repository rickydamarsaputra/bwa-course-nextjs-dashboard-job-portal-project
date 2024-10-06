import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, {FC} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type paramsType = {
  id: string;
}

interface JobDetailPageProps{
  params: paramsType;
}

async function getDetailJob(id: string) {
  const job = await prisma.job.findFirst({
    where: {
      id: id
    },
    include: {
      Applicant: {
        include: {
          User: true
        }
      },
      CategoryJob: true
    }
  });

  return job;
}

const JobDetailPage: FC<JobDetailPageProps> = async ({ params }) => {
  const session = getServerSession(authOptions);
  const job = await getDetailJob(params.id);

  return(
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href="/job-listings">
            <ArrowLeftIcon className="w-9 h-9"/>
          </Link>
        </div>
        <div>
          <div className="text-2xl font-semibold mb-1">
            {job?.roles}
          </div>
          <div>
            {job?.CategoryJob?.name} . {job?.jobType} . {job?.applicants}/{job?.needs} Hired
          </div>
        </div>
      </div>
      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black" value="applicants">Applicants</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black" value="jobDetails">JobDetails</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants applicants={job?.Applicant}/>
        </TabsContent>
        <TabsContent value="jobDetails">
          <JobDetail/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default JobDetailPage;