import { useState } from "react";
import {
  Saga,
  SearchSalesDocument,
  SearchSalesInput,
} from "../../../generated/graphql";
import SearchForm from "../../GenericComponents/SearchForm";
import { Table } from "../../GenericComponents/Table";
import {
  PageContainerProperties,
  TableData,
  TableHOFProperties,
  TableProperties,
  UpdateFormMetadata,
} from "../../GenericComponents/Types";
import {
  DataContainer,
  ContainerHeader,
  Divider,
} from "../../GenericComponents/styled-elements/app-styles";
import { useQuery } from "@apollo/client";
import AddOrderForm from "./AddOrderForm";
import { SagaButton } from "../../GenericComponents/SagaButton";
import UserService from "../../../security/UserService";
import LoadingDisplay from "../../GenericComponents/LoadingDisplay";
import ErrorDisplay from "../../GenericComponents/ErrorDisplay";

const searchFormMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
];

const orderHeaders: TableProperties["headers"] = [
  {
    fieldName: "id",
    header: "Id",
    width: "15rem",
  },
  {
    fieldName: "price",
    header: "Price",
  },
  {
    fieldName: "quantity",
    header: "Quantity",
  },
  {
    fieldName: "productName",
    header: "Product Name",
    width: "12rem",
  },
  {
    fieldName: "customerName",
    header: "Customer Name",
    width: "15rem",
  },
  {
    fieldName: "email",
    header: "Email",
    width: "12rem",
  },
  {
    fieldName: "status",
    header: "Status",
  },

  {
    fieldName: "saga",
    header: "Saga",
    renderMethod: (data: Saga) => {
      return <SagaButton data={data} />;
    },
  },
];

export function OrderContainer(props: Readonly<PageContainerProperties>) {
  let [salesInput, setSalesInput] = useState<SearchSalesInput>({});

  function salesSearchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let searchSalesInput: SearchSalesInput = {};
    const elements = Array.from(event.currentTarget.elements).filter(
      (element) => element.id
    );

    let freeTextFields: string[] = [];

    const searchTerm = (
      elements.find((elem) => elem.id.endsWith("search")) as HTMLInputElement
    )?.value;

    if (searchTerm) {
      searchSalesInput.fields = freeTextFields;
      searchSalesInput.searchTerm = searchTerm;
    }
    setSalesInput(searchSalesInput);
  }

  return (
    <DataContainer>
      <ContainerHeader>
        {props.headerName}
        <AddOrderForm metaData={props.metadata} />
      </ContainerHeader>
      <Divider isThick={true} />
      <SearchForm
        metaData={searchFormMetadata}
        onSearch={salesSearchHandler}
      ></SearchForm>
      <Divider isThick={true} />
      <OrderTable
        searchInput={salesInput}
        metadata={props.metadata}
        headerName={props.headerName}
      />
    </DataContainer>
  );
}

function OrderTable(props: Readonly<TableHOFProperties>) {
  const { loading, error, data } = useQuery(SearchSalesDocument, {
    variables: { searchSalesInput: props.searchInput },
    context: {
      headers: {
        authorization: UserService.getInstance().getToken()
          ? `Bearer ${UserService.getInstance().getToken()}`
          : "",
      },
    },
  });

  // if (loading) return <>"Loding"</>;
  // if (error) return <>"Error"</>;

  if (loading) return <LoadingDisplay>Loading..</LoadingDisplay>;
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
      customerName: `${item.customer?.firstName} ${item.customer?.lastName}`,
      email: item.customer?.email,
      saga: item.saga,
    });
  });

  return (
    <Table
      //key={props.key}
      headers={orderHeaders}
      //data={testData} Uncomment for local testing
      data={tableData}
      margin={"1rem"}
      metadata={props.metadata}
      headerName={props.headerName}
    />
  );
}
