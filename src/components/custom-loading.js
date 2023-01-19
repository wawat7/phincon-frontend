import React from "react";
import { Layout, Skeleton, Space, Spin } from "antd";

const { Content } = Layout;

const CustomLoading = () => {

  return (
    <div className="spin">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Spin tip="Loading" size="large" />
      </Space>
    </div>
  );
};
export default CustomLoading;
