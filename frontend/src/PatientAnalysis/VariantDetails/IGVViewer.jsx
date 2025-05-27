import React, { useEffect, useRef } from "react";
import styles from "./VariantDetails.module.css"

function IGVViewer({ locus }) {
  const igvContainer = useRef(null);

  useEffect(() => {
    let browser;
    // Dynamically load the IGV script
    const script = document.createElement("script");
    script.src = "../../../public/igv.min.js"; // Adjusted path to public folder
    script.async = true;

    script.onload = () => {
      // `igv` will be available globally on `window`
      const igv = window.igv;
      const options = {
        genome: "hg38",
        locus,
      };
      igv.createBrowser(igvContainer.current, options).then((b) => {
        browser = b;
      });
    };

    document.body.appendChild(script);

    return () => {
      if (browser) {
        browser.destroy();
      }
      document.body.removeChild(script);
    };
  }, [locus]);

  return <div 
          ref={igvContainer} 
          className={styles.igvBrowser}
          style={{ height: "500px" }} />;
}

export default IGVViewer;
