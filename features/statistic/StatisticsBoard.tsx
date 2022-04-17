import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useStatisticBoard } from "./useStatisticBoard";
import { BarNameArray } from "../../data/models/BarData";

export const StatisticsBoard: FC = () => {
  const { barData } = useStatisticBoard();

  return (
    <Stack direction={"column"} spacing={5}>
      <BarChart
        width={710}
        height={500}
        data={barData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="day" name={"白班"} stackId="a" fill="#8884d8" />
        <Bar dataKey="middle" name={"中班"} stackId="a" fill="#1678B8" />
        <Bar dataKey="night" name={"晚班"} stackId="a" fill="#82ca9d" />
        <Bar dataKey="leave" name={"请假"} stackId="a" fill="#F0E05A" />
        <Bar dataKey="vacation" name={"休假"} stackId="a" fill="#27AF5C" />
      </BarChart>

      <TableContainer
        sx={{
          paddingLeft: 10,
        }}
      >
        <Table
          sx={{
            width: 600,

            "& .MuiTableCell-root": {
              border: "1px solid rgba(224, 224, 224, 1)",
            },
          }}
          size={"small"}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {BarNameArray.map((item, index) =>
                index == 0 ? (
                  <TableCell>{item}</TableCell>
                ) : (
                  <TableCell align="right">{item}</TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {barData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.day}</TableCell>
                <TableCell align="right">{row.middle}</TableCell>
                <TableCell align="right">{row.night}</TableCell>
                <TableCell align="right">{row.leave}</TableCell>
                <TableCell align="right">{row.vacation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
