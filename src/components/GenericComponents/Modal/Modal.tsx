import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { ModalProperties } from "../Types";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Backdrop(props: ModalProperties) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

function ModalOverlay(props: ModalProperties) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById("overlays")!;

export function Modal(props: ModalProperties) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
