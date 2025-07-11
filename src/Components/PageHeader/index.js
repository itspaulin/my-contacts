import { Link } from "react-router-dom";
import arrow from "../../assets/images/icons/arrow.svg";
import { Container } from "./styles";
import PropTypes from "prop-types";

export default function PageHeader({ title }) {
  return (
    <Container>
      <a href="/">
        <img src={arrow} alt="Back" />
        <span>Voltar</span>
      </a>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
