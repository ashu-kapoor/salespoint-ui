import { Fragment, ReactElement, useState } from "react";
import { CheckBox } from "./styled-elements/app-styles";
import {
  DataColumn,
  HeaderColumn,
  StyledTable,
  TableHeaderRow,
} from "./styled-elements/table-styles";
import { TableProperties, UpdateFormProps } from "./Types";
import React from "react";

export function Table(
  tableProps: TableProperties & {
    children?:
      | ReactElement<UpdateFormProps>
      | Array<ReactElement<UpdateFormProps>>;
  }
) {
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
    <StyledTable
      margin={tableProps.margin}
      width={tableProps.width}
      className="table-wrapper"
    >
      <TableHeaderRow>
        <HeaderColumn width="50px">
          <CheckBox />
        </HeaderColumn>

        {tableProps.headers?.map((header) => (
          <HeaderColumn key={header.header} width={header.width}>
            {header.header}
          </HeaderColumn>
        ))}
      </TableHeaderRow>

      {tableProps.data?.map((data) => {
        return (
          <Fragment key={data.id}>
            <TableHeaderRow>
              <HeaderColumn width="50px">
                <CheckBox
                  key={`${data.id}-checkbox`}
                  onClick={(event) => handleClick(event, data.id)}
                />
              </HeaderColumn>
              {tableProps.headers?.map((header) => {
                return (
                  <DataColumn
                    key={`${data.id}-${header.fieldName}`}
                    width={header.width}
                  >
                    {header.renderMethod
                      ? header.renderMethod(data[header.fieldName])
                      : data[header.fieldName]}
                  </DataColumn>
                );
              })}
            </TableHeaderRow>

            {selected?.indexOf(data.id) > -1 &&
              tableProps.metadata &&
              tableProps.children &&
              Array.isArray(tableProps.children) &&
              tableProps.children.map((elem) =>
                React.cloneElement(elem, {
                  key: `${data.id}-child1`,
                  data,
                  metadata: tableProps.metadata,
                })
              )}

            {selected?.indexOf(data.id) > -1 &&
              tableProps.metadata &&
              tableProps.children &&
              !Array.isArray(tableProps.children) &&
              React.cloneElement(tableProps.children, {
                key: `${data.id}-child2`,
                data,
                metadata: tableProps.metadata,
              })}
          </Fragment>
        );
      })}
    </StyledTable>
  );
}
