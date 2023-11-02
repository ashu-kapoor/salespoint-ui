import AppDrawer from "../components/GenericComponents/AppDrawer";
import { OrderContainer } from "../components/PageComponents/Order/OrderContainer";
import {
  UpdateFormMetadata,
  ValidatonFunction,
} from "../components/GenericComponents/Types";

const amountValidator: ValidatonFunction = (data) => {
  if (data && !isNaN(+data) && parseFloat(data) > 0) {
    return true;
  } else {
    return false;
  }
};

const orderUpdateMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "productId",
    label: "Product Id",
    readOnly: false,
    slider: false,
    freeText: true,
  },
  {
    datKeyName: "customerId",
    label: "Customer Id",
    readOnly: false,
    slider: false,
    freeText: true,
  },
  {
    datKeyName: "quantity",
    label: "Quantity",
    readOnly: false,
    slider: false,
    freeText: true,
    validationFunction: amountValidator,
  },
];

export function OrdersPage() {
  return (
    <>
      <AppDrawer />
      <OrderContainer headerName="Orders" metadata={orderUpdateMetadata} />
    </>
  );
}
