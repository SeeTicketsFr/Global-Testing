import { useTranslations } from "next-intl"

export function Footer() {
    const tHome = useTranslations('home.footer');

    return (
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {tHome('built_by')}{" "}
            <span
              className="font-medium underline underline-offset-4"
            >
              See Tickets France
            </span>
            . {tHome('source_code')}{" "}
            <a
              href={"https://github.com/SeeTicketsFr/Global-Testing"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Github
            </a>
            .
          </p>
        </div>
      </footer>
    )
  }