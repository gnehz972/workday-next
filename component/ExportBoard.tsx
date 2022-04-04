import { DatePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { FC, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { formatQueryDate } from "../utils/date-helper";

export const ExportBoard: FC = () => {
  const date = new Date();
  const [start, setStart] = useState(startOfMonth(date));
  const [end, setEnd] = useState(endOfMonth(date));
  const startTime = formatQueryDate(start);
  const endTime = formatQueryDate(end);

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Typography variant="h6" noWrap component="div">
          开始时间
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="开始时间"
            value={start}
            onChange={(value) => {
              value && setStart(value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Divider orientation="vertical" flexItem />

        <Typography variant="h6" noWrap component="div">
          结束时间
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="结束时间"
            value={end}
            onChange={(value) => {
              value && setEnd(value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {/* <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item> */}
      </Stack>

      <Link
        href={`/api/exportExcel?start=${startTime}&end=${endTime}`}
        target={"_blank"}
        rel={"noreferrer"}
        download
      >
        <LoadingButton
          sx={{ marginTop: 5 }}
          loading={false}
          loadingPosition="start"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          导出排班表
        </LoadingButton>
      </Link>
    </Box>
  );
};
