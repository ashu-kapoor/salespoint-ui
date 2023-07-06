import { useForms } from "../../contexts/FormContext";
import { FormInput } from "./FormInput";
import { AddFormInput } from "./Types";
import { DataContainer } from "./styled-elements/app-styles";
import {
  FormRow,
  FlexCenterDiv,
  Button,
  Form,
} from "./styled-elements/forms-styles";

export function AddFormWithoutContext(props: AddFormInput) {
  const formState = useForms();

  return (
    <DataContainer>
      <Form onSubmit={props.onSubmit}>
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
