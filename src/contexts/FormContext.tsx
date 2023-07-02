import React from "react";
import { createContext, useContext, useReducer } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type elementData = { id: string; valid: boolean };

interface FormState {
  formValid: boolean;
  elements: elementData[];
}

interface FormAction {
  type: "SET_VALID" | "SET_INVALID";
  elementId: string;
}

const FormContext = createContext<FormState>({ formValid: true, elements: [] });
const FormDispatchContext = createContext<React.Dispatch<FormAction>>(() => {});

export function FormContextProvider({ children }: { children: JSX.Element }) {
  const [formState, dispatch] = useReducer(tasksReducer, {
    formValid: true,
    elements: [],
  });

  return (
    <FormContext.Provider value={formState}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}

function tasksReducer(formState: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_VALID": {
      let elements = formState.elements;
      let formValid = formState.formValid;
      let updatedElements = elements
        .filter((ele) => ele?.id !== action.elementId)
        .concat({ id: action.elementId, valid: true });
      if (updatedElements.filter((elem) => elem?.valid === false).length > 0) {
        formValid = false;
      } else {
        formValid = true;
      }

      return {
        elements: [...updatedElements],
        formValid,
      };
    }
    case "SET_INVALID": {
      let elements = formState.elements;
      let updatedElements = elements
        .filter((ele) => ele?.id !== action.elementId)
        .concat({ id: action.elementId, valid: false });

      return {
        elements: updatedElements,
        formValid: false,
      };
    }
  }
}

export function useForms() {
  return useContext(FormContext);
}

export function useFormsDispatch() {
  return useContext(FormDispatchContext);
}
