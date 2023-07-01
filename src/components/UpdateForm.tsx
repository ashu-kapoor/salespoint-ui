import { FormInput } from "./FormInput";
import { DataContainer } from "./styled-elements/app-styles";
import {
  Button,
  FlexCenterDiv,
  Form,
  FormRow,
} from "./styled-elements/forms-styles";
import { UpdateFormProps } from "./types";
import { FormContextProvider, useForms } from "../contexts/FormContext";

export default function UpdateForm(props: UpdateFormProps) {
  return (
    <FormContextProvider>
      <UpdateFormWithoutState data={props.data} metadata={props.metadata} />
    </FormContextProvider>
  );
}

function UpdateFormWithoutState(props: UpdateFormProps) {
  const formState = useForms();
  return (
    <DataContainer>
      <Form>
        <FormRow className="formRow">
          {props.metadata.map((metadata) => {
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
            >
              Update
            </Button>
          </FlexCenterDiv>
        </FormRow>
      </Form>
    </DataContainer>
  );
}
