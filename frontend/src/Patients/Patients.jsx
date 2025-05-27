import styles from "./Patients.module.css"
import {React, useEffect, useState} from "react"
import Table from "./Table/Table"
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("../login");
        }
      }, [token, navigate]);
    
      if (!token) {
        return null;
      }

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={styles.dashboard}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
            <div className={styles["table-wrapper"]}>
                <Table />
            </div>
        </div>
    );
}

export default Dashboard;