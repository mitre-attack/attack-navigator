// declaration merging workaround for msSaveOrOpenBlob function that was
// marked for removal as a non-standard feature due to the removal of IE support
// msSaveorOpenBlob removal issued: https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1029
// workaround pulled from: https://github.com/microsoft/TypeScript/issues/45612
interface Navigator {
    msSaveOrOpenBlob: (blobOrBase64: Blob | string, filename: string) => boolean
} 
