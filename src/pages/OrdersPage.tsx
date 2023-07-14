import AppDrawer from "../components/GenericComponents/AppDrawer";
import { OrderContainer } from "../components/PageComponents/Order/OrderContainer";
import { UpdateFormMetadata } from "../components/GenericComponents/Types";

const orderUpdateMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
];

export function OrdersPage() {
  return (
    <>
      <AppDrawer />
      <OrderContainer headerName="Products" metadata={orderUpdateMetadata} />
    </>
  );
}
