import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./VariantDetails.module.css"
import IGVViewer from "./IGVViewer";
import api from "../../api"

function VariantDetails() {

    const { subject_id, variant } = useParams();

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("../../../login");
        }
    }, [token, navigate]);
    
        if (!token) {
          return null;
        }

    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchVariantDetails() {
            try {
                const response = await api.get(`http://localhost:8080/variants/${variant}`);
                console.log(response.data);
                setData(response.data);
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchVariantDetails();
    }, [variant]);

    useEffect(() => {
        console.log("Updated data:", data);
        console.log(data["gene"]);
        
    }, [data]);

    const [isCollapsed, setIsCollapsed] = useState(true);

    const geneName = data["gene"]

    return (
        geneName && (
            <div className={styles.dashboard}>
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                <div style={{margin: "40px"}}>
                    <h2 className={styles.browserTitle}>Genome Browser</h2>
                    <IGVViewer 
                        locus={geneName}
                        key={geneName}
                        className={styles.igvBrowser}
                    />
                </div>
            </div>
        )
    );
}

export default VariantDetails;