import { FormInput } from "./FormInput";
import { DataContainer } from "./styled-elements/app-styles";
import {
  Button,
  FlexCenterDiv,
  Form,
  FormRow,
} from "./styled-elements/forms-styles";
import { UpdateFormProps, UpdateFormPropsWithContext } from "./Types";
import { FormContextProvider, useForms } from "../../contexts/FormContext";
import { useEffect, useState } from "react";

export default function UpdateForm(props: UpdateFormPropsWithContext) {
  const { error, loading, dataPresent, metadata, onSubmit, data } = props;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [error, loading, dataPresent]);

  return (
    <>
      <FormContextProvider>
        <UpdateFormWithoutState
          data={data}
          metadata={metadata}
          onSubmit={onSubmit}
        />
      </FormContextProvider>
      {showMessage && error && (
        <DataContainer
          style={{
            alignItems: "center",
            justifyContent: "center",
            background: "#853131",
          }}
        >
          {`Error: ${error.message}`}
        </DataContainer>
      )}
      {showMessage && loading && (
        <DataContainer
          style={{
            alignItems: "center",
            justifyContent: "center",
            background: "#bcbc8b",
          }}
        >
          Updating..
        </DataContainer>
      )}
      {showMessage && dataPresent && (
        <DataContainer
          style={{
            alignItems: "center",
            justifyContent: "center",
            background: "#8fac8f",
          }}
        >
          Updated
        </DataContainer>
      )}
    </>
  );
}

function UpdateFormWithoutState(props: UpdateFormProps) {
  const formState = useForms();
  return (
    <DataContainer>
      <Form onSubmit={props.onSubmit}>
        <FormRow className="formRow">
          {props.metadata?.map((metadata) => {
            return (
              <FormInput
                id={`${metadata.datKeyName}-input`}
                key={`${metadata.datKeyName}-input`}
                metadata={metadata}
                data={props.data}
              />
            );
          })}
          <FlexCenterDiv>
            <Button
              disabled={!formState.formValid}
              enabled={formState.formValid}
              type="submit"
            >
              Update
            </Button>
          </FlexCenterDiv>
        </FormRow>
      </Form>
    </DataContainer>
  );
}
