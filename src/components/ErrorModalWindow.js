import React from "react";

const ErrorPath = ({ textError }) => (
  <div className="errorPath">
    <p>{textError || "you entered the wrong path"}</p>
  </div>
);
export default ErrorPath;
