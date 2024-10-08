import React, {FC} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { JOB_LISTING_COLUMNS, JOB_LISTING_DATA } from "@/constants";
import { Badge } from "@/components/ui/badge";
import ButtonActionTable from "@/components/organisms/ButtonActionTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";
import { Job } from "@prisma/client";
import { dateFormat } from "@/lib/utils";
import moment from "moment";

interface JobListingsPageProps{}

async function getDataJobs(){
  const session = await getServerSession(authOptions);

  const jobs = await prisma.job.findMany({
    where: {
      companyId: session?.user.id
    }
  });

  return jobs;
}

const JobListingsPage: FC<JobListingsPageProps> = async ({})=>{
  const jobs = await getDataJobs();

  return(
    <div>
      <div className="font-semibold text-xl">Job Listings</div>
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMNS.map((item: string, key: number) => (
                <TableHead key={item + 1}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((item: Job, i: number) => (
              <TableRow key={item.roles + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{dateFormat(item.datePosted)}</TableCell>
                <TableCell>{dateFormat(item.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  <ButtonActionTable url={`/job-detail/${item.id}`}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default JobListingsPage;