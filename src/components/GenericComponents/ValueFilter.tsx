import { useState } from "react";
import { FormInputProps } from "./Types";
import { FormInput } from "./FormInput";
import {
  InputErrorDisplay,
  InputFieldSet,
  InputLabel,
  InputParent,
  InputWrapper,
  Legend,
  LegendSpan,
  Select,
} from "./styled-elements/forms-styles";

export function ValueFilterTwo(props: FormInputProps) {
  const { metadata } = props;
  const [inBetween, setInBetween] = useState(false);
  const [value, setValue] = useState("default");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.value === "between" ? setInBetween(true) : setInBetween(false);
    setValue(event.target.value);
  };

  return (
    <>
      <InputParent key={metadata.datKeyName} className="formInput">
        <InputLabel show={inBetween ? false : true}>
          {metadata.label}
        </InputLabel>

        <InputWrapper>
          <Select
            name={`${metadata.label}-select`}
            id={`${metadata.datKeyName}-select`}
            onChange={(event) => handleSelectChange(event)}
            value={value}
          >
            <option value="default"></option>
            <option value="<">Less Than</option>
            <option value=">">Greater Than</option>
            <option value="between">In Between</option>
          </Select>
          <InputFieldSet hidden={true}>
            <Legend>
              <LegendSpan>Error</LegendSpan>
            </Legend>
          </InputFieldSet>
        </InputWrapper>
        <InputErrorDisplay />
      </InputParent>

      <FormInput
        id={`${metadata.datKeyName}-input-min`}
        key={`${metadata.datKeyName}-input-min`}
        metadata={{ ...metadata, label: `Min ${metadata.label}` }}
        dontShowLable={inBetween ? undefined : true}
        data={{ [metadata.datKeyName]: "" }}
      />

      {inBetween && (
        <FormInput
          id={`${metadata.datKeyName}-input-max`}
          key={`${metadata.datKeyName}-input-max`}
          metadata={{ ...metadata, label: `Max ${metadata.label}` }}
          data={{ [metadata.datKeyName]: "" }}
        />
      )}
    </>
  );
}
