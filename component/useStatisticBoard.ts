import { useFetchEvent } from "../data-access/useFetchEvent";
import { useEffect } from "react";
import { addMonths, startOfMonth } from "date-fns";
import { chain, groupBy } from "lodash";
import { BarData } from "../models/BarData";
import {getCurrentMonthSpan} from "../utils/date-helper";

export const useStatisticBoard = () => {
  const start = startOfMonth(new Date());
  const end = addMonths(start, 1);

  const { events, fetchEvent } = useFetchEvent(getCurrentMonthSpan());
  useEffect(() => {
    fetchEvent();
  }, []);

  const barData = chain(events)
    .groupBy("employee")
    .toPairs()
    .map((pair) => {
      const employee = pair[0];
      const shiftGroup = groupBy(pair[1], "shift");

      return {
        name: employee,
        day: shiftGroup["白"]?.length ?? 0,
        middle: shiftGroup["中"]?.length ?? 0,
        night: shiftGroup["晚"]?.length ?? 0,
        leave: shiftGroup["请假"]?.length ?? 0,
        vacation: shiftGroup["休假"]?.length ?? 0,
      } as BarData;
    })
    .value();

  return { barData };
};
