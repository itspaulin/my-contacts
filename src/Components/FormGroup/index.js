import PropTypes from "prop-types";
import { Contanier } from "./styles";

export default function FormGroup({ children, error }) {
  return (
    <Contanier>
      {children}
      {error && <small> {error} </small>}
    </Contanier>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
};
