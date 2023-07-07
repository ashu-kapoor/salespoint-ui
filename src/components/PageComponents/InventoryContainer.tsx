import { useState } from "react";
import {
  SearchInventoryDocument,
  SearchInventoryInput,
} from "../../generated/graphql";
import SearchForm from "../GenericComponents/SearchForm";
import { Table } from "../GenericComponents/Table";
import {
  PageContainerProperties,
  TableData,
  TableHOFProperties,
} from "../GenericComponents/Types";
import {
  DataContainer,
  ContainerHeader,
  Divider,
} from "../GenericComponents/styled-elements/app-styles";
import AddInventoryForm from "./AddInventoryForm";
import { useQuery } from "@apollo/client";
import UpdateInventoryForm from "./UpdateInventoryForm";

const testHeaders = [
  { header: "ID", fieldName: "id", width: "20rem" },
  {
    header: "Product Name",
    fieldName: "productName",
    width: "20rem",
  },
  { header: "Price", fieldName: "price" },
  { header: "Quantity", fieldName: "quantity" },
  {
    header: "Status",
    fieldName: "status" /*renderMethod: (data: string)=>{
    if(data==="low"){
      return ();
    }else{
      return ();
    }
  }*/,
  },
];

const testData = [
  {
    id: 1,
    productName: "Product 1",
    price: "24",
    quantity: "34",
    status: "low",
  },
  {
    id: 2,
    productName: "Very Long Super Product name 2",
    price: "25",
    quantity: "35",
    status: "low",
  },
  {
    id: 3,
    productName: "Product 3",
    price: "26",
    quantity: "36",
    status: "high",
  },
  {
    id: 4,
    productName: "Product 4",
    price: "27",
    quantity: "37",
    status: "low",
  },
];

export function InventoryContainer(props: PageContainerProperties) {
  let [inventoryInput, setInventoryInput] = useState<SearchInventoryInput>({});

  function inventorySearchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let searchInventoryInput: SearchInventoryInput = {};
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
      searchInventoryInput.fields = freeTextFields;
      searchInventoryInput.searchTerm = searchTerm;
    }

    if (filter !== "") {
      searchInventoryInput.filter = filter;
    }

    setInventoryInput(searchInventoryInput);

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
        <AddInventoryForm metaData={props.metadata} />
      </ContainerHeader>
      <Divider isThick={true} />
      <SearchForm
        metaData={props.metadata}
        onSearch={inventorySearchHandler}
      ></SearchForm>
      <Divider isThick={true} />
      <InventoryTable
        searchInput={inventoryInput}
        metadata={props.metadata}
        headerName={props.headerName}
      />
    </DataContainer>
  );
}

function InventoryTable(props: TableHOFProperties) {
  const { loading, error, data } = useQuery(SearchInventoryDocument, {
    variables: { inventoryInput: props.searchInput },
  });

  if (loading) return <>"Loding"</>;
  if (error) return <>"Error"</>;

  let tableData: TableData[] = [];

  data?.searchInventory?.forEach((item) => {
    tableData.push({
      id: item.id,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      status: item.quantity < 10 ? "red" : "green",
    });
  });

  return (
    <Table
      //key={props.key}
      headers={testHeaders}
      //data={testData} Uncomment for local testing
      data={tableData}
      margin={"1rem"}
      metadata={props.metadata}
      headerName={props.headerName}
    >
      <UpdateInventoryForm />
    </Table>
  );
}
