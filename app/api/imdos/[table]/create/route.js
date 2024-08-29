import { generateServerToken } from "@/lib/token";
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
    const serverToken = await generateServerToken();

    const apiRequest = await fetch(process.env.API_ENDPOINT + "create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-TOKEN": serverToken },
      body: JSON.stringify({
        table: table,
        data: [data],
        validation: JSON.parse(payloads.get("validation")),
      }),
    });

    const apiResponse = await apiRequest.json();
    console.log(apiResponse);
    if (!apiRequest.ok) {
      return NextResponse.json({ error: apiResponse.message }, { status: 500 });
    }

    return NextResponse.json({ message: apiResponse.message }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while creating record" },
      { status: 500 }
    );
  }
}
