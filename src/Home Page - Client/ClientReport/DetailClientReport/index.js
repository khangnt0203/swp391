import { Button, Table, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getAuth, putAuth } from "../../../Utils/httpHelper";
import {

  CheckOutlined,
  StopOutlined,
  SyncOutlined,

  Loading3QuartersOutlined,
} from "@ant-design/icons";
import dateFormat from "dateformat";
const { TabPane } = Tabs;
export default function DetailClientReport() {
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [reportId, setReportId] = useState();
  const [listReport, setListReport] = useState([]);
  const [listReported, setListReported] = useState([]);
  const [status, setStatus] = useState(0);
  const onChange = (key) => {
    console.log(key);
    setStatus(key);
  };
  const column = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Project name",
      dataIndex: "jobTitle",
    },

    {
      title: "Reason",
      dataIndex: "content",
    },
    {
      title: "Freelancer",
      dataIndex: "reportedPerson",
    },
    {
      title: "Creating Date",
      dataIndex: "createdAt",
      render: (e, item) => {
        return <>{dateFormat(item.createdAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "Processing Date",
      dataIndex: "updatedAt",
      render: (e, item) => {
        return <>{dateFormat(item.updatedAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (e, item, index) => {
        if (item.status === 0)
          return (
            <Tag
              style={{ backgroundColor: "#FFFFCC", color: "black" }}
              icon={<Loading3QuartersOutlined />}
            >
              Waiting
            </Tag>
          );
        if (item.status === 1)
          return (
            <Tag
              style={{ backgroundColor: "#FF6600", color: "white" }}
              icon={<SyncOutlined />}
            >
              Pending
            </Tag>
          );
        if (item.status === 3)
          return (
            <Tag
              style={{ backgroundColor: "#CC0000", color: "white" }}
              icon={<StopOutlined />}
            >
              Rejected
            </Tag>
          );
        if (item.status === 2)
          return (
            <Tag
              style={{ backgroundColor: "#00FF00" }}
              icon={<CheckOutlined />}
            >
              Approve
            </Tag>
          );
      },
    },
    {
      title:'Admin',
      dataIndex:'adminUpdate',
    }
  ];
  const columnReported = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Project name",
      dataIndex: "jobTitle",
    },

    {
      title: "Reason",
      dataIndex: "content",
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
    },
    {
      title: "Creating Date",
      dataIndex: "createdAt",
      render: (e, item) => {
        return <>{dateFormat(item.createdAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "Processing Date",
      dataIndex: "updatedAt",
      render: (e, item) => {
        return <>{dateFormat(item.updatedAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (e, item, index) => {
        if (item.status === 0)
          return (
            <Tag
              style={{ backgroundColor: "#FFFFCC", color: "black" }}
              icon={<Loading3QuartersOutlined />}
            >
              Waiting
            </Tag>
          );
        if (item.status === 1)
          return (
            <Tag
              style={{ backgroundColor: "#FF6600", color: "white" }}
              icon={<SyncOutlined />}
            >
              Pending
            </Tag>
          );
        if (item.status === 3)
          return (
            <Tag
              style={{ backgroundColor: "#CC0000", color: "white" }}
              icon={<StopOutlined />}
            >
              Rejected
            </Tag>
          );
        if (item.status === 2)
          return (
            <Tag
              style={{ backgroundColor: "#00FF00" }}
              icon={<CheckOutlined />}
            >
              Approve
            </Tag>
          );
      },
    },
  ];
  function loadReport() {
    let map = new Map();
    getAuth(
      `/Report/Account?isReporter=false&take=${take}&skip=${skip}&status=${status}&roleAdminFilter=0`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((r) => {
          map.set(r.id, r);
        });
        setListReport([...map.values()]);
      }
    });
  }
  function loadReported() {
    let map = new Map();
    getAuth(
      `/Report/Account?isReporter=true&take=${take}&skip=${skip}&roleAdminFilter=1&status=0`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((r) => {
          map.set(r.id, r);
        });
        setListReported([...map.values()]);
      }
    });
    getAuth(
      `/Report/Account?isReporter=true&take=${take}&skip=${skip}&roleAdminFilter=1&status=1`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((r) => {
          map.set(r.id, r);
        });
        setListReported([...map.values()]);
      }
    });
    getAuth(
      `/Report/Account?isReporter=true&take=${take}&skip=${skip}&roleAdminFilter=1&status=2`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((r) => {
          map.set(r.id, r);
        });
        setListReported([...map.values()]);
      }
    });
    getAuth(
      `/Report/Account?isReporter=true&take=${take}&skip=${skip}&roleAdminFilter=1&status=3`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((r) => {
          map.set(r.id, r);
        });
        setListReported([...map.values()]);
      }
    });
  }
  useEffect(() => {
    loadReport();
    loadReported();
  }, [status]);
  return (
    <div>
      <h1
        style={{
          fontSize: "30px",
          color: "#037C00",
          fontWeight: "bold",
          textAlign: "left",
          marginLeft: "80px",
          marginBottom: "20px",
        }}
      >
        My Reports
      </h1>
      <Tabs type="card" onChange={onChange} defaultActiveKey="0">
        <TabPane tab="Process Report" key="0">
          <Tabs tabPosition="left" onChange={onChange}>
            <TabPane tab="Waiting Report" key="0">
              <Table columns={column} dataSource={listReport} />
            </TabPane>
            <TabPane tab="Pending Report" key="1">
              <Table columns={column} dataSource={listReport} />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Complete Report" key="2">
          <Tabs tabPosition="left" onChange={onChange}>
            <TabPane tab="Approve Report" key="2">
              <Table columns={column} dataSource={listReport} />
            </TabPane>
            <TabPane tab="Reject Report" key="3">
              <Table columns={column} dataSource={listReport} />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Reported">
          
          <Table columns={columnReported} dataSource={listReported} />
     
      </TabPane>
      </Tabs>
    </div>
  );
}
