import styled from "styled-components";

export const TableHeaderRow = styled.div`
  min-height: 56px;
  max-height: 56px;
  line-height: 56px;
  border-color: rgb(224, 224, 224);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: solid thin darkgrey;
  transform: translate3d(0px, 0px, 0px);
  align-items: flex-start;
  flex-direction: row;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const HeaderColumn = styled.div<{ width: string | undefined }>`
  height: 56px;
  width: ${({ width }) => width ?? "130px"};
  min-width: 130px;
  max-width: ${({ width }) => width ?? "130px"};
  border-color: rgb(224, 224, 224);
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 550;
`;

export const DataColumn = styled.div<{ width: string | undefined }>`
  height: 56px;
  width: ${({ width }) => width ?? "130px"};
  min-width: 130px;
  max-width: ${({ width }) => width ?? "130px"};

  border-color: rgb(224, 224, 224);
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
`;
