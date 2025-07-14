declare module 'stringify-object' {
  interface Options {
    indent?: string;
    singleQuotes?: boolean;
    filter?: (obj: any, prop: string) => boolean;
    transform?: (obj: any, prop: string, originalResult: string) => string;
    inlineCharacterLimit?: number;
  }

  function stringify(obj: any, options?: Options): string;
  export = stringify;
}