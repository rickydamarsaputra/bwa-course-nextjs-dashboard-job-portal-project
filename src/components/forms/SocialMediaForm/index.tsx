"use client"

import FieldInput from "@/components/organisms/FieldInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { socialMediaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySocialMedia } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {FC} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SocialMediaFormProps{
  detail: CompanySocialMedia | undefined;
}

const SocialMediaForm: FC<SocialMediaFormProps> = ({ detail }) => {
  const form = useForm<z.infer<typeof socialMediaFormSchema>>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      facebook: detail?.facebook,
      instagram: detail?.instagram,
      twitter: detail?.twitter,
      linkedin: detail?.linkedin,
      youtube: detail?.youtube,
    }
  });
  const {data: session} = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof socialMediaFormSchema>) => {
    try {
      const body = {
        ...val,
        companyId: session?.user.id,
      }

      await fetch('/api/company/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      await router.refresh();

      toast({
        title: "Success",
        description: "Company social media has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
      console.log(error);
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FieldInput title="Basic Information" subTitle="Add elsewhere links to your company profile. You can add only username without full https links.">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="facebook"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/twitter" className="w-[450px]" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/twitter" className="w-[450px]" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Linkedin</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/twitter" className="w-[450px]" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/twitter" className="w-[450px]" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/twitter" className="w-[450px]" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FieldInput>
        <div className="flex justify-end">
          <Button size="lg">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}

export default SocialMediaForm;