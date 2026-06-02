declare module "pdf-parse/lib/pdf-parse" {
  import { Result } from "pdf-parse";

  function pdfParse(
    dataBuffer: Buffer | Uint8Array,
    options?: Record<string, unknown>
  ): Promise<Result>;

  export default pdfParse;
}
