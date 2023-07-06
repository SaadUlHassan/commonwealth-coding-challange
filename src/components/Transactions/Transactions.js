import { useQuery, NetworkStatus } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TRANSACTIONS } from "../../graphql/queries";
import { Result, Spin, Table } from "antd";
import { getTransactionsTableData } from "../../utils/helpers";
import TableHeader from "../TableHeader/TableHeader";

const Transactions = () => {
  // State variables for pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [pageSize, setPageSize] = useState(10);

  // State variable for storing transactions data
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions data using Apollo useQuery hook
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_TRANSACTIONS,
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

  // Update transactions state variable when data changes
  useEffect(() => {
    if (data) {
      const transactions = getTransactionsTableData(data?.transactions);
      setTransactions(transactions);
    }
  }, [data]);

  // Show error message if there's an error
  if (error)
    return (
      <div>
        <Result status="500" subTitle="Sorry, something went wrong." />
      </div>
    );

  // Define table columns
  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Transactions",
      dataIndex: "transactions",
      key: "transactions",
    },
    {
      title: "Total Value",
      dataIndex: "totalValue",
      key: "totalValue",
    },
    {
      title: "Token Amount 0",
      dataIndex: "tokenAmount0",
      key: "tokenAmount0",
    },
    {
      title: "Token Amount 1",
      dataIndex: "tokenAmount1",
      key: "tokenAmount1",
    },
    {
      title: "Sender",
      dataIndex: "account",
      key: "account",
      render: (account) => (
        <a
          href={`https://etherscan.io/address/${account}`}
          target="_blank"
          rel="noreferrer"
        >
          {account?.substr?.(0, 5) +
            "..." +
            account?.slice?.(account?.length - 5)}
        </a>
      ),
    },
    {
      title: "Time",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: true,
      sortOrder: sortColumn === "timestamp" && sortDirection,
    },
  ];

  // Handle table sorting
  const handleTableChange = (pagination, filters, sorter) => {
    setSortColumn(sorter.field);
    setSortDirection(sorter?.order);
    setPageSize(pagination?.pageSize);
  };

  // Define pagination settings
  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: 100, // TODO: Replace with actual total number of transactions
    onChange: (page) => setCurrentPage(page),
  };

  // Handle refresh button click
  const handleRefresh = () => {
    refetch();
  };

  // Render table component with header and data
  return (
    <div>
      <TableHeader name="Transactions" handleRefresh={handleRefresh} />
      <Spin
        tip="Loading..."
        spinning={networkStatus === NetworkStatus?.refetch || loading}
        delay={500}
      >
        <Table
          dataSource={transactions}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
          bordered
        />
      </Spin>
    </div>
  );
};

export default Transactions;
