import { Button, Table, Tabs, Tag, Modal, Radio, Space, message, Input } from "antd";
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
export default function ClientReport() {
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [reportId, setReportId] = useState();
  const [listReport, setListReport] = useState([]);
  const [solution, setSolution] = useState([]);
  const [status, setStatus] = useState(0);
  const [reason, setReason] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleModalReject, setIsVisibleModalReject] = useState(false);
  const onChange = (key) => {
    console.log(key);
    setStatus(key);
  };
  const onChangeSolution = (e) => {
    console.log("radio checked", e.target.value);
    setSolution(e.target.value);
  };
  const column = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
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
      title: "Reported Person",
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
      render: (e, item) => {
        if (item.status === 0)
          return (
            <Button
              onClick={() => {
                processingReport(item.id);
              }}
            >
              Process
            </Button>
          );
        if (item.status === 1) {
          return (
            <>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#009900",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModal(true);
                  setReportId(item.id);
                }}
              >
                Approve
              </Button>
              <Button
                style={{
                  borderRadius: "10px",
                  background: "#EE0000",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalReject(true);
                  setReportId(item.id);
                }}
              >
                Reject
              </Button>
            </>
          );
        }
      },
    },
  ];
  function loadReport() {
    let map = new Map();
    getAuth(
      `/Report/Account?isReporter=true&take=${take}&skip=${skip}&status=${status}&roleAdminFilter=2`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((r) => {
          map.set(r.id, r);
        });
        setListReport([...map.values()]);
      }
    });
  }
  function processingReport(reportId) {
    putAuth(`/Report/Admin/Pending?reportId=${reportId}`).then((response) => {
      if (response.data.code === 1) {
        loadReport();
      }
    });
  }
 
  function approveReport() {
    putAuth(
      `/Report/Admin/ApproveOrReject?isApproved=true&reportId=${reportId}&solutionType=${solution}`
    ).then((response) => {
      if (response.data.code === 1) {
        message.success("Approve Successfully!");
        setIsVisibleModal(false);
        loadReport();
      }
    });
  }
  function rejectReport() {
    putAuth(
      `/Report/Admin/ApproveOrReject?isApproved=false&reportId=${reportId}&reason=${reason}&solutionType=0`
    ).then((response) => {
      if (response.data.code === 1) {
        message.success("Reject Successfully!");
        setIsVisibleModalReject(false);
        loadReport();
      }
    });
  }
  useEffect(() => {
    loadReport();
  }, [status]);
  return (
    <div>
      <h1
        style={{
          fontSize: "30px",
          color: "#037C00",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Client Report
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
      </Tabs>

      {/* Modal Solution */}
      <Modal
        visible={isVisibleModal}
        title="Solution"
        onCancel={() => {
          setIsVisibleModal(false);
        }}
        onOk={() => approveReport()}
      >
        <Radio.Group value={solution} onChange={onChangeSolution}>
          <Space direction="vertical">
            <Radio value={0}>Send notice email to freelancer</Radio>

            <Radio value={3}>Others...</Radio>
          </Space>
        </Radio.Group>
      </Modal>
      {/* Modal Reject */}
      <Modal
        visible={isVisibleModalReject}
        title="Reject report"
        onCancel={() => {
          setIsVisibleModalReject(false);
        }}
        onOk={() => rejectReport()}
      >
       <Input name='reason' onChange={(e)=>setReason(e.target.value)}/>
      </Modal>
    </div>
  );
}
