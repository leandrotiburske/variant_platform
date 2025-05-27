import styles from "./Home.module.css"
import {React, useEffect, useState} from "react"
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import video from "../assets/3191572-uhd_3840_2160_25fps.mp4"

function Home() {

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

    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <div className={styles.dashboard}>
        <Sidebar className={styles.sidebar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={styles["video-background"]}>
          <video autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className={isCollapsed ? styles.homeTitle : styles.homeTitleExpanded}>

        <h1 className={styles.mainTitle}>Empowering</h1>
        <h1 className={styles.mainTitle}>
          <span className={styles.wordCarousel}>
          <span>research advances</span>
          <span>diagnosis precision</span>
          <span>genetic insights</span>
          </span> 
        </h1>
          <h2 className={styles.subTitle}>Manage, visualize and analyze genomic variants.</h2>
          </div>
      </div>
    );
}

export default Home;