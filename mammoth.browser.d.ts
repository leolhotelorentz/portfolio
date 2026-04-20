declare module "mammoth/mammoth.browser" {
  type ConvertOptions = {
    arrayBuffer: ArrayBuffer;
  };

  type ConvertResult = {
    value: string;
    messages: Array<{ type: string; message: string }>;
  };

  const mammoth: {
    convertToHtml: (input: ConvertOptions) => Promise<ConvertResult>;
    extractRawText: (input: ConvertOptions) => Promise<ConvertResult>;
  };

  export default mammoth;
}
