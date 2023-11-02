import { useLazyQuery } from "@apollo/client";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { SearchInventoryDocument } from "../../../generated/graphql";
import { AutoSuggestInput } from "../../GenericComponents/AutoSuggestInput";
import {
  SuggestiveInputProps,
  SuggestiveInputState,
  SuggestiveOptions,
} from "../../GenericComponents/Types";

export function InventoryAutoInput(props: SuggestiveInputProps) {
  const { dataKeyName, label } = props;

  const [inputState, setInputState] = useState<SuggestiveInputState>({
    inputValue: "",
    selectedId: "",
    showOptions: true,
  });
  const [getInventory, { loading, error, data }] = useLazyQuery(
    SearchInventoryDocument
  );

  useEffect(() => {
    const getData = setTimeout(() => {
      //fetch the data

      if (inputState.showOptions && inputState.inputValue.length >= 1) {
        getInventory({
          variables: {
            inventoryInput: {
              fields: ["productName"],
              searchTerm: inputState.inputValue,
            },
          },
        });
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [inputState, dataKeyName, getInventory]);

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

  let optionData: SuggestiveOptions[] = [];

  data?.searchInventory?.forEach((opt) => {
    optionData.push({ data: opt.productName, id: opt.id });
  });

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
