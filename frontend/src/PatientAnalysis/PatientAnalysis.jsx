import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import styles from "./PatientAnalysis.module.css"
import Table from "../PatientAnalysis/Table/Table";
import BarChartWithChromosomes from "./BarPlot/BarPlot"

function PatientAnalysis() {

    const { id } = useParams();

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("../../login");
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }


    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={styles.dashboard}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className={styles.contentWrapper}>
                <BarChartWithChromosomes />
                <div className={styles.tableWrapper}>
                    <Table id={id} />
                </div>
            </div>
        </div>
    )

}

export default PatientAnalysis;