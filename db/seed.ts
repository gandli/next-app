import { db } from "./db";
import { visitors } from "./schema";

// 访客种子数据
const visitorSeedData = [
  {
    dateTime: "2024-01-30T10:00:00",
    visitorName: "张三",
    gender: "male",
    idCardNumber: "123456789012345678",
    contactInfo: "12345678901",
    visitReason: "案件",
    departureTime: "2024-01-30T12:00:00",
  },
  {
    dateTime: "2024-02-29T09:00:00",
    visitorName: "李四",
    gender: "female",
    idCardNumber: "234567890123456789",
    contactInfo: "23456789012",
    visitReason: "证件",
    departureTime: "2024-02-29T11:00:00",
  },
  {
    dateTime: "2024-03-05T11:30:00",
    visitorName: "王五",
    gender: "male",
    idCardNumber: "345678901234567890",
    contactInfo: "34567890123",
    visitReason: "其他",
    departureTime: "2024-03-05T12:30:00",
  },
  {
    dateTime: "2024-04-15T13:00:00",
    visitorName: "赵六",
    gender: "male",
    idCardNumber: "456789012345678901",
    contactInfo: "45678901234",
    visitReason: "证件",
    departureTime: "2024-04-15T14:00:00",
  },
  {
    dateTime: "2024-05-01T10:15:00",
    visitorName: "孙七",
    gender: "female",
    idCardNumber: "567890123456789012",
    contactInfo: "56789012345",
    visitReason: "案件",
    departureTime: "2024-05-01T11:15:00",
  },
  {
    dateTime: "2024-06-20T14:45:00",
    visitorName: "周八",
    gender: "male",
    idCardNumber: "678901234567890123",
    contactInfo: "67890123456",
    visitReason: "其他",
    departureTime: "2024-06-20T15:45:00",
  },
  {
    dateTime: "2024-07-10T16:00:00",
    visitorName: "吴九",
    gender: "female",
    idCardNumber: "789012345678901234",
    contactInfo: "78901234567",
    visitReason: "证件",
    departureTime: "2024-07-10T17:00:00",
  },
  {
    dateTime: "2024-08-25T08:30:00",
    visitorName: "郑十",
    gender: "male",
    idCardNumber: "890123456789012345",
    contactInfo: "89012345678",
    visitReason: "案件",
    departureTime: "2024-08-25T09:30:00",
  },
  {
    dateTime: "2024-09-05T12:00:00",
    visitorName: "冯十一",
    gender: "female",
    idCardNumber: "901234567890123456",
    contactInfo: "90123456789",
    visitReason: "其他",
    departureTime: "2024-09-05T13:00:00",
  },
  {
    dateTime: "2024-10-12T09:15:00",
    visitorName: "陈十二",
    gender: "male",
    idCardNumber: "012345678901234567",
    contactInfo: "01234567890",
    visitReason: "证件",
    departureTime: "2024-10-12T10:15:00",
  }
];

async function seed() {
  console.log("开始数据库种子填充...");
  try {
    // 插入访客数据
    await db.insert(visitors).values(visitorSeedData);
    console.log("访客数据种子填充完成。");
  } catch (error) {
    console.error("数据库种子填充失败:", error);
  }
}

seed();
