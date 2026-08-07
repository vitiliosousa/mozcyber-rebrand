import PostForm from "@/components/blog/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Novo artigo</h1>
      <p className="mt-3 text-moz-muted">
        Guarda como rascunho ou envia para revisão do administrador.
      </p>
      <div className="mt-10">
        <PostForm />
      </div>
    </div>
  );
}
