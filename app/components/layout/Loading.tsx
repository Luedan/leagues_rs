import { Image, Overlay } from "@mantine/core";
import "./styles.css";

const LoadingComp = () => (
  <Overlay
    color="#000"
    backgroundOpacity={0.35}
    blur={8}
    className="flex inset-0 items-center justify-center"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 2000,
      pointerEvents: "all", // Bloquea toda interacción
    }}
  >
    <div className="flex flex-col items-center">
      <Image src="/logo.png" w={96} className="animate-pulse mb-4" />
      <span className="loader"></span>
    </div>
  </Overlay>
);

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? <LoadingComp /> : null;
};
