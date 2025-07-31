import ContactForm from "../../Components/ContactForm";
import PageHeader from "../../Components/PageHeader";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ContactsService from "../../services/ContactsService";
import Loader from "../../Components/Loader";
import toast from "../../utils/toast";

export default function EditContact() {
  const [isLoading, setIsloading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contact);
        setIsloading(false);
        setContactName(contact.name);
      } catch {
        history.push("/");
        toast({
          type: "danger",
          text: "Contato não encontrado!",
        });
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit(formData) {}

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? "Carregando..." : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
