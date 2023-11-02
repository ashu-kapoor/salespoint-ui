import { useEffect, useState } from "react";
import { FormContextProvider, useForms } from "../../../contexts/FormContext";
import { FormInput } from "../../GenericComponents/FormInput";
import {
  AddFormInput,
  AddFormInputWithContext,
} from "../../GenericComponents/Types";
import {
  ContainerHeader,
  DataContainer,
} from "../../GenericComponents/styled-elements/app-styles";
import {
  FormRow,
  FlexCenterDiv,
  Button,
  Form,
} from "../../GenericComponents/styled-elements/forms-styles";
import { Modal } from "../../GenericComponents/Modal/Modal";
import { InventoryAutoInput } from "./InventoryAutoInput";
import { CustomerAutoInput } from "./CustomerAutoInput";

export function AddOrderFormContext(props: AddFormInputWithContext) {
  const {
    isVisible,
    onModalOpenClick,
    onModalClose,
    loading,
    error,
    dataPresent,
    header,
  } = props;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [error, loading, dataPresent]);

  if (!isVisible) {
    return (
      <Button
        enabled={true}
        type="button"
        onClick={onModalOpenClick}
        style={{ marginTop: "0px" }}
      >
        Add
      </Button>
    );
  } else {
    return (
      <Modal onClose={onModalClose}>
        <ContainerHeader>{header}</ContainerHeader>

        <FormContextProvider>
          <OrderForm onSubmit={props.onSubmit} metaData={props.metaData} />
        </FormContextProvider>
        {showMessage && error && <div>Error</div>}
        {showMessage && loading && <div>Loading</div>}
        {showMessage && dataPresent && (
          <div>Saved. Click outisde form to exit or continue adding</div>
        )}
      </Modal>
    );
  }
}

function OrderForm(props: AddFormInput) {
  const formState = useForms();

  const inputMetadata = props.metaData.filter(
    (m) => m.datKeyName === "quantity"
  )[0];

  return (
    <DataContainer>
      <Form onSubmit={props.onSubmit}>
        <FormRow className="formRow">
          <InventoryAutoInput label="Product Name" dataKeyName="inventoryId" />
          <CustomerAutoInput label="Customer Email" dataKeyName="customerId" />
          <FormInput
            metadata={inputMetadata!}
            id="quantity-input"
            data={{ quantity: "" }}
          />

          <FlexCenterDiv>
            <Button
              disabled={!formState.formValid}
              enabled={formState.formValid}
              type="submit"
            >
              Submit
            </Button>
          </FlexCenterDiv>
        </FormRow>
      </Form>
    </DataContainer>
  );
}
