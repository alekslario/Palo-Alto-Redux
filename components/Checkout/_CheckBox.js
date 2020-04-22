import styled from "styled-components";
const CheckBox = styled.div`
  position: relative;
  width: 18px;
  min-width: 18px;
  height: 18px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 0.75em;
  white-space: nowrap;
  &:focus-within {
    box-shadow: 0 0 0 2px
      ${({ theme }) => theme.checkout.colors.attentionShadow};
  }
  &:focus-within input {
    border: 2px solid ${({ theme }) => theme.checkout.colors.attention};
  }
  &:hover input {
    border: 1px solid ${({ theme }) => theme.checkout.colors.border};
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.checkout.colors.border};
    outline: none;
  }
  div {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all 0.2s ease-in-out;
    padding: 2px;
    pointer-events: none;
    box-shadow: none;
  }
  input[type="checkbox"]:checked + div {
    box-shadow: 0 0 0 10px ${({ theme }) => theme.checkout.colors.attention}
      inset;
  }
`;

export default { CheckBox };
