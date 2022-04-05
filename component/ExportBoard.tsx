import SaveIcon from "@mui/icons-material/Save";
import { DatePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Link, Stack, TextField, Typography } from "@mui/material";
import { addMonths, startOfMonth } from "date-fns";
import cnLocale from "date-fns/locale/zh-CN";
import { FC, useState } from "react";
import { formatQueryDate } from "../utils/date-helper";

export const ExportBoard: FC = () => {
  const [start, setStart] = useState(startOfMonth(new Date()));
  const startTime = formatQueryDate(start);
  const endTime = formatQueryDate(addMonths(start, 1));

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Typography variant="h6" noWrap component="div">
          导出月份
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={cnLocale}>
          <DatePicker
            label="导出月份"
            value={start}
            views={["year", "month"]}
            onChange={(value) => {
              value && setStart(value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
