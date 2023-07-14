import { FormEventHandler, MouseEventHandler, ReactNode } from "react";
import {
  Saga,
  SearchCustomerInput,
  SearchInventoryInput,
} from "../../generated/graphql";
import { ApolloError } from "@apollo/client";

export interface UpdateFormData {
  [key: string]: string | number;
}

export interface UpdateFormMetadata {
  datKeyName: string;
  label: string;
  readOnly: boolean;
  validationFunction?: ValidatonFunction;
  errorMessage?: string;
  slider: boolean;
  freeText: boolean;
}

export type ValidatonFunction = (val: string | undefined) => boolean;

export interface FormInputProps {
  metadata: UpdateFormMetadata;
  data?: UpdateFormData;
  id: string;
  dontShowLable?: true;
}

export interface UpdateFormProps {
  data?: UpdateFormData;
  metadata?: UpdateFormMetadata[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export interface UpdateFormPropsWithContext extends UpdateFormProps {
  loading: boolean;
  error?: ApolloError;
  dataPresent: boolean;
}

export interface InputState {
  data: string | number | undefined;
  valid: boolean;
}

export interface SearchBarInput {
  metaData?: UpdateFormMetadata[];
  onSearch?: FormEventHandler<HTMLFormElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  header?: string;
}

export interface AddFormInput {
  metaData: UpdateFormMetadata[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export interface AddFormInputWithContext extends AddFormInput {
  header: string;
  isVisible: boolean;
  loading: boolean;
  error?: ApolloError;
  onModalOpenClick: (event: any) => void;
  onModalClose: (event: any) => void;
  dataPresent: boolean;
}

export interface PageContainerProperties {
  headerName: string;
  metadata: UpdateFormMetadata[];
}

export interface TableHOFProperties extends PageContainerProperties {
  searchInput: SearchInventoryInput | SearchCustomerInput;
}

// required non-null key prop
export interface WithKeyProps {
  key: React.Key;
}

export interface TableProperties extends PageContainerProperties {
  headers: {
    header: string;
    width?: string;
    fieldName: string;
    renderMethod?: RenderFunction<Saga>;
  }[];
  data: TableData[];
  width?: string;
  margin?: string;
}

export type RenderFunction<P> = (data: P) => React.JSX.Element;

export interface TableData {
  [key: string]: any;
}

export interface ModalProperties {
  children?: ReactNode;
  onClose?: MouseEventHandler;
  onClick?: MouseEventHandler;
}
