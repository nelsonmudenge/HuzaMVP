// lib/github-storage.js
// ============================================================
// Upload images to a public GitHub repo for free CDN hosting.
// Requires: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO env vars.
// ============================================================

const GITHUB_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN;

/**
 * Upload a file (as base64) to GitHub and return the raw CDN URL.
 * @param {File} file - Browser File object
 * @param {string} folder - Subfolder in repo (e.g., 'properties/abc123')
 * @returns {Promise<string>} Raw GitHub URL for the uploaded image
 */
export async function uploadImageToGitHub(file, folder = 'uploads') {
  // Convert file to base64
  const base64 = await fileToBase64(file);
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const path = `${folder}/${filename}`;

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
        message: `Upload property image: ${filename}`,
        content: base64,
        branch: BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`GitHub upload failed: ${err.message}`);
  }

  const data = await response.json();
  // Return the raw CDN URL (accessible without auth)
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
}

/**
 * Delete an image from GitHub by its path
 * @param {string} path - File path in repo
 * @param {string} sha - File SHA (required by GitHub API to delete)
 */
export async function deleteImageFromGitHub(path, sha) {
  await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Delete image: ${path}`,
      sha,
      branch: BRANCH,
    }),
  });
}

/** Convert File to base64 string */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Strip the data:image/...;base64, prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

/**
 * Client-side alternative: upload via Next.js API route
 * (Use this from browser components to keep token server-side)
 */
export async function uploadImageViaAPI(file, propertyId) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', `properties/${propertyId}`);

  const res = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  const { url } = await res.json();
  return url;
}
