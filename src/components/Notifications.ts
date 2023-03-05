import { notification } from "antd";

export const openNotification = (type: string, noti: string) => {
  notification.info({
    message: `${type}`,
    description: `${noti}`,
  });
};
