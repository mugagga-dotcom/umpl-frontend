/**
 * Upload Service
 * Handles multipart file uploads to the backend /api/media/upload endpoint.
 * Uploaded files are stored under static/uploads/ on the server.
 */

const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

/**
 * Upload a single image/video file to the backend.
 * Returns the media record from the server including the `url` field
 * (e.g. "/static/uploads/<uuid>_filename.jpg").
 *
 * @param {File} file - The file object from an <input type="file"> or drag-and-drop.
 * @param {function} [onProgress] - Optional callback(percent: number) for upload progress.
 * @returns {Promise<{url: string, filename: string, id: number, media_type: string}>}
 */
export async function uploadFile(file, onProgress) {
  const token = localStorage.getItem('token');

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        reject(new Error('Session expired. Redirecting to login...'));
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch {
          reject(new Error('Invalid server response'));
        }
      } else {
        let msg = `Upload failed (${xhr.status})`;
        try {
          const err = JSON.parse(xhr.responseText);
          msg = err.error || msg;
        } catch {
          // ignore parse failure
        }
        reject(new Error(msg));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

    xhr.open('POST', `${API_URL}/media/upload`);
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    xhr.send(formData);
  });
}

/**
 * Convert a relative backend path to a full URL.
 * e.g. "/static/uploads/abc123_photo.jpg" → "http://127.0.0.1:5000/static/uploads/abc123_photo.jpg"
 *
 * @param {string} url
 * @returns {string}
 */
export function resolveMediaUrl(url) {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:')
  ) {
    return url;
  }

  // Only prepend backend URL for files actually in the uploads directory
  if (url.includes('/static/uploads/') || url.startsWith('static/uploads/')) {
    const base = API_URL.replace('/api', '');
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
  }

  // For existing frontend images (like /photo.jpeg), leave them as is
  return url;
}

export default { uploadFile, resolveMediaUrl };
