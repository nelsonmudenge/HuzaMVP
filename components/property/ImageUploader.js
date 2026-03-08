'use client';
// components/property/ImageUploader.js
// ============================================================
// Drag-and-drop image uploader that sends images to GitHub
// via the /api/upload-image server route
// ============================================================

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function ImageUploader({ propertyId, onImagesChange, maxImages = 8 }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const remaining = maxImages - images.length;
    const filesToProcess = acceptedFiles.slice(0, remaining);

    setUploading(true);
    const newImages = [];

    for (const file of filesToProcess) {
      try {
        // Preview URL for immediate feedback
        const previewUrl = URL.createObjectURL(file);
        const tempId = Date.now() + Math.random();
        setImages(prev => [...prev, { id: tempId, url: previewUrl, status: 'uploading', name: file.name }]);

        // Upload via API route (keeps GitHub token server-side)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', `properties/${propertyId || 'draft'}`);

        const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
        const { url } = await res.json();

        setImages(prev => prev.map(img =>
          img.id === tempId ? { ...img, url, status: 'done' } : img
        ));
        newImages.push(url);
      } catch (err) {
        console.error('Upload failed:', err);
        setImages(prev => prev.map(img =>
          img.status === 'uploading' ? { ...img, status: 'error' } : img
        ));
      }
    }

    const allUrls = [...images.filter(i => i.status === 'done').map(i => i.url), ...newImages];
    onImagesChange(allUrls);
    setUploading(false);
  }, [images, propertyId, maxImages, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading || images.length >= maxImages,
  });

  function removeImage(id) {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    onImagesChange(updated.filter(i => i.status === 'done').map(i => i.url));
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {images.length < maxImages && (
        <motion.div
          {...getRootProps()}
          animate={{ scale: isDragActive ? 1.02 : 1 }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-primary-500 bg-primary-50 dropzone-active'
              : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ y: isDragActive ? -5 : 0 }}
              className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center"
            >
              {uploading ? (
                <Loader2 size={28} className="text-primary-500 animate-spin" />
              ) : (
                <Upload size={28} className="text-primary-500" />
              )}
            </motion.div>
            <div>
              <p className="font-semibold text-gray-700">
                {isDragActive ? 'Drop images here!' : 'Drag & drop property images'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                or <span className="text-primary-500 font-semibold">click to browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, WebP up to 5MB • {images.length}/{maxImages} uploaded
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
              >
                <Image src={img.url} alt={img.name} fill className="object-cover" />

                {/* Upload Status Overlay */}
                {img.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 size={24} className="text-white animate-spin" />
                  </div>
                )}
                {img.status === 'done' && (
                  <div className="absolute top-2 left-2 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                )}
                {img.status === 'error' && (
                  <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Failed</span>
                  </div>
                )}

                {/* First image badge */}
                {i === 0 && img.status === 'done' && (
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Cover</div>
                )}

                {/* Remove button */}
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} className="text-white" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
