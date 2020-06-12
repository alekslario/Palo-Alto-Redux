import $ from "./_SubmitButton";
const SubmitButton = ({ loading, children, ...props }) => {
  return (
    <>
      <$.SubmitButton disabled={loading} isLoading={loading} {...props}>
        {children}
      </$.SubmitButton>
    </>
  );
};

export default SubmitButton;
