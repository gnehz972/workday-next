import { endOfMonth, parseISO, startOfMonth } from "date-fns";
import { CalendarEvent } from "../models/CalendarEvent";
import { connectToDatabase } from "./mongodb";

export const saveEvent = async (event: CalendarEvent) => {
  const { db } = await connectToDatabase();
  return db.collection("Event").insertOne(event);
};

export const getAllEventByRange = async (start: Date, end: Date) => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("Event")
    .find({
      $or: [
        { start: { $gte: start, $lte: end } },
        { end: { $gte: start, $lte: end } },
      ],
    })
    .toArray();

  return result;
};

export const getAllEventOfCurrentMonth = async () => {
  const date = new Date();
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return getAllEventByRange(start, end);
};
