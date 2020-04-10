import React, { useState } from "react";
import $ from "./_Input";

const Input = React.forwardRef(
  (
    { width = "100%", position = "", id, placeholder, value = "", ...props },
    ref
  ) => {
    const [state, setState] = useState(value);
    const handleChange = e => setState(e.target.value);
    return (
      <$.Wrapper width={width} position={position}>
        <div>
          <$.Input
            ref={ref}
            id={id}
            value={state}
            onChange={handleChange}
            {...props}
          />
          <$.Label htmlFor={id} value={!!state}>
            {placeholder}
          </$.Label>
        </div>
      </$.Wrapper>
    );
  }
);

export default Input;
