import React from "react";
import { Button, Typography } from "antd";

const { Title } = Typography;

const TableHeader = ({ name = "", handleRefresh }) => {
  // Render component with title and refresh button
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Title level={3}>{name}</Title>
      <Button onClick={handleRefresh}>Reload</Button>
    </div>
  );
};

export default TableHeader;
