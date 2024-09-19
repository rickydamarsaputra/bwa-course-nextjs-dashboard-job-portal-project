import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import React, {FC, useRef} from "react";

interface DialogAddBenefitProps{
  updateBenefits: (item: any) => void;
}

const DialogAddBenefit: FC<DialogAddBenefitProps> = ({updateBenefits})=>{
  const benefitRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveBenefit = () => {
    const benefit = benefitRef.current?.value;
    const description = descriptionRef.current?.value;

    if(benefit === "" || description === "") return;

    updateBenefits({
      benefit,
      description
    });
  }

  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2"/>
          Add Benefit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Benefit</DialogTitle>
          <DialogDescription>
            Make a new benefit, clicks save when your done
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 mb-5">
          <div>
            <label htmlFor="benefit">Benefit</label>
            <Input id="benefit" placeholder="fill your benefit..." ref={benefitRef}/>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Textarea id="description" placeholder="fill your description..." ref={descriptionRef}/>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveBenefit}>
              Save
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAddBenefit;