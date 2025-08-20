import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";
import useIsMounted from "../../hooks/useIsMounted";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import Presentantion from "./Presentation";

export default function Container() {
  const [isLoading, setIsloading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsloading(false);
          setContactName(contact.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push("/");
          toast({
            type: "danger",
            text: "Contato não encontrado!",
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);
      toast({
        type: "success",
        text: "Contato editado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao editar o contato!",
      });
    }
  }

  return (
    <Presentantion
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  );
}
