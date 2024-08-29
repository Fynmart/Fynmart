import { generateServerToken, verifyJWT } from "@/lib/token";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const payloads = await request.formData();
    const { table } = params;

    let data = {};
    let fileUploaded = null;

    const skippedKeys = [
      "fileDestination",
      "fileUpload",
      "fileValidation",
      "validation",
      "table",
      "refId",
    ];

    if (payloads.get("fileUpload") && !fileUploaded) {
      const uploadRequest = await fetch(
        process.env.API_ENDPOINT + "file-upload.php",
        {
          method: "POST",
          body: payloads,
        }
      );
      const uploadResponse = await uploadRequest.json();
      if (!uploadRequest.ok) {
        return NextResponse.json(
          { error: uploadResponse.message },
          { status: 500 }
        );
      }
      fileUploaded = uploadResponse;
    }

    for (const [name, value] of Array.from(payloads.entries())) {
      if (!skippedKeys.includes(name)) {
        data[name] = value;
      }
    }

    for (const key in fileUploaded) {
      if (fileUploaded.hasOwnProperty(key)) {
        data[key] = fileUploaded[key];
      }
    }

    const token = request.cookies.get("access-token")?.value || undefined;
    await verifyJWT(token);

    const serverToken = await generateServerToken();
    const apiRequest = await fetch(process.env.API_ENDPOINT + "update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-TOKEN": serverToken },
      body: JSON.stringify({
        table: table,
        validation: JSON.parse(payloads.get("validation")),
        data: [data],
        conditions: [{ on: "id", type: "=", value: payloads.get("refId") }],
      }),
    });

    const apiResponse = await apiRequest.json();

    if (!apiRequest.ok) {
      return NextResponse.json({ error: apiResponse.message }, { status: 500 });
    }

    return NextResponse.json({ message: apiResponse.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while updating record" },
      { status: 500 }
    );
  }
}
