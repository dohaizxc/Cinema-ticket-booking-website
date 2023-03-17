import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { PhoneOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { User } from "../../interface/Interface";
import moment from "moment";
import { usePatch } from "../../api/patch";
import { openNotification } from "../../components/Notifications";

export const UserInfo: React.FC<{
  fetchGet: (path: any) => Promise<any>;
  user: User;
}> = ({ fetchGet, user }) => {
  const gender = ["Nam", "Nữ"];
  const {
    fetchPatch: fetchUser,
    result: userResult,
    isError,
  } = usePatch<any>();

  const onFinish = (values: any) => {
    fetchUser(values, "user/" + user?._id);
    fetchGet("user/" + user?._id);
  };

  React.useEffect(() => {
    if (userResult) {
      if (!isError) {
        openNotification("success", "Chỉnh sửa thông tin thành công");
      } else {
        openNotification("error", "Chỉnh sửa thông tin thất bại");
      }
    }
  }, [userResult]);

  const onFinishFailed = (values: any) => {};
  return (
    <div>
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 my-5 lg:mx-20 mx-10">
        <h1 className="font-semibold sm:text-base">THÔNG TIN TÀI KHOẢN</h1>
      </div>
      <div className="flex justify-center">
        <Form
          name="basic"
          initialValues={{
            name: user?.name,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            gender: user?.gender,
            dayOfBirth: moment(new Date(user?.dayOfBirth)),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="lg:w-2/3 w-4/5"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              placeholder="Enter your name"
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item name="email">
            <Input
              disabled={true}
              size="large"
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input
              size="large"
              showCount={false}
              type="number"
              placeholder="Enter your phone"
              style={{
                WebkitAppearance: "none",
              }}
              prefix={<PhoneOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "gender!" }]}
              className="w-2/5"
            >
              <Select
                allowClear
                optionLabelProp="label"
                size="large"
                placeholder={
                  <React.Fragment>
                    <i className="fa-solid fa-mars-and-venus text-black"></i>
                    &nbsp;Gender
                  </React.Fragment>
                }
              >
                {gender.map((gender) => (
                  <Select.Option
                    key={gender}
                    value={gender}
                    label={
                      <React.Fragment>
                        <i className="fa-solid fa-mars-and-venus text-black"></i>
                        &nbsp;
                        {gender}
                      </React.Fragment>
                    }
                  >
                    {gender}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dayOfBirth"
              rules={[
                {
                  required: true,
                  message: "dayOfBirth!",
                },
              ]}
            >
              <DatePicker size="large" format="DD/MM/YYYY" />
            </Form.Item>
          </div>

          <div className="flex justify-end">
            <Form.Item>
              <button className="font-semibold bg-sky-300 hover:bg-sky-700 text-black hover:text-white px-5 py-2 rounded">
                Chỉnh sửa
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
