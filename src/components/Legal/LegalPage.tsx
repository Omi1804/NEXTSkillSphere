type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: {
    title: string;
    body: string;
  }[];
};

const LegalPage = ({ eyebrow, title, intro, sections }: LegalPageProps) => {
  return (
    <main className="bg-[#f6f8fb] px-4 py-16 md:px-10">
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#057455]">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">{intro}</p>

        <div className="mt-10 grid gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
