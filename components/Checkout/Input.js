import React from "react";
import $ from "./_Input";

const Input = React.forwardRef(
  ({ position = "", id, placeholder, value = "", error, ...props }, ref) => {
    return (
      <$.Column position={position}>
        <$.Wrapper>
          <div>
            <$.Input ref={ref} id={id} value={value} {...props} error={error} />
            <$.Label htmlFor={id} value={!!value}>
              {placeholder}
            </$.Label>
          </div>
        </$.Wrapper>
        {error && <$.Error>{error}</$.Error>}
      </$.Column>
    );
  }
);

export default Input;
