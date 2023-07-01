import { UpdateFormMetadata, ValidatonFunction } from "../components/types";
import AppDrawer from "./AppDrawer";
import { PageContainer } from "./PageContainer";

const productValidator: ValidatonFunction = (data) => {
  if (data && data.length > 0 && isNaN(+data)) {
    return true;
  } else {
    return false;
  }
};

const amountValidator: ValidatonFunction = (data) => {
  if (data && !isNaN(+data) && parseFloat(data) > 0) {
    return true;
  } else {
    return false;
  }
};

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

const inventoryUpdateMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "productName",
    label: "Product Name",
    readOnly: false,
    validationFunction: productValidator,
    errorMessage: "Invalid Product Name",
    slider: false,
    freeText: true,
  },
  {
    datKeyName: "price",
    label: "Price",
    readOnly: false,
    validationFunction: amountValidator,
    errorMessage: "Invalid price",
    slider: true,
    freeText: false,
  },
  {
    datKeyName: "quantity",
    label: "Quantity",
    readOnly: false,
    slider: true,
    freeText: false,
  },
];

export function InventoryPage() {
  return (
    <>
      <AppDrawer />
      <PageContainer
        headerName="Products"
        headers={testHeaders}
        data={testData}
        //width={"52rem"} //52rem
        //margin={"18vw"} //14rem
        margin={"1rem"}
        metadata={inventoryUpdateMetadata}
      />
    </>
  );
}
