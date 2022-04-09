import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const login = async (username: string, pwd: string) => {
    setLoading(true);
    await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: username, pwd: pwd }),
    })
      .then((resp) => {
        if (resp.ok){
          setLoginSuccess(true);
        } else {
          setLoginSuccess(false);
        }
      });
    setLoading(false);
  };
  return { login, loading, loginSuccess };
};
