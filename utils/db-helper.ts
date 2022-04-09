import { endOfMonth, startOfMonth } from "date-fns";
import { groupBy, orderBy } from "lodash";
import { ObjectId } from "mongodb";
import { Employees } from "../config/data";
import { CalendarEvent } from "../models/CalendarEvent";
import { connectToDatabase } from "./mongodb";

export const saveEvent = async (event: CalendarEvent) => {
  const { db } = await connectToDatabase();
  return db.collection("Event").insertOne(event);
};

export const deleteEvent = async (id: any) => {
  const { db } = await connectToDatabase();
  return db.collection("Event").deleteOne({ _id: new ObjectId(id) });
};

export const getAllEventByRange = async (start: Date, end: Date) => {
  const { db } = await connectToDatabase();
  const result = (await db
    .collection("Event")
    .find({
      $or: [
        { start: { $gte: start, $lt: end } },
        { end: { $gte: start, $lt: end } },
      ],
    })
    .toArray()) as CalendarEvent[];

  const employeeGroupA = groupBy(Employees, "group")["A"].map((it) => it.name);

  const ordered = orderBy(
    result,
    (it) => employeeGroupA && employeeGroupA.includes(it.employee)
  );

  return ordered;
};

export const getAllEventOfCurrentMonth = async () => {
  const date = new Date();
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return getAllEventByRange(start, end);
};
