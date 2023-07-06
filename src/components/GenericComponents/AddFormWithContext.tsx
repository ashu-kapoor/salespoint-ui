import { FormContextProvider } from "../../contexts/FormContext";
import { AddFormWithoutContext } from "./AddFormWithoutContext";
import { Modal } from "./Modal/Modal";
import { ContainerHeader } from "./styled-elements/app-styles";
import { Button } from "./styled-elements/forms-styles";
import { AddFormInputWithContext } from "./Types";

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
        {error && <div>Error</div>}
        {loading && <div>Loading</div>}
        {dataPresent && (
          <div>Saved. Click outisde form to exit or continue adding</div>
        )}
      </Modal>
    );
  }
}
