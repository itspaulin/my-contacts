import ReactDOM from "react-dom";
import { Overlay } from "./styles";
import PropTypes from "prop-types";

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById("loader-root")
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
