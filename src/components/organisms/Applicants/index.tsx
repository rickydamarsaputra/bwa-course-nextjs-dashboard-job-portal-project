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
import { JOB_APPLICANT_COLUMNS, JOB_APPLICANT_DATA } from "@/constants";
import ButtonActionTable from "../ButtonActionTable";
import { Applicant } from "@prisma/client";

interface ApplicantsProps{
  applicants: any;
}

const Applicants: FC<ApplicantsProps> = ({ applicants })=>{
  return(
    <Table>
      <TableHeader>
        <TableRow>
          {JOB_APPLICANT_COLUMNS.map((item: string, key: number) => (
            <TableHead key={item + 1}>{item}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants && (
          <>
            {applicants.map((item: any, i: number) => (
              <TableRow key={item.id + i}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <ButtonActionTable url="/"/>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}

export default Applicants;