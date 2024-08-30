// components/VisitorForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { visitorsSchema, VisitorFormValues } from "@/db/schema";
import { useRouter } from "next/navigation";

export default function AddVisitorForm() {
  const router = useRouter();
  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorsSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: VisitorFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("访客添加成功");
        // 可以在这里添加成功提示或重定向逻辑
        router.push("/success");
      } else {
        console.error("添加访客失败");
        // 可以在这里添加错误提示
      }
    } catch (error) {
      console.error("发生错误", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">添加访客</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
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
          <Separator className="col-span-2 my-4" />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">男</SelectItem>
                    <SelectItem value="female">女</SelectItem>
                  </SelectContent>
                </Select>
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
          <Separator className="col-span-2 my-4" />
          <FormField
            control={form.control}
            name="visitReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>来访事由</FormLabel>
                <FormControl>
                  <Textarea placeholder="输入来访事由" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="col-span-2 my-4" />
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
          <Button
            type="submit"
            className="col-span-2 w-full"
            disabled={isLoading}
          >
            {isLoading ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
