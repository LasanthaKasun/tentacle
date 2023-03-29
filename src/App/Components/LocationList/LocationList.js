import React from "react";
import { List } from "antd";

// location list component
const LocationList = (props) => {
  const { data } = props;
  return (
    <List
      size="small"
      header={<h2>Your Search History</h2>}
      footer={""}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
};
export default LocationList;
