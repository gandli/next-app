// app/page.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { moviesSchema } from "@/db/schema";
import { db } from "@/db/db";
import { movies } from "@/db/schema";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { z } from "zod";

type MovieFormValues = z.infer<typeof moviesSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(moviesSchema),
  });

  const onSubmit = async (data: MovieFormValues) => {
    try {
      // 将表单数据插入数据库
      await db.insert(movies).values(data).run();
      console.log("Movie added successfully:", data);
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add a Movie</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...register("title")} placeholder="Movie Title" />
            </FormControl>
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel>Release Year</FormLabel>
            <FormControl>
              <Input type="number" {...register("releaseYear")} placeholder="Release Year" />
            </FormControl>
            {errors.releaseYear && <p className="text-red-500">{errors.releaseYear.message}</p>}
          </FormItem>
        </FormField>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
