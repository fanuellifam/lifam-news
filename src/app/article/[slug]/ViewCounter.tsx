'use client';

import { useEffect } from 'react';

export default function ViewCounter({ articleId }: { articleId: number }) {
  useEffect(() => {
    fetch('/api/increment-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId }),
    }).catch((err) => {
      console.error('Failed to increment view count:', err);
    });
  }, [articleId]);

  return null;
}
