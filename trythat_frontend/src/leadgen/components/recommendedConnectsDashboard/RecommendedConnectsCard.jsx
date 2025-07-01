import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Avatar, Card, Space, Tag,Dropdown } from "antd";
import React from "react";

import callIcon from "../../../assets/images/call.png";
import emailIcon from "../../../assets/images/email.png";

import dotIcon from "../../../assets/images/dot.png";
import chatIcon from "../../../assets/images/chat.png";
import jncImg from "../../../assets/images/jnc.png";

const items = [
   {
      label: (
         <a href="#">
            <i className="fa fa-bookmark-o" aria-hidden="true" style={{ marginRight: "15px" }}></i>Save
         </a>
      ),
      key: "0",
   },
   {
      label: (
         <a href="#">
            <i className="fa fa-share-alt" aria-hidden="true" style={{ marginRight: "15px" }}></i>Share
         </a>
      ),
      key: "1",
   },

   {
      label: (
         <a href="#">
            <i className="fa fa-share" aria-hidden="true" style={{ marginRight: "15px" }}></i>Refer
         </a>
      ),
      key: "3",
   },
];

const RecommendedConnectsCard = ({ data }) => {
   return (
      <Card className="card__recommended__items">
         <div style={{ display: "flex", flexDirection: "column" }}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <div
                  style={{
                     display: "flex",
                     flexDirection: "row",
                     gap: "10px",
                     alignItems: "center",
                  }}
               >
                  <div>
                     <Avatar src={data?.organizationImage} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                     <p style={{ fontWeight: "700", color: "#151515" }}>{data?.name}</p>
                     <div>
                        <span style={{ fontSize: "12px", color: "#313131" }}>{data?.designation} &nbsp;</span>
                        <span style={{ color: "#349AFD", fontSize: "12px" }}>@{data?.companyName}</span>
                     </div>
                     <div></div>
                  </div>
               </div>
               <div>
                  <img src={chatIcon} style={{ marginRight: "10px" }} />
                  <Dropdown
                     menu={{
                        items,
                     }}
                     trigger={["click"]}
                  >
                     <a onClick={(e) => e.preventDefault()}>
                        <Space>
                           <img src={dotIcon} />
                        </Space>
                     </a>
                  </Dropdown>
               </div>
            </div>
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  alignItems: "center",
               }}
            >
               <div>
                  <p style={{ color: "#0081FC", fontSize: "12px", marginBottom: "10px" }}>
                     <Space>
                        <img src={callIcon} />
                        {data?.contact}
                     </Space>
                  </p>
                  <p style={{ color: "#0081FC", fontSize: "12px" }}>
                     <Space>
                        <img src={emailIcon} />
                        {data?.email}
                     </Space>
                  </p>
               </div>
               <div>
                  <Avatar src={jncImg} />
               </div>
            </div>
            <div style={{ marginTop: "10px" }}>
               <p style={{ fontSize: "12px", color: "#313131" }}>Years of Experience: {data?.yearsOfExperience}</p>
               <div style={{ marginTop: "10px" }}>
                  {data?.serviceTags?.map((el) => (
                     <Tag color="#F3F9FF" style={{ borderRadius: "100px", marginBottom: "5px" }}>
                        <span style={{ color: "#349AFD", fontSize: "11px" }}>{el}</span>
                     </Tag>
                  ))}
               </div>
            </div>
            <div style={{ marginTop: "10px" }}>
               <p style={{ fontSize: "12px", color: "#313131", fontWeight: "600" }}>Key Skills:</p>
               <div style={{ marginTop: "10px" }}>
                  {data?.serviceTags?.map((el) => (
                     <Tag color="#F3F9FF" style={{ borderRadius: "100px", marginBottom: "5px" }}>
                        <span style={{ color: "#349AFD", fontSize: "11px" }}>{el}</span>
                     </Tag>
                  ))}
               </div>
            </div>
            <div>
               <div style={{ display: "flex", justifyContent: "end" }}>
                  <a href="#" style={{ color: "#0081FC", fontSize: "12px" }}>
                     View All
                  </a>
               </div>
            </div>
         </div>
      </Card>
   );
};

export default RecommendedConnectsCard;
