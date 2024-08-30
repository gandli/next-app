// app/visitor/table/page.tsx

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { visitors } from "@/db/schema";
import { db } from "@/db/db";

export default async function TablePage() {
  const allVisitors = await db.select().from(visitors).all();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">访客列表</h1>
      <Table>
        <TableCaption>访客数据</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>日期</TableHead>
            <TableHead>姓名</TableHead>
            <TableHead>性别</TableHead>
            <TableHead>身份证号码</TableHead>
            <TableHead>联系方式</TableHead>
            <TableHead>来访事由</TableHead>
            <TableHead>离开时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allVisitors.length > 0 ? (
            allVisitors.map((visitor) => (
              <TableRow key={visitor.id}>
                <TableCell>{visitor.dateTime}</TableCell>
                <TableCell>{visitor.visitorName}</TableCell>
                <TableCell>{visitor.gender}</TableCell>
                <TableCell>{visitor.idCardNumber}</TableCell>
                <TableCell>{visitor.contactInfo}</TableCell>
                <TableCell>{visitor.visitReason}</TableCell>
                <TableCell>{visitor.departureTime}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                No visitors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
