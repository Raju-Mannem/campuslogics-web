import { useState, useRef } from 'react';
import { Image as PImage } from '@prisma/client';
import Image from 'next/image';
import { useLoader } from '@/context/LoaderContext';

interface ImageUploadProps {
  onImageSelect: (image: PImage) => void
  selectedImage?: PImage
}

export default function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [images, setImages] = useState<PImage[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showLoader, hideLoader } = useLoader();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    showLoader();

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', file.name)

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const newImage = await response.json()
        setImages(prev => [newImage, ...prev])
        onImageSelect(newImage)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
      hideLoader();
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const fetchImages = async () => {
    showLoader();
    try {
      const response = await fetch('/api/images')
      const imageData = await response.json()
      setImages(imageData)
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      hideLoader();
    }
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this image?')) return;

    showLoader();
    try {
      const response = await fetch(`/api/images/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== id));
        if (selectedImage?.id === id) {
          // onImageSelect(null)
        }
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error', error);
      alert('Error deleting image');
    } finally {
      hideLoader();
    }
  }

  const replacementIdRef = useRef<number | null>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    replacementIdRef.current = id;
    replaceInputRef.current?.click();
  }

  const handleReplaceFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const id = replacementIdRef.current;

    if (!file || !id) return;

    setUploading(true);
    showLoader();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/images/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedImage = await response.json();
        setImages(prev => prev.map(img => img.id === id ? updatedImage : img));
        // If this was selected, notify parent of update
        if (selectedImage?.id === id) {
          onImageSelect(updatedImage);
        }
      } else {
        alert('Failed to replace image');
      }
    } catch (error) {
      console.error('Replace error:', error);
      alert('Error replacing image');
    } finally {
      setUploading(false);
      replacementIdRef.current = null;
      if (replaceInputRef.current) replaceInputRef.current.value = '';
      hideLoader();
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          onChange={handleReplaceFile}
          disabled={uploading}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload New Image'}
        </button>

        <button
          type="button"
          onClick={fetchImages}
          className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Load Uploaded Images
        </button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`group relative border-2 rounded-lg cursor-pointer overflow-hidden ${selectedImage?.id === image.id ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-200 hover:border-gray-400'
                }`}
              onClick={() => onImageSelect(image)}
            >
              <Image
                src={image.url}
                alt={image.name}
                width={200}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 bg-white">
                <p className="text-xs truncate font-medium text-gray-700">{image.name}</p>
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => handleReplaceClick(e, image.id)}
                  className="p-1.5 bg-white text-blue-600 rounded shadow hover:bg-blue-50"
                  title="Replace Image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleDelete(e, image.id)}
                  className="p-1.5 bg-white text-red-600 rounded shadow hover:bg-red-50"
                  title="Delete Image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}