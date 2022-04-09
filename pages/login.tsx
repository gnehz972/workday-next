import { FC, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useLogin } from "../auth/useLogin";
import { useRouter } from "next/router";

const Login: FC = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const { login, loginSuccess, loading } = useLogin();
  console.log("loginSuccess=", loginSuccess);
  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      router.replace("/");
    }
  }, [loginSuccess]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Stack
        spacing={4}
        alignItems={"center"}
        alignSelf={"center"}
        sx={{ width: "40ch" }}
      >
        <Typography variant={"body1"} sx={{ marginTop: 15, fontSize: 20 }}>
          Workday
        </Typography>
        <FormControl sx={{ width: "100%", marginTop: 15 }} variant="outlined">
          <InputLabel>用户</InputLabel>
          <OutlinedInput
            type={"text"}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel>密码</InputLabel>
          <OutlinedInput
            type={showPwd ? "text" : "password"}
            value={pwd}
            onChange={(event) => setPwd(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPwd(!showPwd)}
                  edge="end"
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <LoadingButton
          sx={{ width: "100%", height: 40 }}
          variant="contained"
          loading={loading}
          endIcon={<LoginOutlined />}
          loadingPosition="end"
          onClick={async () => await login(username, pwd)}
        >
          登录
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default Login;
