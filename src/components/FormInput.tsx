import { useState } from "react";
import { FormInputProps, InputState } from "./types";
import { useFormsDispatch } from "../contexts/FormContext";

export function FormInput(props: FormInputProps) {
  const { metadata, data, id, dontShowLable } = props;

  const [value, setValue] = useState<InputState>({
    data: data && data[metadata.datKeyName],
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
    <div
      key={metadata.datKeyName}
      className="formInput"
      style={{ margin: "2rem" }}
    >
      <label
        style={{
          fontWeight: "700",
          visibility: dontShowLable ? "hidden" : "visible",
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
        <input
          id={id}
          type="text"
          style={{
            display: "block",
            zIndex: "10",
            padding: "0.5rem",
            border: value.valid ? "3px solid rgb(98, 107, 179)" : "none",
          }}
          //defaultValue={data && data[metadata.datKeyName]}
          readOnly={metadata.readOnly}
          onChange={(event) => handleChange(event)}
          value={value.data}
        />
        <fieldset
          hidden={value.valid}
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
      >
        {!value.valid && metadata.errorMessage}
      </p>
    </div>
  );
}
