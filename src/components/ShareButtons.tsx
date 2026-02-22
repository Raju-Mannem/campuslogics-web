'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({
  url,
  title,
  description,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: description || title,
        url,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleNativeShare}
        className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:opacity-80"
      >
        Share
      </button>

      <a
        href={shareLinks.facebook}
        target="_blank"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Facebook
      </a>

      <a
        href={shareLinks.telegram}
        target="_blank"
        className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600"
      >
        Telegram
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
      >
        X
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        className="px-4 py-2 bg-blue-800 text-white rounded-lg text-sm hover:bg-blue-900"
      >
        LinkedIn
      </a>

      <a
        href={shareLinks.whatsapp}
        target="_blank"
        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
      >
        WhatsApp
      </a>

      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-gray-200 text-black rounded-lg text-sm hover:bg-gray-300"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}