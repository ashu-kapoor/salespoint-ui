import { DataContainer } from "./styled-elements/app-styles";

export default function LoadingDisplay({ children }: { children: string }) {
  return (
    <DataContainer
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "#bcbc8b",
      }}
    >
      {children}
    </DataContainer>
  );
}
