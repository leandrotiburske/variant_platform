import React, { useEffect, useRef, useState } from "react";
import styles from "./VariantDetails.module.css";

function IGVViewer({ locus }) {
  const igvContainer = useRef(null);
  const browserRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    // Check if IGV is already loaded
    const loadIGV = () => {
      if (window.igv) return Promise.resolve(window.igv);

      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/igv@3.3.0/dist/igv.min.js";
        script.async = true;

        script.onload = () => resolve(window.igv);
        script.onerror = () => reject(new Error("Failed to load IGV script"));

        document.body.appendChild(script);
      });
    };

    loadIGV()
      .then((igv) => {
        if (isCancelled) return;
        const options = {
          genome: "hg38",
          locus,
        };
        return igv.createBrowser(igvContainer.current, options);
      })
      .then((browser) => {
        if (isCancelled) return;
        browserRef.current = browser;        
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isCancelled = true;
      if (browserRef.current) {
        browserRef.current.destroy();
        browserRef.current = null;
      }
    };
  }, [locus]);

  return (
    <div
      ref={igvContainer}
      className={styles.igvBrowser}
    />
  );
}

export default IGVViewer;
