import React from "react";
import { Layout } from "../../components/Layout";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
import { Link } from "react-router-dom";
import { usePost } from "../../api/post";
import { openNotification } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../components/Banner";

export const LogIn = () => {
  const navigate = useNavigate();
  const { fetchPost: fetchUser, result: userResult, isError } = usePost<any>();

  const onFinish = (values: any) => {
    fetchUser(values, "auth/userlogin");
  };

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      scroll(0, 0);
      navigate(`/`);
    }
  }, []);

  React.useEffect(() => {
    if (userResult) {
      if (!isError) {
        openNotification("success", "Đăng nhập thành công");
        localStorage.setItem("token", userResult.accessToken);
        localStorage.setItem("user", JSON.stringify(userResult.foundUser));
        scroll(0, 0);
        const link = localStorage.getItem("link");
        if (link) {
          navigate(link);
          window.localStorage.removeItem("link");
        } else navigate("/");
      } else {
        openNotification("error", "Tên tài khoản hoặc mật khẩu không đùng");
      }
    }
  }, [userResult]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <div className="flex md:flex-row flex-col md:space-x-10 space-x-0 lg:mx-20 md:mx-10 m-5">
        <div className="lg:w-3/5 md:w-1/2 md:block hidden lg:h-[85vh] rounded drop-shadow-md">
          <Banner></Banner>
        </div>

        <div className="lg:w-2/5 md:w-1/2 w-full lg:h-[85vh] bg-white rounded drop-shadow-md">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-center text-2xl my-8">ĐĂNG NHẬP</h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="lg:w-2/3 md:w-4/5 w-2/3"
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
                <button
                  className="w-full px-4 py-2 border border-transparent rounded-md font-semibol
                 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                >
                  ĐĂNG NHẬP
                </button>
              </Form.Item>
            </Form>

            <div className="flex justify-between w-2/3 mb-3 mt-[-10px]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  className="form-checkbox h-5 w-5"
                />
                <label className="ml-2">Nhớ tài khoản</label>
              </div>

              <div>Quên mật khẩu</div>
            </div>
            {/* <div className="flex items-center w-2/3 my-1">
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
              <div className="text-center px-2 w-1/4">
                <span className="font-medium text-gray-500">HOẶC</span>
              </div>
              <div className="w-1/2 h-0.5 bg-gray-500"></div>
            </div>

            <div className="flex space-x-4">
              <GoogleOutlined className="text-3xl py-3" />
              <FacebookOutlined className="text-3xl py-3" />
            </div> */}

            <p className="my-4 mb-12">
              Chưa có tài khoản?{" "}
              <Link to="/signup" className={"text-sky-500"}>
                Đăng ký ngay
              </Link>
            </p>
            <div className="mt-[-20px] w-2/3 mb-4">
              <p className="font-medium">Account for testing</p>
              <p className="font-medium">
                Email: <span className="font-normal">testing@gmail.com</span>
              </p>
              <p className="font-medium">
                Password: <span className="font-normal">testing123</span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-3/5 md:w-1/2 md:hidden block sm:h-screen rounded drop-shadow-md mt-5">
          <Banner></Banner>
        </div>
      </div>
    </Layout>
  );
};
