import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import {
  PhoneOutlined,
  UserOutlined,
  KeyOutlined,
  GoogleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input, Form, Select, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "antd/es/checkbox/Checkbox";
import { usePost } from "../../api/post";
import { openNotification } from "../../components/Notifications";
import { Banner } from "../../components/Banner";
import dayjs from "dayjs";

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

  const disabledDate = (current: dayjs.Dayjs) => {
    return (
      current &&
      (current < dayjs("1950-01-01") || current > dayjs("2010-12-31"))
    );
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      scroll(0, 0);
      navigate(`/`);
    }
  }, []);

  return (
    <Layout>
      <div className="flex md:flex-row flex-col lg:space-x-10 md:space-x-5 space-x-0 lg:mx-20 m-5">
        <div className="lg:w-3/5 md:w-1/2 md:block hidden lg:h-[85vh] rounded drop-shadow-md">
          <Banner></Banner>
        </div>

        <div className="lg:w-2/5 md:w-1/2 w-full lg:h-[85vh] sm:py-0 py-6 bg-white rounded drop-shadow-md">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-center text-2xl sm:my-2 mb-6">
              ĐĂNG KÝ
            </h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="lg:w-2/3 md:w-4/5 w-3/4"
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
                  <DatePicker
                    size="middle"
                    disabledDate={disabledDate}
                    defaultPickerValue={dayjs("2000-01-01")}
                    format="DD/MM/YYYY"
                  />
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

              {/* <Form.Item
                name="remember"
                valuePropName="checked"
                className="px-10"
              >
                <Checkbox>Đồng ý với điều khoản dịch vụ</Checkbox>
              </Form.Item> */}

              <Form.Item>
                <button
                  className="w-full px-4 py-2 border border-transparent rounded-md font-semibold
                 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                >
                  ĐĂNG KÝ
                </button>
              </Form.Item>
            </Form>

            {/* <div className="flex items-center w-2/3">
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
              <div className="text-center px-2 w-1/4">
                <span className="font-middle text-gray-500">HOẶC</span>
              </div>
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
            </div> */}

            <p>
              Đã có tài khoản?{" "}
              <Link to="/login" className={"text-sky-500"}>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-3/5 md:w-1/2 md:hidden block sm:h-screen rounded drop-shadow-md mt-5">
          <Banner></Banner>
        </div>
      </div>
    </Layout>
  );
};
