import PageCta from "@/components/animations/PageCta";

export default function AboutCta() {
  return (
    <PageCta
      eyebrow="Junta-te"
      title={
        <>
          Pronto para fazer parte da{" "}
          <span className="font-black text-moz-teal">Mozcyber</span>?
        </>
      }
      description="Vê os próximos eventos, participa num workshop ou CTF, ou fala connosco se quiseres contribuir com a comunidade."
      links={[
        { href: "/eventos", label: "Ver eventos", primary: true },
        { href: "/contacto", label: "Contactar" },
      ]}
    />
  );
}
