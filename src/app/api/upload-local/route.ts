import { cookies, headers } from "next/headers";
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const cloudName = 'dorimey3n';
const unsignedUploadPreset = 'doc_dorimey3n_example';

interface UploadResponse {
    data?:[]
}

export async function POST(request: Request): Promise<NextResponse> {
    const bucketName = 'images';
    const cookieStore = cookies();

    const file = await request.blob();
    const header = headers();
    const fileName = header.get("X-Vercel-Filename");

    const blob = await put(fileName || 'demo-file', file, {
        access: 'public',
    });
    return NextResponse.json(blob);

}
