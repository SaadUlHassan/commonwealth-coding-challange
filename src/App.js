import React from "react";
import "./App.css";
import { Typography, Tabs } from "antd";
import TopPools from "./components/TopPools/TopPools";
import Tokens from "./components/Tokens/Tokens";

const { TabPane } = Tabs;

const { Title } = Typography;

const App = () => {
  return (
    <div className="App">
      <div>
        <Title>Uniswap Visualization</Title>
        <Tabs onChange={() => console.log("clicked Tab")} type="card">
          <TabPane tab="Top Pools" key="1">
            <TopPools />
          </TabPane>
          <TabPane tab="Tokens" key="2">
            <Tokens />
          </TabPane>
          <TabPane tab="Transactions" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
