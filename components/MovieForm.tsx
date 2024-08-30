// components/MovieForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { moviesSchema, MovieFormValues } from "@/db/schema";
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
import { addMovie } from "@/app/actions/movieActions";
import { useRouter } from "next/navigation";

// 表单组件
const MovieForm = () => {
  const router = useRouter();

  // 使用 react-hook-form 创建表单
  const form = useForm<MovieFormValues>({
    resolver: zodResolver(moviesSchema), // 使用 zod 进行表单验证
    defaultValues: {
      title: "",
      releaseYear: undefined,
    },
  });

  // 表单提交处理函数
  const onSubmit = async (data: MovieFormValues) => {
    const result = await addMovie(data);
    if (result.success) {
      console.log(result.message);
      router.push("/success"); // 提交成功后跳转到成功页面
    } else {
      console.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input placeholder="输入标题" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>发行年份</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="输入发行年份"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  value={field.value ?? ""}
                />
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

export default MovieForm;
