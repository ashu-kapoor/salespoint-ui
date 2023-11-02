import { useLazyQuery } from "@apollo/client";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { SearchCustomerDocument } from "../../../generated/graphql";
import { AutoSuggestInput } from "../../GenericComponents/AutoSuggestInput";
import {
  SuggestiveInputProps,
  SuggestiveInputState,
  SuggestiveOptions,
} from "../../GenericComponents/Types";

export function CustomerAutoInput(props: SuggestiveInputProps) {
  const { dataKeyName, label } = props;

  const [inputState, setInputState] = useState<SuggestiveInputState>({
    inputValue: "",
    selectedId: "",
    showOptions: true,
  });
  const [getCustomer, { loading, error, data }] = useLazyQuery(
    SearchCustomerDocument
  );

  let optionData: SuggestiveOptions[] = [];

  data?.searchCustomer?.forEach((opt) => {
    optionData.push({ data: opt.email, id: opt.id });
  });

  useEffect(() => {
    const getData = setTimeout(() => {
      //fetch the data

      if (inputState.showOptions && inputState.inputValue.length >= 1) {
        getCustomer({
          variables: {
            searchCustomerInput: {
              fields: ["email"],
              searchTerm: inputState.inputValue,
            },
          },
        });
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [inputState, dataKeyName, getCustomer]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputState({
      inputValue: event.target.value,
      selectedId: "",
      showOptions: true,
    });
  }

  function handleClick(event: MouseEvent<HTMLLIElement>): void {
    const element = event.target as HTMLLIElement;

    setInputState({
      inputValue: element.dataset.value!,
      selectedId: element.dataset.id!,
      showOptions: false,
    });
  }

  return (
    <AutoSuggestInput
      inputValue={inputState.inputValue}
      dataKeyName={dataKeyName}
      label={label}
      handleChange={handleChange}
      handleClick={handleClick}
      optionData={optionData}
      error={error}
      loading={loading}
      showOptions={inputState.showOptions}
      selectedId={inputState.selectedId}
    />
  );
}
