import styled from "styled-components";
import {
  textCenter,
  HiddenLabel,
  title,
  input,
  SubmitButton,
  Error
} from "../../styles/reusable";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 50%;
  }
`;
const Notice = styled.h3`
  font-size: 22px;
  ${title}
  color:${({ theme }) => theme.colors.secondary};
`;
const Input = styled.input`
  ${input}
`;
const CommentSubmit = styled(SubmitButton)`
  margin: 10px 0 10px 0;
`;
const TextArea = styled.textarea`
  ${input}
  margin-left:0;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 30px;
    width: 50%;
  }
`;
export default {
  Wrapper,
  Input,
  TextArea,
  Notice,
  CommentSubmit,
  InputWrapper,
  HiddenLabel,
  Error
};
