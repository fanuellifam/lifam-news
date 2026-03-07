'use client';

import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `https://lifamin.site${url}`; // Adjust if your domain is different
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <span className="text-sm text-muted-foreground">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full hover:bg-gray-100 transition relative"
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
