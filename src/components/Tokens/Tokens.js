import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PAGINATED_TOKENS } from "../../graphql/queries";
import { Table } from "antd";
import { formatAmountCurrency } from "../../utils/helpers";

const PAGE_SIZE = 10;

const Tokens = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("totalValueLockedUSD");
  const [sortDirection, setSortDirection] = useState("desc");
  const { loading, error, data, refetch } = useQuery(GET_PAGINATED_TOKENS, {
    variables: {
      skip: (currentPage - 1) * PAGE_SIZE,
      first: PAGE_SIZE,
      orderBy: sortColumn,
      orderDirection: sortDirection === "ascend" ? "asc" : "desc",
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  // const totalPools = data.pools.length;

  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      render: (_, __, index) => (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: "Token (symbol)",
      dataIndex: "token",
      render: (_, record) => `${`${record.name} - (${record.symbol})`}`,
    },
    {
      title: "Price Point",
      dataIndex: "derivedETH",
      key: "derivedETH",
      sorter: true,
      sortOrder: sortColumn === "derivedETH" && sortDirection,
      render: (text) =>
        `${text !== null ? formatAmountCurrency(parseInt(text)) : "-"}`,
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
        dataSource={data.tokens}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Tokens;
