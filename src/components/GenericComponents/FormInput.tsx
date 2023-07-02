import { useState } from "react";
import { FormInputProps, InputState } from "./Types";
import {
  InputErrorDisplay,
  InputFieldSet,
  InputLabel,
  InputParent,
  InputWrapper,
  Legend,
  LegendSpan,
  StyledInput,
} from "./styled-elements/forms-styles";
import { useFormsDispatch } from "../../contexts/FormContext";

export function FormInput(props: FormInputProps) {
  const { metadata, data, id, dontShowLable } = props;

  const [value, setValue] = useState<InputState>({
    data: data?.[metadata.datKeyName],
    valid: true,
  });
  const formDispatch = useFormsDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let isValid = true;
    if (metadata.validationFunction) {
      isValid = metadata.validationFunction(value);
    }
    if (isValid) {
      formDispatch({ type: "SET_VALID", elementId: event.target.id });
    } else {
      formDispatch({ type: "SET_INVALID", elementId: event.target.id });
    }
    setValue({ data: value, valid: isValid });
  };

  return (
    <InputParent key={metadata.datKeyName} className="formInput">
      <InputLabel show={dontShowLable ? false : true}>
        {metadata.label}
      </InputLabel>

      <InputWrapper>
        <StyledInput
          id={id}
          type="text"
          valid={value.valid}
          readOnly={metadata.readOnly}
          onChange={(event) => handleChange(event)}
          value={value.data}
        />
        <InputFieldSet hidden={value.valid}>
          <Legend>
            <LegendSpan>Error</LegendSpan>
          </Legend>
        </InputFieldSet>
      </InputWrapper>
      <InputErrorDisplay>
        {!value.valid && metadata.errorMessage}
      </InputErrorDisplay>
    </InputParent>
  );
}
