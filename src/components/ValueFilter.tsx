import { useState } from "react";
import { FormInputProps } from "./types";
import { FormInput } from "./FormInput";

export function ValueFilterTwo(props: FormInputProps) {
  const { metadata } = props;
  const [inBetween, setInBetween] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.value === "between" ? setInBetween(true) : setInBetween(false);
  };

  return (
    <>
      <div
        key={metadata.datKeyName}
        className="formInput"
        style={{ margin: "2rem" }}
      >
        <label
          style={{
            fontWeight: "700",
            visibility: inBetween ? "hidden" : "visible",
          }}
        >
          {metadata.label}
        </label>
        <div
          style={{
            display: "flex",
            position: "relative",
            marginTop: "0.7rem",
            cursor: "text",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: "1.4375em",
            letterSpacing: "0.00938em",
            color: "rgba(0, 0, 0, 0.87)",
          }}
        >
          <select
            style={{
              //  marginRight: "1rem",
              //marginTop: "0.4rem",
              minHeight: "2.2rem",
              border: "3px solid rgb(98, 107, 179)",
            }}
            name={`${metadata.label}-select`}
            id={`${metadata.label}-select`}
            onChange={(event) => handleSelectChange(event)}
          >
            <option value="default"></option>
            <option value="<=">Less Than Equal To</option>
            <option value=">=">Greater Than Equal To</option>
            <option value=":=">Equal To</option>
            <option value="between">In Between</option>
          </select>
          <fieldset
            hidden={true}
            style={{
              position: "absolute",
              padding: "0px",
              //height: "2rem",
              //width: "11rem",
              inset: "-17px -6px -2px",
              borderColor: "rgb(211, 47, 47)",
            }}
          >
            <legend
              style={{
                float: "unset",
                fontSize: "0.75em",
              }}
            >
              <span style={{ color: "rgb(211, 47, 47)" }}>Error</span>
            </legend>
          </fieldset>
        </div>
        <p
          style={{
            margin: "2px 0px 0px 0px",
            textAlign: "center",
            fontSize: "smaller",
            color: "maroon",
          }}
        ></p>
      </div>

      <FormInput
        id={`${metadata.datKeyName}-input`}
        key={`${metadata.datKeyName}-input`}
        metadata={{ ...metadata, label: `Min ${metadata.label}` }}
        dontShowLable={inBetween ? undefined : true}
      />

      {inBetween && (
        <FormInput
          id={`${metadata.datKeyName}-input`}
          key={`${metadata.datKeyName}-input`}
          metadata={{ ...metadata, label: `Max ${metadata.label}` }}
        />
      )}
    </>
  );
}
