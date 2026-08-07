import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contacto | Mozcyber",
  description:
    "Fala com a Mozcyber — dúvidas, propostas de eventos e oportunidades de colaboração.",
};

export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
