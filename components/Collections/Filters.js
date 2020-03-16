import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import $ from "./_Filters";
import AngleIcon from "../Icons/Angle";
import CrossIcon from "../Icons/Cross";
import { useStore } from "../../utils/contextStore";

const Filters = ({ gender }) => {
  const [store, dispatch] = useStore();
  const [visibility, setVisibility] = useState(null);
  const resetRef = useRef(null);
  const filtersRef = useRef(null);

  useEffect(() => {
    const clickListener = e => {
      if (filtersRef.current && !filtersRef.current.contains(e.target))
        setVisibility(false);
    };
    window.addEventListener("click", clickListener);
    return () => window.removeEventListener("click", clickListener);
  }, []);
  const handleChange = e => {
    e.preventDefault();
    const label = e.target.getAttribute("name");
    dispatch({ type: "ADD_FILTER", gender, filter: label });
  };

  return (
    <$.FiltersBlock ref={filtersRef}>
      <$.Switch>
        <CSSTransition
          in={Object.keys(store.filter[gender]).some(
            ele => store.filter[gender][ele]
          )}
          timeout={100}
          classNames="reset-button"
          unmountOnExit
        >
          {
            <$.ResetButton
              ref={resetRef}
              maxHeight={resetRef.current ? resetRef.current.scrollHeight : 0}
              onClick={() => dispatch({ type: "RESET_FILTER" })}
            >
              <span>
                <CrossIcon />
              </span>
              Reset - {7} products shown
            </$.ResetButton>
          }
        </CSSTransition>
        <$.ButtonShowHide
          onClick={() => setVisibility(prevState => !prevState)}
          visible={visibility}
        >
          Filters
          <AngleIcon />
        </$.ButtonShowHide>
      </$.Switch>
      <$.Filters id="filters" visible={visibility}>
        {Object.keys(store.filter[gender]).map(ele => (
          <li key={ele}>
            <$.Wrapper name={ele} onClick={handleChange}>
              <$.CheckBox checked={store.filter[gender][ele]}>
                <FontAwesomeIcon icon={["fas", "check"]} />
              </$.CheckBox>
              <$.Label>{ele}</$.Label>
            </$.Wrapper>
          </li>
        ))}
      </$.Filters>
    </$.FiltersBlock>
  );
};

export default Filters;
