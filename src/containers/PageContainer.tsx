import { JsxElement } from "typescript";
import {
  DataContainer,
  ContainerHeader,
  Divider,
  CheckBox,
} from "../components/styled-elements/app-styles";
import {
  TableHeaderRow,
  HeaderColumn,
  DataColumn,
} from "../components/styled-elements/table-styles";
import { Fragment, useState } from "react";
import UpdateForm from "../components/UpdateForm";
import { UpdateFormMetadata } from "../components/types";
import SearchForm from "../components/SearchForm";

interface PageContainerProps {
  headerName: string;
  headers: {
    header: string;
    width?: string;
    fieldName: string;
    renderMethod?: RenderFunction;
  }[];
  data: TableData[];
  width?: string;
  margin?: string;
  metadata?: UpdateFormMetadata[];
}

type RenderFunction = (data: number) => JsxElement;

interface TableData {
  [key: string]: any;
}

export function PageContainer(props: PageContainerProps) {
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleClick = (event: React.MouseEvent<unknown>, dataId: string) => {
    const selectedIndex = selected.indexOf(dataId);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, dataId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <DataContainer>
      <ContainerHeader>{props.headerName}</ContainerHeader>
      <Divider isThick={true} />
      <SearchForm metaData={props.metadata}></SearchForm>
      <Divider isThick={true} />
      <div
        style={{
          display: "flex",
          margin: "1rem",
          flexDirection: "column",
          width: props.width,
          marginLeft: props.margin,
          marginRight: props.margin,
          overflowY: "scroll",
        }}
        className="table-wrapper"
      >
        <TableHeaderRow>
          <HeaderColumn key="selectorHeader" width="50px">
            <CheckBox key="headerCheckBox" />
          </HeaderColumn>

          {props.headers?.map((header) => (
            <HeaderColumn key={header.header} width={header.width}>
              {header.header}
            </HeaderColumn>
          ))}
        </TableHeaderRow>

        {props.data?.map((data) => {
          return (
            <Fragment key={data.id}>
              <TableHeaderRow>
                <HeaderColumn width="50px">
                  <CheckBox
                    key={`${data.id}-checkbox`}
                    onClick={(event) => handleClick(event, data.id)}
                  />
                </HeaderColumn>
                {props.headers?.map((header) => {
                  return (
                    <DataColumn
                      key={`${data.id}-${header.fieldName}`}
                      width={header.width}
                    >
                      {data[header.fieldName]}
                    </DataColumn>
                  );
                })}
              </TableHeaderRow>

              {selected?.indexOf(data.id) > -1 && props.metadata && (
                <UpdateForm
                  key={`${data.id}-updateForm`}
                  data={data}
                  metadata={props.metadata}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </DataContainer>
  );
}
