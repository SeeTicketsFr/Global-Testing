import { useTranslations } from "next-intl";

export default function Description() {
    const tHome = useTranslations('home.description');

    return (
      <section className="flex flex-col justify-center items-center md:px-24 px-8">
          <span className="pointer-events-none whitespace-pre-wrap text-center text-xl font-bold">
            {tHome('title')}
          </span>
          <span className="pointer-events-none whitespace-pre-wrap text-center md:text-6xl text-5xl font-bold">
            {tHome('description')}
          </span>
      </section>
    );
  }