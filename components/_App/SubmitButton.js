import $ from "./_SubmitButton";
import LoadingIcon from "../Icons/Loader";
const SubmitButton = ({ loading, children, ...props }) => {
  return (
    <>
      <$.SubmitButton disabled={loading} isLoading={loading} {...props}>
        {children}
        {loading && <LoadingIcon />}
      </$.SubmitButton>
    </>
  );
};

export default SubmitButton;
