import React from "react";
import { Link } from "react-router-dom";
import platformIcon from "../../assets/platform-icon.png"
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
import styles from "./Sidebar.module.css"

function Sidebar() {

  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <Link className={styles.link} to=".">
            <FaHome className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Home</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to=".">
            <FaUserFriends className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Pacientes</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to=".">
            <FaUserPlus className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Cadastrar Paciente</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to=".">
            <BsClipboard2DataFill className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Submeter Análise</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to=".">
            <FaHome className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Configurações</p>}
          </Link>
        </div>
        <div>
          <Link className={styles.link} to=".">
            <MdLogout className={styles.sidebarIcon}/>
            {isCollapsed ? null : <p>Logout</p>}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;