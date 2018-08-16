import React from "react";

const ValidationError = props => (
  <div>
    {props.required ? (
      <div style={{ color: "red", marginTop: 0 }}>
        * {props.displayName} is required
      </div>
    ) : null}
  </div>
);

export default ValidationError;
