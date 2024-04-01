import { createWriteStream, promises as fsPromises } from "fs";
import { join } from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  let sessionEmail;
  if (session?.user) {
    let sessionUser = session.user;
    if (sessionUser.email) {
      sessionEmail = sessionUser.email;
    }
  }

  const accountObject = await db.user.findUnique({
    where: { email: sessionEmail },
  });
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return new Response("No file found in form data.", { status: 400 });
  }

  try {
    // Define the directory path where you want to save the file
    const directory = join(process.cwd(), "public", "custom-user-images");

    // Ensure the directory exists, create it if it doesn't
    await fsPromises.mkdir(directory, { recursive: true });

    // Define the file path
    const filePath = join(directory, sessionEmail! + ".png");

    // Create a write stream to save the file
    const writeStream = createWriteStream(filePath);

    // Read chunks from the file stream and write them to the write stream
    const reader = file.stream().getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      writeStream.write(value);
    }

    // Close the write stream to ensure all data is flushed
    writeStream.end();

    // File saved successfully
    return new Response("File saved successfully.", { status: 200 });
  } catch (error) {
    console.error("Error saving file:", error);
    return new Response("Error saving file.", { status: 500 });
  }
}
