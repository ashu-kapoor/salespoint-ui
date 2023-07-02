import { Fragment, useState } from "react";
import { CheckBox } from "./styled-elements/app-styles";
import {
  DataColumn,
  HeaderColumn,
  StyledTable,
  TableHeaderRow,
} from "./styled-elements/table-styles";
import UpdateForm from "./UpdateForm";
import { TableProperties } from "./Types";

export function Table(tableProps: TableProperties) {
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
                    {data[header.fieldName]}
                  </DataColumn>
                );
              })}
            </TableHeaderRow>

            {selected?.indexOf(data.id) > -1 && tableProps.metadata && (
              <UpdateForm
                key={`${data.id}-updateForm`}
                data={data}
                metadata={tableProps.metadata}
              />
            )}
          </Fragment>
        );
      })}
    </StyledTable>
  );
}
