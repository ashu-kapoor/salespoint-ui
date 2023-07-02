import SearchForm from "../GenericComponents/SearchForm";
import { Table } from "../GenericComponents/Table";
import { PageContainerProperties } from "../GenericComponents/Types";
import {
  DataContainer,
  ContainerHeader,
  Divider,
} from "../GenericComponents/styled-elements/app-styles";
import AddInventoryForm from "./AddInventoryForm";

const testHeaders = [
  { header: "ID", fieldName: "id" },
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
  return (
    <>
      <DataContainer>
        <ContainerHeader>
          {props.headerName}
          <AddInventoryForm metaData={props.metadata} />
        </ContainerHeader>
        <Divider isThick={true} />
        <SearchForm metaData={props.metadata}></SearchForm>
        <Divider isThick={true} />
        <Table
          headers={testHeaders}
          data={testData}
          margin={"1rem"}
          metadata={props.metadata}
          headerName={props.headerName}
        />
      </DataContainer>
    </>
  );
}
