import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary" className="bg-blue-500">
            Back Home
          </Button>{" "}
        </Link>
      }
    />
  );
};
