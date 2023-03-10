import { notification } from "antd";

export const openNotification = (type: string, noti: string) => {
  if (type === "error" || type === "info" || type === "success") {
    notification[type]({
      message: `${noti}`,
    });
  }
};
