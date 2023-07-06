import React, { useEffect, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_PAGINATED_TOKENS } from "../../graphql/queries";
import { Result, Spin, Table } from "antd";
import { getTokensTableData } from "../../utils/helpers";
import TableHeader from "../TableHeader/TableHeader";

const Tokens = () => {
  // Define state variables for pagination and sorting
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("totalValueLockedUSD");
  const [sortDirection, setSortDirection] = useState("desc");

  // Define state variable for tokens data
  const [tokens, setTokens] = useState([]);

  // Fetch tokens data using Apollo useQuery hook
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_PAGINATED_TOKENS,
    {
      variables: {
        skip: (currentPage - 1) * pageSize,
        first: pageSize,
        orderBy: sortColumn,
        orderDirection: sortDirection === "ascend" ? "asc" : "desc",
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Update tokens state variable when data changes
  useEffect(() => {
    if (data) {
      const { tokens } = getTokensTableData(data.tokens);
      setTokens(tokens);
    }
  }, [data]);

  // Render error message if there is an error
  if (error)
    return (
      <div>
        <Result status="500" subTitle="Sorry, something went wrong." />
      </div>
    );

  // Define columns for Ant Design table
  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Token (symbol)",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "Price Point",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Price Change (24h)",
      dataIndex: "priceChange",
      key: "priceChange",
    },
    {
      title: "Total Value Locked (TVL)",
      dataIndex: "totalValueLockedUSD",
      key: "totalValueLockedUSD",
      sorter: true,
      sortOrder: sortColumn === "totalValueLockedUSD" && sortDirection,
    },
  ];

  // Define function to handle table pagination and sorting
  const handleTableChange = (pagination, filters, sorter) => {
    setSortColumn(sorter?.field);
    setSortDirection(sorter?.order);
    setPageSize(pagination?.pageSize);
  };

  // Define pagination configuration for Ant Design table
  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: 100,
    onChange: (page) => setCurrentPage(page),
  };

  // Define function to handle table refresh
  const handleRefresh = () => {
    refetch();
  };

  // Render Tokens component with Ant Design table and refresh button
  return (
    <div>
      <TableHeader
        name="Tokens"
        handleRefresh={handleRefresh}
        disableReloadButton={
          networkStatus === NetworkStatus?.refetch || loading
        }
      />
      <Spin
        tip="Loading..."
        spinning={networkStatus === NetworkStatus?.refetch || loading}
        delay={500}
      >
        <Table
          dataSource={tokens}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
          bordered
        />
      </Spin>
    </div>
  );
};

export default Tokens;
