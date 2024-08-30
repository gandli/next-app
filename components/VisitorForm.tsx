// components/VisitorForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the schema using Zod
const visitorSchema = z.object({
  dateTime: z.string().min(1, "请填写日期时间"),
  visitorName: z.string().min(1, "请填写访客姓名"),
  gender: z.enum(["Male", "Female", ""]),
  idCardNumber: z.string().regex(/^\d{15}|\d{18}$/, "身份证号码格式不正确"),
  contactInfo: z.string().min(1, "请填写联系方式"),
  visitReason: z.string().min(1, "请填写来访事由"),
  departureTime: z.string().min(1, "请填写离开时间"),
});

type VisitorFormValues = z.infer<typeof visitorSchema>;

// Form component
const VisitorForm = () => {
  // Use react-hook-form to create the form
  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      dateTime: "",
      visitorName: "",
      gender: "",
      idCardNumber: "",
      contactInfo: "",
      visitReason: "",
      departureTime: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: VisitorFormValues) => {
    console.log("Form Data:", data);
    // Handle form submission logic here (e.g., sending data to an API)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>日期时间</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} className="w-auto" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visitorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>访客姓名</FormLabel>
              <FormControl>
                <Input
                  placeholder="输入访客姓名"
                  {...field}
                  className="w-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性别</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="选择性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male" >
                      男
                    </SelectItem>
                    <SelectItem value="Female" >
                      女
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>身份证号码</FormLabel>
              <FormControl>
                <Input
                  placeholder="输入身份证号码"
                  {...field}
                  className="w-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>联系方式</FormLabel>
              <FormControl>
                <Input
                  placeholder="输入联系方式"
                  {...field}
                  className="w-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visitReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>来访事由</FormLabel>
              <FormControl>
                <Input
                  placeholder="输入来访事由"
                  {...field}
                  className="w-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departureTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>离开时间</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} className="w-auto" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">提交</Button>
      </form>
    </Form>
  );
};

export default VisitorForm;
