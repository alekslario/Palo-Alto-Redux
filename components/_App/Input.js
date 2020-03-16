import $ from "./_Input";

const Input = React.forwardRef(({ id, labelText, ...rest }, ref) => (
  <>
    <$.HiddenLabel htmlFor={`${id}`}>{labelText}</$.HiddenLabel>
    <$.Input id={`${id}`} {...rest} ref={ref} />
  </>
));

export default Input;
