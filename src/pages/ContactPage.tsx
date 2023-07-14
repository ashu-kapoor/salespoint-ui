import AppDrawer from "../components/GenericComponents/AppDrawer";
import {
  UpdateFormMetadata,
  ValidatonFunction,
} from "../components/GenericComponents/Types";
import { ContactContainer } from "../components/PageComponents/Customer/ContactContainer";

const nameValidator: ValidatonFunction = (data) => {
  if (data && data.length > 0 && isNaN(+data)) {
    return true;
  } else {
    return false;
  }
};

const emailValidator: ValidatonFunction = (data) => {
  if (data && data.length > 0 && isNaN(+data)) {
    return true;
  } else {
    return false;
  }
};

const amountValidator: ValidatonFunction = (data) => {
  if (data && !isNaN(+data) && parseFloat(data) > 0) {
    return true;
  } else {
    return false;
  }
};

const contactUpdateMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
  {
    datKeyName: "firstName",
    label: "First Name",
    readOnly: false,
    validationFunction: nameValidator,
    errorMessage: "Invalid First Name",
    slider: false,
    freeText: true,
  },

  {
    datKeyName: "lastName",
    label: "Last Name",
    readOnly: false,
    validationFunction: nameValidator,
    errorMessage: "Invalid Last Name",
    slider: false,
    freeText: true,
  },
  {
    datKeyName: "email",
    label: "Email",
    readOnly: false,
    validationFunction: emailValidator,
    errorMessage: "Invalid email",
    slider: false,
    freeText: true,
  },
  {
    datKeyName: "amount",
    label: "Credit",
    validationFunction: amountValidator,
    errorMessage: "Invalid amount",
    readOnly: false,
    slider: true,
    freeText: false,
  },
];

export function ContactPage() {
  return (
    <>
      <AppDrawer />
      <ContactContainer
        headerName="Contacts"
        metadata={contactUpdateMetadata}
      />
    </>
  );
}
