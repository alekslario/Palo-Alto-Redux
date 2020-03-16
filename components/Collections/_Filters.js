import styled from "styled-components";
import { inlineFlexCenter, textCenter, textStart } from "../../styles/reusable";
import customKeyframes from "../../styles/keyframes";
const {
  fadeInBox,
  fadeOutBox,
  fadeInListItem,
  fadeOutListItem,
  fadeInListItemAlt
} = customKeyframes;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.alpha};
  display: flex;
  padding: 10px 0;
  ${textCenter};
  align-items: center;
`;

const ResetButton = styled(Button)`
  overflow: hidden;
  svg {
    width: 12px;
    fill: ${({ theme }) => theme.colors.alpha};
    transition: transform 0.3s ease;
  }
  span {
    padding-right: 10px;
    ${inlineFlexCenter}
  }
  &:hover svg {
    transform: rotate(90deg);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-right: 50px;
  }
  @media (min-width: 1024px) {
    white-space: nowrap;
    margin-bottom: 15px;
    padding: 0;
  }
  &.reset-button-enter {
    max-height: 2px !important;
    @media (max-width: 1023px) {
      padding: 0 !important;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      margin-right: 0;
    }
    @media (min-width: 1024px) {
      margin-bottom: 2px !important;
    }
  }
  &.reset-button-enter-active {
    max-height: ${({ maxHeight }) => `${maxHeight}px` || 0};
    @media (max-width: 1023px) {
      padding: 10px 0px;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      margin-right: 50px;
    }
    @media (min-width: 1024px) {
      margin-bottom: 15px;
    }
    transition: max-height 0.3s margin 0.3s padding 0.3s ease-in-out;
  }
  &.reset-button-exit {
    max-height: ${({ maxHeight }) => `${maxHeight}px` || 0};
    @media (max-width: 1023px) {
      padding: 10px 0px;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      margin-right: 50px;
    }
    @media (min-width: 1024px) {
      margin-bottom: 15px;
    }
  }
  &.reset-button-exit-active {
    transition: max-height 0.3s margin 0.3s padding 0.3s ease-in-out;
    max-height: 2px;
    @media (max-width: 1023px) {
      padding: 0;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      margin-right: 0;
    }
    @media (min-width: 1024px) {
      margin-bottom: 2px;
    }
  }
`;
const ButtonShowHide = styled(Button)`
  @media (min-width: 1024px) {
    ${textStart};
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.delta};
    pointer-events: none;
    cursor: default;
    padding-top: 0px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    letter-spacing: 0.1em;
    font-size: 12px;
    text-transform: uppercase;
    &:hover {
      opacity: 1;
    }

    svg {
      display: none;
    }
  }
  svg {
    margin-top: 3px;
    width: 13px;
    margin-left: 12px;
    transform: ${({ visible }) =>
      visible ? "rotate(0deg)" : "rotate(180deg)"};
  }
  @media (min-width: 1024px) {
    margin-bottom: 15px;
  }
`;

const Switch = styled.div`
  ${inlineFlexCenter}
  width: 100%;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
  }
  @media (max-width: 1023px) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.delta};
  }
  @media (min-width: 1024px) {
    align-items: start;
  }
`;
const FiltersBlock = styled.div`
  width: 100%;
  top: 0;
  padding: 0;
  position: sticky;
  align-self: start;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.primary};
  @media (min-width: 1024px) {
    width: 300px;
    padding: 20px 50px 10px 50px;
  }
`;

const Filters = styled.ul`
  visibility: hidden;
  opacity: 0;
  background-color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.colors.delta};
  padding: 10px 20px 10px;
  transition: opacity 0.3s ease, margin 0.3s ease, visibility 0s linear 0s;
  animation: ${({ visible }) =>
      visible === null ? "" : visible ? fadeInBox : fadeOutBox}
    300ms ease-out both;
  li {
    margin-bottom: 10px;
    margin-top: 10px;
    padding-right: 15px;

    animation: ${({ visible }) =>
        visible === null ? "" : visible ? fadeInListItem : fadeOutListItem}
      200ms ease-out both;
  }

  li:nth-child(2) {
    animation-delay: 70ms;
  }
  li:nth-child(3) {
    animation-delay: 90ms;
  }
  li:nth-child(4) {
    animation-delay: 130ms;
  }
  li:nth-child(5) {
    animation-delay: 170ms;
  }
  @media (max-width: 1023px) {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0;
    li {
      opacity: 0;
      animation: ${({ visible }) =>
          visible === null ? "" : visible ? fadeInListItemAlt : ""}
        300ms ease-out both;
    }
    li:nth-child(1) {
      animation-delay: 0ms;
    }
    li:nth-child(2) {
      animation-delay: 50ms;
    }
    li:nth-child(3) {
      animation-delay: 100ms;
    }
    li:nth-child(4) {
      animation-delay: 150ms;
    }
    li:nth-child(5) {
      animation-delay: 200ms;
    }
  }
  @media (min-width: 1024px) {
    visibility: visible;
    opacity: 1;
    display: block;
    border-bottom: none;
    animation: none;
    li {
      margin-top: 0;
      visibility: visible;
      opacity: 1;
      animation: none;
    }
  }
`;

const CheckBox = styled.span`
  margin-right: 9px;
  pointer-events: none;
  width: 16px;
  height: 16px;
  ${inlineFlexCenter}
  color: ${({ theme }) => theme.colors.primary};
  svg {
    pointer-events: none;
    width: 10px;
    height: 10px;
  }
  border: 1px solid ${({ checked, theme }) =>
    checked ? theme.colors.beta : theme.colors.delta};
  background: ${({ checked, theme }) =>
    checked ? theme.colors.beta : theme.colors.primary};
`;
const Label = styled.span`
  color: ${({ theme }) => theme.colors.alpha};
  pointer-events: none;
  ${textStart};
`;

const Wrapper = styled.button`
  ${inlineFlexCenter}
`;
export default {
  Filters,
  CheckBox,
  Label,
  Wrapper,
  FiltersBlock,
  ButtonShowHide,
  Switch,
  ResetButton
};
