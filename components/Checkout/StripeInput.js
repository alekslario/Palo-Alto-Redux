import $ from "./_StripeInput";

const StripeInput = ({
  children,
  position = "",
  id,
  placeholder,
  value = "",
  error,
  ...props
}) => {
  return (
    <$.Column position={position}>
      <$.Wrapper>
        <div>
          <$.Input id={id} value={!value} {...props} error={error}>
            {children}
          </$.Input>
          <$.Label htmlFor={id} value={!value}>
            {placeholder}
          </$.Label>
        </div>
      </$.Wrapper>
      {error && <$.Error>{error}</$.Error>}
    </$.Column>
  );
};

export default StripeInput;
