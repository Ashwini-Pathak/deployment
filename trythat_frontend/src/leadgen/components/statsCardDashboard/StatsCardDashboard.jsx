import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import './StatsCardDashboard.scss'

const StatsCardDashboard = ({ data = [] }) => {
   return (
      <Card  className="statscard_container">
         <h4 className="statscard-container__total">Total</h4>
         <h4  className="statscard-container__data">{data?.cardTitle}</h4>
         <h2 className="total__heading">{data?.value}</h2>
      </Card>
   );
};

export default StatsCardDashboard;
