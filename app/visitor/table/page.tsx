// app/visitor/table/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VisitorFormValues } from "@/db/schema"; // Assuming this type exists

export default function TablePage() {
  const [visitors, setVisitors] = useState<VisitorFormValues[]>([]);

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const response = await fetch("/api/visitor");
        const data = await response.json();
        if (response.ok) {
          setVisitors(data.visitors);
        } else {
          console.error("Failed to fetch visitors:", data.error);
        }
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    }

    fetchVisitors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visitor List</h1>
      <Table>
        <TableCaption>Visitor Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>ID Card Number</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Visit Reason</TableHead>
            <TableHead>Departure Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.length > 0 ? (
            visitors.map((visitor) => (
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
              <TableCell colSpan={7} className="text-center">
                No visitors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
