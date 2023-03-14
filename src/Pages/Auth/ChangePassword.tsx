import { Button, Form, Input } from "antd";
import React from "react";
import { PhoneOutlined, KeyOutlined } from "@ant-design/icons";
export const ChangePassword = () => {
  const onFinish = (values: any) => {};
  const onFinishFailed = (values: any) => {};
  return (
    <div>
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 my-5 mx-20">
        <h1 className="font-semibold text-base">ĐỔI MẬT KHẨU</h1>
      </div>
      <div className="flex justify-center">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="w-2/3"
        >
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your old password"
              prefix={<KeyOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your new password"
              prefix={<KeyOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your new password"
              prefix={<KeyOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <div className="flex justify-end">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 justify-end bg-sky-500 rounded-xl"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
