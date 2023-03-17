import { Button, Form, Input } from "antd";
import React from "react";
import { PhoneOutlined, KeyOutlined } from "@ant-design/icons";
export const ChangePassword = () => {
  const onFinish = (values: any) => {};
  const onFinishFailed = (values: any) => {};
  return (
    <div className="min-h-screen bg-white rounded drop-shadow-md py-5">
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 mb-5 lg:mx-20 mx-10">
        <h1 className="font-semibold sm:text-base">ĐỔI MẬT KHẨU</h1>
      </div>
      <div className="flex justify-center">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="lg:w-2/3 w-4/5"
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
              <button
                className="px-4 py-2 border border-transparent rounded-md font-semibold text-white
             bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
              >
                Đổi mật khẩu
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
