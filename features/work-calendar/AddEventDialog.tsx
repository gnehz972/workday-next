import { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Shift, ShiftLabel } from "../../data/config/data";
import { Employee } from "../../data/models/Employee";
import { CalendarEvent } from "../../data/models/CalendarEvent";
import { TimeSlot } from "../../data/models/TimeSlot";

type Props = {
  employees: Employee[];
  saveEvent: (event: CalendarEvent) => void;
  timeSlot: TimeSlot;
  close: () => void;
};
export const AddEventDialog: FC<Props> = ({
  employees,
  saveEvent,
  timeSlot,
}) => {
  const [shift, setShift] = useState(Shift[0]);
  const [employee, setEmployee] = useState(employees[0].name);

  const handleChange = (value: string) => {
    setShift(value);
  };

  const handleEmployeeChange = (value: string) => {
    setEmployee(value);
  };

  const constructEvent = () => ({
    title: employee + " " + shift,
    employee: employee,
    shift: shift,
    start: timeSlot.start,
    end: timeSlot.end,
    created: new Date(),
  });

  return (
    <Dialog open fullWidth>
      <DialogTitle>添加排班</DialogTitle>
      <DialogContent>
        <DialogContentText>选择排班人员和班次</DialogContentText>

        <FormControl fullWidth margin={"normal"}>
          <InputLabel id="demo-simple-select-label">排班</InputLabel>

          <Select
            value={shift}
            label="排班"
            onChange={(e: any) => handleChange(e.target.value)}
          >
            {Shift.map((shift, index) => (
              <MenuItem key={index} value={shift}>
                {ShiftLabel[index]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin={"normal"}>
          <InputLabel>职员</InputLabel>

          <Select
            value={employee}
            label="职员"
            onChange={(e: any) => handleEmployeeChange(e.target.value)}
          >
            {employees.map((employee, index) => (
              <MenuItem key={index} value={employee.name}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button
          onClick={() => {
            saveEvent(constructEvent());
            close();
          }}
        >
          添加
        </Button>
      </DialogActions>
    </Dialog>
  );
};
