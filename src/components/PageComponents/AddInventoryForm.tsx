import { Form } from "react-router-dom";
import { FormContextProvider, useForms } from "../../contexts/FormContext";
import { FormInput } from "../GenericComponents/FormInput";
import { SearchBarInput } from "../GenericComponents/Types";
import { DataContainer } from "../GenericComponents/styled-elements/app-styles";
import {
  FormRow,
  FlexCenterDiv,
  Button,
} from "../GenericComponents/styled-elements/forms-styles";
import { useState } from "react";
import Modal from "../GenericComponents/Modal/Modal";

export default function AddInventoryForm(props: SearchBarInput) {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsVisible(false);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsVisible(true);
  };

  return (
    <>
      {isVisible && (
        <Modal onClose={onClose}>
          <FormContextProvider>
            <AddInventoryFormWithoutState metaData={props.metaData} />
          </FormContextProvider>
        </Modal>
      )}
      {!isVisible && (
        <form action="/inventory" onSubmit={() => alert("test")}>
          <Button
            enabled={true}
            type="button"
            onMouseUp={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onClick(event);
            }}
          >
            Add
          </Button>
        </form>
      )}
    </>
  );
}

function AddInventoryFormWithoutState(props: SearchBarInput) {
  const formState = useForms();
  return (
    <DataContainer>
      <Form>
        <FormRow className="formRow">
          {props.metaData
            ?.filter((metadata) => metadata.datKeyName.toLowerCase() !== "id")
            .map((metadata) => {
              return (
                <FormInput
                  id={`${metadata.datKeyName}-input`}
                  key={`${metadata.datKeyName}-input`}
                  metadata={metadata}
                  data={{ [metadata.datKeyName]: "" }}
                />
              );
            })}
          <FlexCenterDiv>
            <Button
              disabled={!formState.formValid}
              enabled={formState.formValid}
            >
              Submit
            </Button>
          </FlexCenterDiv>
        </FormRow>
      </Form>
    </DataContainer>
  );
}
