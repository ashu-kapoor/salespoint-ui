import { useQuery } from "@apollo/client";
import { Saga, SearchSalesDocument } from "../../../generated/graphql";
import { Table } from "../../GenericComponents/Table";
import {
  TableData,
  TableProperties,
  UpdateFormProps,
} from "../../GenericComponents/Types";
import {
  DataContainer,
  ContainerHeader,
  Divider,
} from "../../GenericComponents/styled-elements/app-styles";
import { SagaButton } from "../../GenericComponents/SagaButton";

const testHeaders: TableProperties["headers"] = [
  {
    fieldName: "id",
    header: "Id",
    width: "20rem",
  },
  {
    fieldName: "price",
    header: "Purchase Price",
  },
  {
    fieldName: "quantity",
    header: "Quantity",
  },
  {
    fieldName: "productName",
    header: "Product Name",
  },
  {
    fieldName: "status",
    header: "Order Status",
  },
  {
    fieldName: "saga",
    header: "Saga",
    renderMethod: (data: Saga) => {
      return <SagaButton data={data} />;
    },
  },
];

export function CustomerOrderTable(props: UpdateFormProps) {
  const { loading, error, data } = useQuery(SearchSalesDocument, {
    variables: {
      searchSalesInput: {},
    },
  });

  if (loading) return <>"Loding"</>;
  if (error) return <>"Error"</>;

  let tableData: TableData[] = [];

  data?.searchSales?.forEach((item) => {
    tableData.push({
      id: item.id,
      price: item.amount,
      quantity: item.quantity,
      productName: item.inventory?.productName,
      status: item.status,
      saga: item.saga,
    });
  });

  return (
    <DataContainer>
      <ContainerHeader>Orders</ContainerHeader>
      <Divider isThick={true} />
      <Table
        metadata={props.metadata!}
        headerName="Orders"
        headers={testHeaders}
        data={tableData}
      />
    </DataContainer>
  );
}
