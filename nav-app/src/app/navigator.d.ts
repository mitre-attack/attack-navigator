// declaration merging workaround for msSaveBlob function that was
// marked for removal as a non-standard feature due to the removal of IE support
// msSaveBlob removal issued: https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1029
// workaround pulled from: https://github.com/microsoft/TypeScript/issues/45612
interface Navigator {
    msSaveBlob?: (blob: Blob, defaultName?: string) => boolean;
} 
