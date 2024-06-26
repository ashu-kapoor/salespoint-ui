import { useState } from "react";
import {
  SearchCustomerDocument,
  SearchCustomerInput,
} from "../../../generated/graphql";
import SearchForm from "../../GenericComponents/SearchForm";
import { Table } from "../../GenericComponents/Table";
import {
  PageContainerProperties,
  TableData,
  TableHOFProperties,
  UpdateFormMetadata,
} from "../../GenericComponents/Types";
import {
  DataContainer,
  ContainerHeader,
  Divider,
} from "../../GenericComponents/styled-elements/app-styles";
import { useQuery } from "@apollo/client";
import AddCustomerForm from "./AddCustomerForm";
import UpdateCustomerForm from "./UpdateCustomerForm";
import { CustomerOrderTable } from "./CustomerOrderTable";
import UserService from "../../../security/UserService";
import ErrorDisplay from "../../GenericComponents/ErrorDisplay";
import LoadingDisplay from "../../GenericComponents/LoadingDisplay";

const headers = [
  { header: "ID", fieldName: "id", width: "20rem" },
  {
    header: "First Name",
    fieldName: "firstName",
    width: "10rem",
  },
  {
    header: "Last Name",
    fieldName: "lastName",
    width: "10rem",
  },
  {
    header: "Email",
    fieldName: "email",
    width: "20rem",
  },
  { header: "Amount", fieldName: "amount" },
];

const contactOrderMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "price",
    label: "Purchase Price",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "quantity",
    label: "Quantity",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "productName",
    label: "Product Name",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "status",
    label: "Order Status",
    readOnly: true,
    slider: false,
    freeText: false,
  },
];

export function ContactContainer(props: Readonly<PageContainerProperties>) {
  let [customerInput, setCustomerInput] = useState<SearchCustomerInput>({});

  function contactSearchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let searchCustomerInput: SearchCustomerInput = {};
    const elements = Array.from(event.currentTarget.elements).filter(
      (element) => element.id
    );

    let freeTextFields: string[] = [];
    props.metadata
      .filter((data) => data.freeText)
      .forEach((data) => freeTextFields.push(data.datKeyName));

    const searchTerm = (
      elements.find((elem) => elem.id.endsWith("search")) as HTMLInputElement
    )?.value;

    let filter: string = "";

    props.metadata
      .filter((data) => data.slider)
      .forEach((data) => {
        const selectElement = elements.find(
          (elem) => elem.id === `${data.datKeyName}-select`
        )! as HTMLSelectElement;
        const selectedMin = elements.find(
          (elem) => elem.id === `${data.datKeyName}-input-min`
        )! as HTMLInputElement;

        if (selectElement.value !== "default") {
          if (selectElement.value === "between") {
            const selectedMax = elements.find(
              (elem) => elem.id === `${data.datKeyName}-input-max`
            )! as HTMLInputElement;

            if (selectedMin.value) {
              filter = filter.concat(
                `${data.datKeyName}>${selectedMin.value};`
              );
            }

            if (selectedMax.value) {
              filter = filter.concat(
                `${data.datKeyName}<${selectedMax.value};`
              );
            }
          } else if (selectedMin.value) {
            filter = filter.concat(
              `${data.datKeyName}${selectElement.value}${selectedMin.value};`
            );
          }
        }
      });

    if (searchTerm) {
      searchCustomerInput.fields = freeTextFields;
      searchCustomerInput.searchTerm = searchTerm;
    }

    if (filter !== "") {
      searchCustomerInput.filter = filter;
    }

    setCustomerInput(searchCustomerInput);

    /*
      productName-search
quantity-select
quantity-input-min
price-select
price-input-min
      */
  }

  return (
    <DataContainer>
      <ContainerHeader>
        {props.headerName}
        <AddCustomerForm metaData={props.metadata} />
      </ContainerHeader>
      <Divider isThick={true} />
      <SearchForm
        metaData={props.metadata}
        onSearch={contactSearchHandler}
      ></SearchForm>
      <Divider isThick={true} />
      <ContactTable
        searchInput={customerInput}
        metadata={props.metadata}
        headerName={props.headerName}
      />
    </DataContainer>
  );
}

function ContactTable(props: Readonly<TableHOFProperties>) {
  const { loading, error, data } = useQuery(SearchCustomerDocument, {
    variables: { searchCustomerInput: props.searchInput },

    context: {
      headers: {
        authorization: UserService.getInstance().getToken()
          ? `Bearer ${UserService.getInstance().getToken()}`
          : "",
      },
    },
  });

  if (loading) return <LoadingDisplay>Loading..</LoadingDisplay>;
  if (error)
    return (
      <ErrorDisplay>{`${error.message} ${
        error.cause ? String(error.cause) : ""
      }`}</ErrorDisplay>
    );

  let tableData: TableData[] = [];

  data?.searchCustomer?.forEach((item) => {
    tableData.push({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      amount: item.amount,
    });
  });

  return (
    <Table
      //key={props.key}
      headers={headers}
      //data={testData} Uncomment for local testing
      data={tableData}
      margin={"1rem"}
      metadata={props.metadata}
      headerName={props.headerName}
    >
      <UpdateCustomerForm />
      <CustomerOrderTable metadata={contactOrderMetadata} />
    </Table>
  );
}
