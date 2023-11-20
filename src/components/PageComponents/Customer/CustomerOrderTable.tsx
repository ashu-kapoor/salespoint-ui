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
import UserService from "../../../security/UserService";
import LoadingDisplay from "../../GenericComponents/LoadingDisplay";
import ErrorDisplay from "../../GenericComponents/ErrorDisplay";

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

export function CustomerOrderTable(props: Readonly<UpdateFormProps>) {
  const { loading, error, data } = useQuery(SearchSalesDocument, {
    variables: {
      searchSalesInput: {},
    },
    context: {
      headers: {
        authorization: UserService.getInstance().getToken()
          ? `Bearer ${UserService.getInstance().getToken()}`
          : "",
      },
    },
  });

  if (loading) return <LoadingDisplay>Loding..</LoadingDisplay>;
  if (error)
    return (
      <ErrorDisplay>{`${error.message} ${
        error.cause ? String(error.cause) : ""
      }`}</ErrorDisplay>
    );

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
