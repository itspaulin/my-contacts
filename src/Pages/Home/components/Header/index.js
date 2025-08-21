import { Container } from "./styles";
import PropTypes from "prop-types";

export default function Header({ hasError, qtyContacts, qtyFilteredContacts }) {
  const alignment = hasError
    ? "flex-end"
    : qtyContacts > 0
    ? "space-between"
    : "center";

  return (
    <Container justifyContent={alignment}>
      {!hasError && qtyContacts > 0 && (
        <strong>
          {qtyFilteredContacts}
          {qtyFilteredContacts === 1 ? " contato" : " contatos"}
        </strong>
      )}
      <a href="/new">Novo contato</a>
    </Container>
  );
}

Header.propyTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyContacts: PropTypes.number.isRequired,
  qtyFilteredContacts: PropTypes.number.isRequired,
};
