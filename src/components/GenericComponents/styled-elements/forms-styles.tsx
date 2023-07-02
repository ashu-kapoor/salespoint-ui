import styled from "styled-components";

export const FlexCenterDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

export const Button = styled.button<{ enabled: boolean }>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(255, 255, 255);
  background-color: rgb(19, 26, 78);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  ${({ enabled }) =>
    enabled &&
    `
  margin-top: 1.5rem;
    &:hover {
      text-decoration: none;
      background-color: rgb(21, 101, 192);
      box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
        rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    }
  `}

  ${({ enabled }) =>
    !enabled &&
    ` 
    margin-top: 0.8rem;
    &:hover {
      cursor: not-allowed
    }
  `}
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
`;

//Form Input Styles

export const InputParent = styled.div`
  margin: 2rem;
`;

export const InputLabel = styled.label<{ show: boolean | undefined }>`
  font-weight: 700;
  ${({ show }) => (show ? `visibility: visible;` : `visibility: hidden`)};
`;

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 0.7rem;
  cursor: text;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
`;

export const StyledInput = styled.input<{ valid: boolean }>`
  display: block;
  z-index: 10;
  padding: 0.5rem;
  border: ${({ valid }) => (valid ? `3px solid rgb(98, 107, 179);` : `none;`)};
`;

export const InputFieldSet = styled.fieldset`
  position: absolute;
  padding: 0px;
  inset: -17px -6px -2px;
  border-color: rgb(211, 47, 47);
`;

export const Legend = styled.legend`
  float: unset;
  font-size: 0.75em;
`;

export const LegendSpan = styled.span`
  color: rgb(211, 47, 47);
`;

export const InputErrorDisplay = styled.p`
  margin: 2px 0px 0px 0px;
  text-align: center;
  font-size: smaller;
  color: maroon;
`;

export const Select = styled.select`
  min-height: 2.2rem;
  border: 3px solid rgb(98, 107, 179);
`;
