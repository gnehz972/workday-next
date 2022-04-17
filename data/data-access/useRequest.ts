import { useRouter } from "next/router";
import { jsonReceiver } from "../../utils/date-utils";

export const useRequest = () => {
  const router = useRouter();

  const request = async (
    request: () => Promise<Response>,
    onAuthFail = () => {
      router.replace("/login");
    }
  ) => {
    const response = await request();
    if (!response.ok) {
      if (response.status == 401) {
        await onAuthFail();
      }
      const { errorMsg } = await response.json();
      return { errorMsg };
    }

    const content = await response.json();
    const data = JSON.parse(JSON.stringify(content), jsonReceiver);
    return { data };
  };

  return { request };
};
