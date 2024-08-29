import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">提交成功！</h1>
      <p className="mb-6">您的电影信息已成功添加到数据库。</p>
      <Link href="/">
        <Button>返回首页</Button>
      </Link>
    </div>
  );
}