import $ from "./_Radio";

const Radio = React.forwardRef(({ id, ...rest }, ref) => (
  <$.Radio>
    <input type="radio" id={id} ref={ref} {...rest} />
    <span />
  </$.Radio>
));

export default Radio;
