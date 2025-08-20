import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "../../utils/toast";
import ContactsService from "../../services/ContactsService";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDelete, setContactBeingDelete] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDelete(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDelete(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDelete.id);

      toast({
        type: "success",
        text: "Contato deletado com sucesso!",
      });
      handleCloseDeleteModal();
      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDelete.id)
      );
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao deletar o contato!",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
