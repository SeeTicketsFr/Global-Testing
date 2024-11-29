import DrawerDialog from "@/components/shared-components/Card/DrawerDialog";
import { buttonVariants } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "react-code-blocks";
import { dracula } from "react-code-blocks";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExplanationComplemetary1 from '@/public/images/ExplanationComplementary_1.png'
import Link from "next/link";

export default function ImportationExplanation() {
    const response = `{
        "statusCode": 200,
        "headers": {
            "set-cookie": [
                "BEARER=ABearerToken",
                "refresh_token=aRefreshToken"
            ],
        },
        "content": {
            "user": {
                "id": "1eed6207-25f4-6750-93fb-6760933b6587",
            },
            "price": 100,
            "taxes": 20
        }
    }`;

    const importations = [
        {
            id: 1,
            importation: (
                <div className={`w-full  ${buttonVariants({ variant: 'outline' })}`}>
                    <p>{'<<v:scenario:url>>'}</p>
                </div>
            ),
            result: (
                <div className={`w-full  ${buttonVariants({ variant: 'outline' })}`}>
                    <p>{'https://api.domain.com'}</p>
                </div>
            ),
            complementary: (
                <Image
                    src={ExplanationComplemetary1}
                    width={500}
                    height={200}
                    alt="complementary data"
                />
            )
        },
        {
            id: 2,
            importation: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<r:steps[2]:content[user][id]>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<r:steps[2]:headers[set-cookie][0]>>'}</p>
                    </div>
                </div>
            ),
            result: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'1eed6207-25f4-6750-93fb-6760933b6587'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'aBearerToken'}</p>
                    </div>
                </div>
            ),
            complementary: (
                <CodeBlock
                    text={response}
                    language={'json'}
                    showLineNumbers={true}
                    theme={dracula}
                />
            ),
        },
        {
            id: 3,
            importation: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<f:name>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<f:email>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<f:uuid>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>...</p>
                    </div>
                </div>
            ),
            result: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>Gérard Dupont</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>jess.polo@gmail.com</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>1eed6207-25f4-6750-93fb-6760983d5179</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>...</p>
                    </div>
                </div>
            ),
            complementary: (
                
                <Link
                    className={buttonVariants({ variant: 'outline' })}
                    href='https://fakerphp.org/'
                    passHref={true}
                >
                    Available methods
                </Link>
            )
        },
        {
            id: 4,
            importation: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<now:default>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<now:Europe/Paris,Y-m-d>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<now:TimeZone:Format>>'}</p>
                    </div>
                </div>
            ),
            result: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>2024-09-20T09:11:51.842Z</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>2024-09-20</p>
                    </div>
                </div>
            ),
        },
        {
            id: 5,
            importation: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<o:-:3:2>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<o:+:3:2>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<o:/:3:2>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<o:*:3:-2>>'}</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>{'<<o:+:<<r:steps[2]:content[price]>>:<<r:steps[2]:content[taxes]>>>>'}</p>
                    </div>
                </div>
            ),
            result: (
                <div className="flex flex-col gap-2">
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>1</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>5</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>1.5</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>-6</p>
                    </div>
                    <div className={` ${buttonVariants({ variant: 'outline' })}`}>
                        <p>120</p>
                    </div>
                </div>
            ),
        },
    ];

    const [open, setOpen] = useState<boolean>(false);
    const tHelp = useTranslations('help');

    return (
        <DrawerDialog
            open={open}
            setOpen={setOpen}
            triggerChildren={
                <div className="flex justify-start items-center gap-2 w-fit">
                    <CircleHelp color="grey" className="h-4 w-4" />
                    <h1 className="text-xs font-semibold" style={{ color: 'grey' }}>
                        {tHelp('data_importation_title')}
                    </h1>
                </div>
            }
            headerTitleChildren={
                <div className="w-full h-full flex items-center space-x-2">
                    <CircleHelp className="h-5 w-7" />
                    <h1 className="text-xl font-bold">{tHelp('data_importation_title')}</h1>
                </div>
            }
            footerChildren={
                <ScrollArea className="h-[60vh] w-[90vw] [&>div>div[style]]:!block">
                    <div className="rounded-md sm:border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{tHelp('importations')}</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead>{tHelp('result')}</TableHead>
                                    <TableHead>{tHelp('complementary_data')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {importations.map((importation) => (
                                    <TableRow key={importation.id}>
                                        <TableCell className="font-medium">{importation.importation}</TableCell>
                                        <TableCell>{'=>'}</TableCell>
                                        <TableCell className="font-medium">{importation.result}</TableCell>
                                        {importation.complementary && (
                                            <TableCell>{importation.complementary}</TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </ScrollArea>
            }
        />
    );
}
