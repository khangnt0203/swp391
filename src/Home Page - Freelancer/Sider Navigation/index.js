import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Avatar, Tag } from "antd";
import { getAuth } from "../../Utils/httpHelper";
export default function () {
  const [profile, setProfile] = useState([]);
  const [listSkillUser, setListSkillUser] = useState([]);
  useEffect(() => {
    getUser();
    getSkillByUser();
  }, []);

  function getUser() {
    getAuth(`/AccountProfile`).then((response) => {
      if (response.data.code === 1) {
        setProfile(response.data.data);
      }
    });
  }
  function getSkillByUser() {
    let map = new Map();
    getAuth(`/AccountProfile/Skills`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skillUser) => {
          map.set(skillUser.skillId, skillUser);
        });
        setListSkillUser([...map.values()]);
      }
    });
  }

  return (
    <div style={{ borderStyle: "groove", height: "300px" }}>
      <Avatar
        size={{
          xs: 32,
          sm: 40,
          md: 50,
          lg: 64,
          xl: 80,
          xxl: 100,
        }}
        src={profile.imageUrl}
        style={{ backgroundColor: "#87d068", marginTop: "20px" }}
      />
      <br />
      <a href="/profile-freelancer" style={{ fontSize: "20px" }}>
        {profile.firstname + " " + profile.lastname}
      </a>
      <p style={{ fontWeight: "bold" }}>{profile.major}</p>
    {listSkillUser.map((skill)=>(<Tag color='#f50'>{skill.skilName}</Tag>))}
    </div>
  );
}
