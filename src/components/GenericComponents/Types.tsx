import { ApolloError } from "@apollo/client";
import { FormEventHandler, MouseEventHandler, ReactNode } from "react";
import { JsxElement } from "typescript";

export interface UpdateFormData {
  [key: string]: string | number;
}

export interface UpdateFormMetadata {
  datKeyName: string;
  label: string;
  readOnly: boolean;
  validationFunction?: ValidatonFunction;
  errorMessage?: String;
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
  data: UpdateFormData;
  metadata: UpdateFormMetadata[];
}

export interface InputState {
  data: string | number | undefined;
  valid: boolean;
}

export interface SearchBarInput {
  metaData?: UpdateFormMetadata[];
  onSearch?: FormEventHandler<HTMLFormElement>;
}

export interface PageContainerProperties {
  headerName: string;
  metadata: UpdateFormMetadata[];
}

export interface InventoryContainerChildProperties
  extends PageContainerProperties {
  error: ApolloError | undefined;
  tableData: TableData[];
}

export interface TableProperties extends PageContainerProperties {
  headers: {
    header: string;
    width?: string;
    fieldName: string;
    renderMethod?: RenderFunction;
  }[];
  data: TableData[];
  width?: string;
  margin?: string;
}

export type RenderFunction = (data: number) => JsxElement;

export interface TableData {
  [key: string]: any;
}

export interface ModalProperties {
  children?: ReactNode;
  onClose?: MouseEventHandler;
  onClick?: MouseEventHandler;
}
