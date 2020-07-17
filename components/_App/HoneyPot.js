import $ from "./_HoneyPot";
import React, { useRef, useState } from "react";
export const useHoneyRef = (minimumPossibleResponseThreshold = 3000) => {
  const [time] = useState(Date.now());
  const honeyRef = useRef(null);
  const isBot = () =>
    honeyRef.current.value === "true" ||
    Date.now() - time < minimumPossibleResponseThreshold;
  return [honeyRef, isBot];
};

const HoneyPot = React.forwardRef(({ id }, ref) => {
  return (
    <$.HiddenLabel
      alt="Check it if you DO NOT want to submit this contact form."
      htmlFor={`honey_trap_${id}`}
    >
      Are you a bot?
      <$.HoneyPot
        id={`honey_trap_${id}`}
        type="checkbox"
        tabIndex="-1"
        defaultValue={false}
        alt="Check it if you DO NOT want to submit this contact form."
        ref={ref}
      />
    </$.HiddenLabel>
  );
});

export default HoneyPot;
