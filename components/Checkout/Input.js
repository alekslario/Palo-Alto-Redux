import React, { useState } from "react";
import $ from "./_Input";
const Input = React.forwardRef(
  ({ width = "100%", id, placeholder, value = "", ...props }, ref) => {
    const [state, setState] = useState(value);
    const handleChange = e => setState(e.target.value);
    return (
      <$.Wrapper width={width}>
        <div>
          <$.Label htmlFor={id} value={!!state}>
            {placeholder}
          </$.Label>
          <$.Input
            ref={ref}
            id={id}
            value={state}
            onChange={handleChange}
            {...props}
          />
        </div>
      </$.Wrapper>
    );
  }
);

export default Input;
