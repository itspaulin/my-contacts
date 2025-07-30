import ContactForm from "../../Components/ContactForm";
import PageHeader from "../../Components/PageHeader";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactsService from "../../services/ContactsService";
import Loader from "../../Components/Loader";
import toast from "../../utils/toast";

export default function EditContact() {
  const [isLoading, setIsloading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        console.log({ contactData });
        setIsloading(false);
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
      <PageHeader title="Editar Luiz Paulo" />
      <ContactForm buttonLabel="Salvar Alterações" onSubmit={handleSubmit} />
    </>
  );
}
