import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TOP_POOLS } from "../../graphql/queries";
import { Table } from "antd";
import { formatAmountCurrency } from "../../utils/helpers";

const TopPools = () => {
  const { loading, error, data } = useQuery(GET_TOP_POOLS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Pool",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Value Locked (TVL)",
      dataIndex: "totalValueLockedUSD",
      key: "totalValueLockedUSD",
      render: (text) => `${formatAmountCurrency(text)}`,
    },
    {
      title: "24H Volume",
      dataIndex: "volumeUSD",
      key: "volumeUSD",
    },
  ];

  return (
    <div>
      <Table dataSource={data.pools} columns={columns} />;
    </div>
  );
};

export default TopPools;
