import styles from "./Dashboard.module.css"
import React from "react"
import Table from "./Table/Table"
import Sidebar from "./Sidebar/Sidebar";

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <Sidebar/>
            <div className={styles["table-wrapper"]}>
                <Table />
            </div>
        </div>
    );
}

export default Dashboard;