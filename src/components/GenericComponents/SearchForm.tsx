import React, { Fragment, useMemo } from "react";
import { FormInput } from "./FormInput";
import { DataContainer } from "./styled-elements/app-styles";
import {
  Button,
  FlexCenterDiv,
  Form,
  FormRow,
} from "./styled-elements/forms-styles";
import { SearchBarInput } from "./Types";
import { FormContextProvider, useForms } from "../../contexts/FormContext";
import { ValueFilterTwo } from "./ValueFilter";

export default function SearchForm(props: SearchBarInput) {
  return (
    <FormContextProvider>
      <SearchFormWithoutState
        metaData={props.metaData}
        onSearch={props.onSearch}
      />
    </FormContextProvider>
  );
}

function createFreeText(props: SearchBarInput) {
  return props?.metaData
    ?.filter((metadata) => metadata.freeText)
    .reduce(
      (previousValue, currentValue) => {
        return {
          ...previousValue,
          datKeyName:
            previousValue.datKeyName.length > 0
              ? `${previousValue.datKeyName},${currentValue.datKeyName}`
              : currentValue.datKeyName,
          label:
            previousValue.label.length > 0
              ? `${previousValue.label},${currentValue.label}`
              : currentValue.label,
        };
      },
      {
        datKeyName: "",
        freeText: true,
        label: "",
        readOnly: false,
        slider: false,
      }
    );
}

function SearchFormWithoutState(props: SearchBarInput) {
  const formState = useForms();

  const freeTextMetadata = useMemo(() => createFreeText(props), [props]);

  return (
    <DataContainer style={{ justifyContent: "center", maxHeight: "9rem" }}>
      <Form onSubmit={props.onSearch}>
        <FormRow className="formRow">
          {props?.metaData
            ?.filter((metadata) => metadata.slider)
            .concat(freeTextMetadata!)
            .reverse()
            .map((metadata) => {
              if (metadata.slider) {
                return (
                  <ValueFilterTwo
                    id={`${metadata.datKeyName}-search`}
                    key={`${metadata.datKeyName}-search`}
                    metadata={metadata}
                  />
                );
              } else if (metadata.freeText) {
                return (
                  <FormInput
                    id={`${metadata.datKeyName}-search`}
                    key={`${metadata.datKeyName}-search`}
                    metadata={{
                      ...metadata,
                      label: `Search ${metadata.label}`,
                    }}
                    data={{ [metadata.datKeyName]: "" }}
                  />
                );
              } else {
                return <Fragment key={`${metadata.datKeyName}-none`} />;
              }
            })}
          <FlexCenterDiv>
            <Button
              disabled={!formState.formValid}
              enabled={formState.formValid}
              type="submit"
            >
              Search
            </Button>
          </FlexCenterDiv>
        </FormRow>
      </Form>
    </DataContainer>
  );
}
