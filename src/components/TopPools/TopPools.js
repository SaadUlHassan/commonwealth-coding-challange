import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_TOP_POOLS } from "../../graphql/queries";
import { Result, Spin, Table } from "antd";
import { formatAmountCurrency } from "../../utils/helpers";
import TableHeader from "../TableHeader/TableHeader";

const TopPools = () => {
  // Set up state variables for pagination and sorting
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("totalValueLockedUSD");
  const [sortDirection, setSortDirection] = useState("desc");

  // Use the useQuery hook to fetch data from the GraphQL API
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_TOP_POOLS,
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

  // Show an error message if the query fails
  if (error)
    return (
      <div>
        <Result status="500" subTitle="Sorry, something went wrong." />
      </div>
    );

  // Define the columns for the table
  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Pool",
      dataIndex: "pool",
      render: (_, record) =>
        `${`${record.token0.symbol} / ${record.token1.symbol}`}`,
    },
    {
      title: "Total Value Locked (TVL)",
      dataIndex: "totalValueLockedUSD",
      key: "totalValueLockedUSD",
      sorter: true,
      sortOrder: sortColumn === "totalValueLockedUSD" && sortDirection,
      render: (text) =>
        `${text !== null ? formatAmountCurrency(parseInt(text)) : "-"}`,
    },
    {
      title: "24H Volume",
      dataIndex: "volumeUSD",
      key: "volumeUSD",
      sorter: true,
      sortOrder: sortColumn === "volumeUSD" && sortDirection,
      render: (text) =>
        `${text !== null ? formatAmountCurrency(parseInt(text)) : "-"}`,
    },
  ];

  // Handle changes to the table sorting
  const handleTableChange = (pagination, filters, sorter) => {
    setSortColumn(sorter?.field);
    setSortDirection(sorter?.order);
    setPageSize(pagination?.pageSize);
  };

  // Set up pagination for the table
  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: 100,
    onChange: (page) => setCurrentPage(page),
  };

  // Handle the refresh button click by refetching the data
  const handleRefresh = () => {
    refetch();
  };

  // Render the component
  return (
    <div>
      <TableHeader
        name="Top Pools"
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
          dataSource={data?.pools}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
          bordered
        />
      </Spin>
    </div>
  );
};

export default TopPools;
