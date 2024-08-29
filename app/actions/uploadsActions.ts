// app/actions/uploadsActions.ts
import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadFile(data: FormData) {
  const poster: File | null = data.get("file") as unknown as File;

  if (!poster) {
    throw new Error("No file uploaded");
  }

  const bytes = await poster.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 确保上传目录存在
  const uploadDir = join(process.cwd(), "public", "uploads");

  // 生成唯一的文件名
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${poster.name.split(".")[0]}-${uniqueSuffix}.${poster.name
    .split(".")
    .pop()}`;

  const filepath = join(uploadDir, filename);

  try {
    await writeFile(filepath, buffer);
    console.log(`Uploaded file saved at ${filepath}`);
    return { success: true, filepath: `/uploads/${filename}` };
  } catch (error) {
    console.error("Error while saving the file:", error);
    return { success: false, error: "Failed to save the file" };
  }
}
