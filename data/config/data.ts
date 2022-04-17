import { Employee } from "../models/Employee";

export const Employees: Employee[] = process.env.EMPLOYEES
  ? JSON.parse(process.env.EMPLOYEES)
  : [
      { name: "张三", group: "A" },
      { name: "李四", group: "A" },
      { name: "王五", group: "B" },
    ];
export const Shift = ["白", "中", "晚", "请假", "休假"];
export const ShiftLabel = ["白班", "中班", "晚班", "请假", "休假"];
