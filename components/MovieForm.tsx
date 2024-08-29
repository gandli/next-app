"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { moviesSchema, MovieFormValues } from "@/db/schema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addMovie } from "@/app/actions/movieActions";
import { useRouter } from "next/navigation";

export function MovieForm() {
  const router = useRouter();

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(moviesSchema),
    defaultValues: {
      title: "",
      releaseYear: undefined,
    },
  });

  const onSubmit = async (data: MovieFormValues) => {
    const result = await addMovie(data);
    if (result.success) {
      console.log(result.message);
      router.push("/success");
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
              <FormLabel>电影标题</FormLabel>
              <FormControl>
                <Input placeholder="输入电影标题" {...field} />
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
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  value={field.value ?? ''}
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
}