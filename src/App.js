import React from "react";
import { Typography, Tabs } from "antd";
import TopPools from "./components/TopPools/TopPools";
import Tokens from "./components/Tokens/Tokens";
import Transactions from "./components/Transactions/Transactions";

const { TabPane } = Tabs;

const { Title } = Typography;

const App = () => {
  return (
    <div>
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "1rem" }}>
        <Title>Uniswap Visualization</Title>
        <Tabs type="card">
          <TabPane tab="Top Pools" key="1">
            <TopPools />
          </TabPane>
          <TabPane tab="Tokens" key="2">
            <Tokens />
          </TabPane>
          <TabPane tab="Transactions" key="3">
            <Transactions />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
