import React from "react";
import { Link, useNavigate } from "react-router-dom";
import platformIcon from "../assets/platform-icon.png"
import { useState } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaHome,
  FaUserPlus,
  FaUserFriends
} from "react-icons/fa"
import { BsClipboard2DataFill } from "react-icons/bs"
import { MdLogout } from "react-icons/md"
import {IoSettingsSharp} from "react-icons/io5"
import styles from "./Sidebar.module.css"

function Sidebar({isCollapsed, setIsCollapsed}) {

  const navigate = useNavigate();

  function logout(navigate) {
    localStorage.setItem("access_token", "");
  }

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles["sidebar-header"]}>
        <h3 className={styles["platform-name"]}>
          <img src={platformIcon} className={styles["platform-icon"]}></img>
          {isCollapsed ? null : <span>Variant Platform</span>}
        </h3>
        <div className={styles["toggleButton"]} onClick={toggleSidebar}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </div>
      </div>
      <div className={`${styles["nav-links"]} ${isCollapsed ? styles.collapsed : styles.notCollapsed}`}>
        <div>
          <Link className={styles.link} to="../home" title="Home">
            <FaHome className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Home</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to="../patients" title="Patients">
            <FaUserFriends className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Patients</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to="../register-patient" title="Register Patient">
            <FaUserPlus className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Register Patient</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to="." title="Submit Analysis">
            <BsClipboard2DataFill className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Submit Analysis</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to="." title="Settings">
            <IoSettingsSharp className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Settings</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to="../login" onClick={() => logout(navigate)} title="Logout">
            <MdLogout className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Logout</p>}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;