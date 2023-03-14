import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import {
  PhoneOutlined,
  UserOutlined,
  KeyOutlined,
  GoogleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input, Form, Select, DatePicker, Button } from "antd";
import { Link } from "react-router-dom";
import Checkbox from "antd/es/checkbox/Checkbox";
import { usePost } from "../../api/post";
import { User } from "../../interface/Interface";
import { openNotification } from "../../components/Notifications";

export const SignUp = () => {
  const { fetchPost: fetchUser, result: userResult, isError } = usePost<any>();
  const data = ["Nam", "Nữ"];

  const onFinish = (values: any) => {
    delete values.confirmPassword;
    fetchUser(values, "auth/register");
  };

  React.useEffect(() => {
    if (userResult) {
      if (!isError) {
        openNotification("success", userResult.message);
      } else {
        openNotification("error", userResult.message);
      }
    }
  }, [userResult]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <div className="flex space-x-4 mx-20">
        <div className="lg:w-3/5 w-0 lg:border border-sky-500 bg-gradient-to-r from-sky-300 to-indigo-300 h-screen"></div>

        <div className="lg:w-2/5 w-full border border-sky-500 h-auto bg-white">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-center text-[24px] mt-5">ĐĂNG KÝ</h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  placeholder="Enter your name"
                  size="middle"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  size="middle"
                  type="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input
                  size="middle"
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
                >
                  <Select
                    allowClear
                    optionLabelProp="label"
                    size="middle"
                    placeholder={
                      <React.Fragment>
                        <i className="fa-solid fa-mars-and-venus text-black"></i>
                        &nbsp;Gender
                      </React.Fragment>
                    }
                    className="w-2/5"
                  >
                    {data.map((data) => (
                      <Select.Option
                        key={data}
                        value={data}
                        label={
                          <React.Fragment>
                            <i className="fa-solid fa-mars-and-venus text-black"></i>
                            &nbsp;
                            {data}
                          </React.Fragment>
                        }
                      >
                        {data}
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
                  <DatePicker size="middle" />
                </Form.Item>
              </div>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="middle"
                  placeholder="Enter your password"
                  prefix={<KeyOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="middle"
                  placeholder="Enter your password"
                  prefix={<KeyOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                className="px-10"
              >
                <Checkbox>Đồng ý với điều khoản dịch vụ</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-10 text-center bg-sky-500 rounded"
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
            </Form>

            <div className="flex items-center w-2/3">
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
              <div className="text-center px-2 w-1/4">
                <span className="font-middle text-gray-500">HOẶC</span>
              </div>
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
            </div>

            <GoogleOutlined className="text-[24px] py-2" />

            <p>
              Đã có tài khoản?{" "}
              <Link to="/login" className={"text-sky-500"}>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
