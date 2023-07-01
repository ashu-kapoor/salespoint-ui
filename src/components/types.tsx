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
}
