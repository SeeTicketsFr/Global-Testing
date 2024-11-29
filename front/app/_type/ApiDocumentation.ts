import { ApiDocumentation } from "@/services";

export interface ICurrentApiDocumentationFile extends ApiDocumentation {
    file: { [key: string]: any };
}