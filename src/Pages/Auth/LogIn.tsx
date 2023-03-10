import React from "react";
import { Layout } from "../../components/Layout";
import { MailOutlined, KeyOutlined, GoogleOutlined } from "@ant-design/icons";
import { Input, Form, Button } from "antd";
import { Link } from "react-router-dom";
import { usePost } from "../../api/post";
import { openNotification } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const navigate = useNavigate();
  const { fetchPost: fetchUser, result: userResult, isError } = usePost<any>();

  const onFinish = (values: any) => {
    console.log("userResult:", userResult);
    fetchUser(values, "auth/userlogin");
  };

  React.useEffect(() => {
    if (userResult) {
      if (!isError) {
        openNotification("success", userResult.message);
        localStorage.setItem("token", userResult.accessToken);
        localStorage.setItem("user", JSON.stringify(userResult.foundUser));
        navigate("/");
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

        <div className="lg:w-2/5 w-full border border-sky-500 h-screen bg-white">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-center text-[24px] my-10">
              ĐĂNG NHẬP
            </h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  size="large"
                  type="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  prefix={<KeyOutlined className="site-form-item-icon" />}
                />
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

            <div className="flex justify-between w-2/3 py-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  className="form-checkbox h-5 w-5 text-blue-600 border-blue-600 rounded-sm checked:bg-green-500 checked:border-green-500"
                />
                <label className="ml-2">Nhớ tài khoản</label>
              </div>

              <div>Quên mật khẩu</div>
            </div>
            <div className="flex items-center w-2/3">
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
              <div className="text-center px-2 w-1/4">
                <span className="font-medium text-gray-500">HOẶC</span>
              </div>
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
            </div>

            <GoogleOutlined className="text-[24px] py-4" />

            <p>
              Chưa có tài khoản?{" "}
              <Link to="/signup" className={"text-sky-500"}>
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
