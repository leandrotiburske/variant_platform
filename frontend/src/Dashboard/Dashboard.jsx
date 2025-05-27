import styles from "./Dashboard.module.css"
import {React, useEffect} from "react"
import Table from "./Table/Table"
import Sidebar from "./Sidebar/Sidebar";
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


    return (
        <div className={styles.dashboard}>
            <Sidebar />
            <div className={styles["table-wrapper"]}>
                <Table />
            </div>
        </div>
    );
}

export default Dashboard;