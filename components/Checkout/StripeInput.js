import $ from "./_StripeInput";
const StripeInput = ({
  children,
  position = "",
  error: { message } = {},
  ...props
}) => {
  return (
    <$.Column position={position}>
      <$.Wrapper {...props} error={message}>
        {children}
      </$.Wrapper>
      {message && <$.Error>{message}</$.Error>}
    </$.Column>
  );
};

export default StripeInput;
