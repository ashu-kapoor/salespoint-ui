import {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import {
  AutoSuggestInputState,
  FormInputProps,
  SuggestiveInputEventProps,
  SuggestiveInputProps,
  SuggestiveInputState,
  SuggestiveOptions,
} from "./Types";
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
import { useLazyQuery } from "@apollo/client";
import { SearchInventoryDocument } from "../../generated/graphql";

export function AutoSuggestInput(props: SuggestiveInputEventProps) {
  const {
    label,
    inputValue,
    handleClick,
    handleChange,
    error,
    loading,
    showOptions,
    optionData,
    dataKeyName,
    selectedId,
  } = props;

  return (
    <InputParent
      className="formInput"
      style={{
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <InputLabel show={true}>{label}</InputLabel>

      <InputWrapper>
        <StyledInput
          id={`${dataKeyName}-input`}
          data-selectedId={selectedId}
          type="text"
          valid={true}
          readOnly={false}
          onChange={handleChange}
          value={inputValue}
        />
        <InputFieldSet hidden={true}>
          <Legend>
            <LegendSpan>Error</LegendSpan>
          </Legend>
        </InputFieldSet>
      </InputWrapper>
      {error && "Error loading data"}
      {loading && "Fetching options"}
      {showOptions && optionData && (
        <Options options={optionData} handleClick={handleClick} />
      )}
      <InputErrorDisplay />
    </InputParent>
  );
}

function Options({
  options,
  handleClick,
}: {
  options?: SuggestiveOptions[];
  handleClick: MouseEventHandler<HTMLLIElement>;
}) {
  return (
    <ul
      className="options"
      style={{
        position: "absolute",
        top: "4rem",

        zIndex: "99",
        /* top: 100%; */
        left: "-2rem",
        right: "0",
        listStyleType: "none",
      }}
    >
      {options?.map((options) => {
        return (
          <li
            data-id={options.id}
            data-value={options.data}
            key={options.id}
            onClick={handleClick}
            style={{
              cursor: "pointer",
              border: "rgb(224, 224, 224)",
              padding: "5px",
              borderTop: "none",
              backgroundColor: "rgb(202 205 223)",
            }}
          >
            {options.data}
          </li>
        );
      })}
    </ul>
  );
}
