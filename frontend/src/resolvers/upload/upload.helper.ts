import axios from 'axios';

export async function uploadFile(url: string, file?: File) {
  return axios.put(url, file);
}

export function splitFileName(fileName: string) {
  const fileNameParts = fileName.split('.');
  if (!fileNameParts.length) return { name: fileName };
  const extension = fileNameParts.pop();
  const name = fileNameParts.join('.');
  return { name, extension };
}

export function getExtensionValue(extension: string) {
  if (extension.toLowerCase() === 'png') return 'IMAGE_PNG';
  if (['jpeg', 'jpg'].includes(extension.toLowerCase())) return 'IMAGE_JPEG';
  return 'APPLICATION_PDF';
}
