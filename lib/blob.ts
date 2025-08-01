import { put, del, list } from '@vercel/blob';

export async function uploadImage(file: File, filename: string): Promise<string> {
  const blob = await put(filename, file, {
    access: 'public',
  });
  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}

export async function listImages(): Promise<string[]> {
  const { blobs } = await list();
  return blobs.map(blob => blob.url);
}
