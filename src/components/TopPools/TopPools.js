import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_TOP_POOLS } from "../../graphql/queries";
import { Table } from "antd";
import { formatAmountCurrency } from "../../utils/helpers";

const PAGE_SIZE = 10;

const TopPools = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("totalValueLockedUSD");
  const [sortDirection, setSortDirection] = useState("desc");
  const { loading, error, data, refetch } = useQuery(GET_TOP_POOLS, {
    variables: {
      skip: (currentPage - 1) * PAGE_SIZE,
      first: PAGE_SIZE,
      orderBy: sortColumn,
      orderDirection: sortDirection === "ascend" ? "asc" : "desc",
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      render: (_, __, index) => (currentPage - 1) * PAGE_SIZE + index + 1,
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

  const handleTableChange = (pagination, filters, sorter) => {
    setSortColumn(sorter.field);
    setSortDirection(sorter.order);
  };

  const pagination = {
    current: currentPage,
    pageSize: PAGE_SIZE,
    total: 100, // totalPools,
    onChange: (page) => setCurrentPage(page),
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <Table
        dataSource={data.pools}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TopPools;
