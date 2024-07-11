import { stat, mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import * as dateFn from "date-fns";

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function uploadFile(file: any): Promise<string> {
  console.log(file)
  const buffer = Buffer.from(await file.arrayBuffer());
  const pathDist: string = join(process.cwd(), "/public/images");
  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-y")}`;
  const uploadDir = join(pathDist, relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      throw new Error("Error creating directory.");
    }
  }

  const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
  const fileExtension = extname(file.name);
  const originalFilename = file.name.replace(/\.[^/.]+$/, "");
  const sanitizedFilename = sanitizeFilename(originalFilename);
  const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
  await writeFile(`${uploadDir}/${filename}`, buffer);

  return `http://localhost:3000/images/${relativeUploadDir}/${filename}`;
}
