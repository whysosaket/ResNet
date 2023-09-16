/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CameraCapture from "./camera-capture";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components//ui/select";
import { RadioGroup, RadioGroupItem } from "@/components//ui/radio-group";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast"

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Helllo");
    console.log(data);
  }

  return (
    <Form {...form}>
      <CameraCapture />
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
