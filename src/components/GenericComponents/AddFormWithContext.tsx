import { useEffect, useState } from "react";
import { FormContextProvider } from "../../contexts/FormContext";
import { AddFormWithoutContext } from "./AddFormWithoutContext";
import { Modal } from "./Modal/Modal";
import { ContainerHeader } from "./styled-elements/app-styles";
import { Button } from "./styled-elements/forms-styles";
import { AddFormInputWithContext } from "./Types";
import ErrorDisplay from "./ErrorDisplay";
import LoadingDisplay from "./LoadingDisplay";

export function AddFormWithContext(props: AddFormInputWithContext) {
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
          <AddFormWithoutContext
            onSubmit={props.onSubmit}
            metaData={props.metaData}
          />
        </FormContextProvider>
        {showMessage && error && <ErrorDisplay>{error.message}</ErrorDisplay>}
        {showMessage && loading && <LoadingDisplay>Loading</LoadingDisplay>}
        {showMessage && dataPresent && (
          <LoadingDisplay>
            Saved. Click outisde form to exit or continue adding
          </LoadingDisplay>
        )}
      </Modal>
    );
  }
}
