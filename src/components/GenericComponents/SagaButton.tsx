import { useState, MouseEvent } from "react";
import { Button } from "./styled-elements/forms-styles";
import { ContainerHeader } from "./styled-elements/app-styles";
import { Modal } from "./Modal/Modal";
import { Table } from "./Table";
import { TableData, TableProperties, UpdateFormMetadata } from "./Types";
import { Saga } from "../../generated/graphql";

const orderUpdateMetadata: UpdateFormMetadata[] = [
  {
    datKeyName: "id",
    label: "Id",
    readOnly: true,
    slider: false,
    freeText: false,
  },
];

const sagaHeaders: TableProperties["headers"] = [
  {
    fieldName: "stepSequence",
    header: "Step Seq.",
    width: "2rem",
  },
  {
    fieldName: "channel",
    header: "Channel",
    width: "10rem",
  },
  {
    fieldName: "commands",
    header: "Commands",
    width: "12rem",
  },
  {
    fieldName: "stepStage",
    header: "Step Stage",
    width: "10rem",
  },
  {
    fieldName: "stepStatus",
    header: "Step Status",
    width: "10rem",
  },
  {
    fieldName: "reason",
    header: "Reason",
    width: "15rem",
  },
];

export function SagaButton({ data }: { data: Saga }) {
  const [isVisible, setIsVisible] = useState(false);

  let sagaData: TableData[] = [];
  let stepCount = 1;

  data?.steps?.forEach((step) => {
    sagaData.push({
      stepSequence: stepCount,
      channel: step.channel,
      commands: `${step.stepInfo.FORWARD.command} ${step.stepInfo.COMPENSATE?.command}`,
      stepStage: step.stepStage,
      stepStatus: step.stepStatus,
      reason: step.reason,
    });
    stepCount++;
  });

  function handleFormOpen(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();
    setIsVisible(true);
  }

  function handleFormClose(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsVisible(false);
  }

  if (!isVisible) {
    return (
      <Button
        enabled={true}
        type="button"
        onClick={handleFormOpen}
        style={{
          margin: "0.1rem",
          height: "2.5rem",
          fontSize: "x-small",
          fontWeight: "800",
        }}
      >
        View Details
      </Button>
    );
  } else {
    return (
      <Modal onClose={handleFormClose}>
        <ContainerHeader>Saga Details</ContainerHeader>
        <Table
          headers={sagaHeaders}
          data={sagaData}
          margin={"1rem"}
          metadata={orderUpdateMetadata}
          headerName="Saga"
        />
      </Modal>
    );
  }
}
