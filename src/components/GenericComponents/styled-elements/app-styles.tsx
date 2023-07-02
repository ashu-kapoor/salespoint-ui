import styled from "styled-components";

export const DataContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 1rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  flex-direction: column;
`;

export const ContainerHeader = styled.div`
  margin: 1rem;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.334;
  letter-spacing: 0em;
  color: rgb(30 41 128);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Divider = styled.hr<{ isThick: boolean }>`
  margin: 0px 16px;
  flex-shrink: 0;
  border-width: 0px 0px ${({ isThick }) => (isThick ? "thick" : "thin")};
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.12);
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  margin: 10px;
`;
