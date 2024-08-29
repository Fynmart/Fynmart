import React from "react";
import { FallingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div>
      <FallingLines
        color="pink"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
}

export default Loader;
