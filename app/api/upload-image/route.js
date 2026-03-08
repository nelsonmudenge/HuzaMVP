// app/api/upload-image/route.js
// ============================================================
// Server-side GitHub image upload endpoint.
// Keeps GITHUB_TOKEN secure on the server (not exposed to client).
// ============================================================

import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Convert to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Sanitize filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
    const path = `${folder}/${filename}`;

    // Upload to GitHub
    if (!TOKEN || !OWNER || !REPO) {
      // Demo mode: return a placeholder URL if GitHub not configured
      return NextResponse.json({
        url: `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80`,
        path,
        demo: true,
      });
    }

    const response = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Upload: ${filename}`,
          content: base64,
          branch: BRANCH,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`GitHub error: ${err.message}`);
    }

    const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;

    return NextResponse.json({ url: rawUrl, path });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
