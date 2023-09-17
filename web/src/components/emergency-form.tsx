/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CameraCapture from "./camera-capture";
import axios from "axios";

import { RadioGroup, RadioGroupItem } from "@/components//ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components//ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/router";
import useGeolocation from "@/hooks/use-geolocation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { toast } from "@/components/ui/use-toast"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNjRhZmZjNWU4MWMxNjQxZjk0NWM5In0sImlhdCI6MTY5NDkyNjg4Nn0._0Vx8Trpf5se14Mp07pa5PLFO1_fMEYNoq8CM1AqcDY";

const FormSchema = z.object({
  severity: z.array(z.number().min(0).max(100)),
  units: z.enum(["police", "fire", "medical"], {
    required_error: "You need to select a unit.",
  }),
  victims: z.string({
    required_error: "Please select number of victims.",
  }),
  details: z.string(),
});

export default function EmergencyForm() {
  const router = useRouter();
  const geolocation = useGeolocation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const requestData = {
      category: [data.units],
      location: [geolocation.latitude, geolocation.longitude],
      victims: data.victims,
      severity: data.severity.pop(),
      details: data.details,
      image: imageUrl,
    };

    axios
      .post(
        "http://localhost:9000/api/request",
        {
          ...requestData,
        },
        {
          headers: {
            "auth-token": token,
          },
        },
      )
      .then(() => {
        void router.push("/success");
        alert("We have informed the neared agency");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onUploadImage = async (url: string) => {
    const blob = await (await fetch(url)).blob();
    const formData = new FormData();
    const file = new File([blob], `${uuidv4()}.jpg`, {
      type: "image/jpeg",
    });
    formData.append("file", file);
    console.log(formData.getAll("file"));

    axios
      .post(`http://localhost:9000/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const url = res.data.path as string;
        setImageUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form {...form}>
      <CameraCapture onUploadImage={onUploadImage} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Which unit to contact?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="police" />
                    </FormControl>
                    <FormLabel className="font-normal">Police</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="fire" />
                    </FormControl>
                    <FormLabel className="font-normal">Fire</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medical" />
                    </FormControl>
                    <FormLabel className="font-normal">Medical</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="victims"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many victims?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="No of victims" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="5-10">5-10</SelectItem>
                  <SelectItem value="Over 10">Over 10</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate the severity</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[10]}
                  max={100}
                  step={1}
                  onValueChange={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about it"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={cn("w-full")} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
