import { DataContainer } from "./styled-elements/app-styles";

export default function ErrorDisplay({ children }: { children: string }) {
  return (
    <DataContainer
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "#853131",
      }}
    >
      {children}
    </DataContainer>
  );
}
