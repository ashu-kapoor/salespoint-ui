import {
  UpdateFormMetadata,
  ValidatonFunction,
} from "../components/GenericComponents/Types";
import AppDrawer from "../components/GenericComponents/AppDrawer";
import { InventoryContainer } from "../components/PageComponents/Inventory/InventoryContainer";

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
      <InventoryContainer
        headerName="Products"
        metadata={inventoryUpdateMetadata}
      />
    </>
  );
}
