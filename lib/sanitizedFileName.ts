export const sanitizedFileName = (fileName: string): string => {
    return fileName.replace(/[^0-9a-zA-Z._-]/g, "_");
};