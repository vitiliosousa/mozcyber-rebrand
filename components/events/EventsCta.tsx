import PageCta from "@/components/animations/PageCta";

export default function EventsCta() {
  return (
    <PageCta
      eyebrow="Participa"
      title={
        <>
          Queres organizar ou{" "}
          <span className="font-black text-moz-teal">propor</span> um evento?
        </>
      }
      description="Se tens um tema, um espaço ou uma ideia para a comunidade, fala connosco. Valorizamos quem quer contribuir."
      links={[
        { href: "/contacto", label: "Contactar", primary: true },
        { href: "/sobre", label: "Sobre a Mozcyber" },
      ]}
    />
  );
}
