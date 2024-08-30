// app/api/upload/route.ts
import { writeFile } from 'fs/promises'; // 从 'fs/promises' 导入 writeFile，用于将数据写入文件
import { join } from 'path'; // 从 'path' 导入 join，用于拼接路径字符串
import { NextRequest, NextResponse } from 'next/server'; // 从 'next/server' 导入 Next.js 请求和响应类型

// 处理客户端发送的文件上传请求
export async function POST(request: NextRequest) {
  try {
    // 从请求中解析表单数据，解析后的数据是一个 FormData 对象
    const data = await request.formData();

    // 从表单数据中获取 'file' 字段，类型断言为 File 或 null
    const file = data.get('file') as File | null;

    // 如果 'file' 字段不存在，则返回 400 状态码和错误信息，表示客户端请求无效
    if (!file) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // 将文件内容转换为二进制数组，并创建一个 Buffer 实例
    const bytes = await file.arrayBuffer(); // 将文件读取为二进制数据
    const buffer = Buffer.from(bytes); // 将二进制数据转换为 Buffer 对象

    // 确定文件保存路径，将文件保存在项目的 `public/uploads` 目录中
    // 注意：在实际生产环境中，建议使用更安全和可扩展的存储方案，如云存储服务
    const path = join(process.cwd(), 'public', 'uploads', file.name);

    // 将文件写入服务器的文件系统
    await writeFile(path, buffer);

    // 生成文件的访问 URL，客户端可以通过此 URL 访问上传的文件
    const url = `/uploads/${file.name}`;

    // 返回成功的 JSON 响应，包含文件的访问 URL
    return NextResponse.json({ success: true, url }, { status: 200 });
  } catch (error) {
    // 捕获并处理上传过程中可能出现的任何错误
    console.error('File upload error:', error); // 输出错误信息到控制台

    // 返回 500 状态码和错误信息，表示服务器内部错误
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}
