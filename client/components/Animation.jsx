import * as React from "react";
// import { render } from "react-dom";
import { motion, useTime, useTransform } from "framer-motion";
import { CiStar } from "react-icons/ci";

import "../styles2.css";

const Animation = () => {
  const time = useTime();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  return (
    <div className="flex">

  
      <div className="example-container mb-4">
        <motion.section style={{ rotate }}>
          <CiStar className="text-base" />
          {/* <CiStar className="text-base" /> */}
        </motion.section>
      </div>
      <div className="example-container mb-4">
        <motion.section style={{ rotate }}>
          <CiStar className="text-base" />
          {/* <CiStar className="text-base" /> */}
        </motion.section>
      </div>
      <div className="example-container mb-4">
        <motion.section style={{ rotate }}>
          <CiStar className="text-base" />
          {/* <CiStar className="text-base" /> */}
        </motion.section>

      </div>
      <div className="example-container mb-4">
        <motion.section style={{ rotate }}>
          <CiStar className="text-base" />
          {/* <CiStar className="text-base" /> */}
        </motion.section>
      </div>
      <div className="example-container mb-4">
        <motion.section style={{ rotate }}>
          <CiStar className="text-base" />
          {/* <CiStar className="text-base" /> */}
        </motion.section>
      </div>

    </div>
  );
};

export default Animation;
