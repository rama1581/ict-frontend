import React from 'react';
import { usePageCache } from './PageCacheProvider';

export default function CachedRoute({ cacheKey, children }) {
  const cachedElement = usePageCache(cacheKey, children);
  return cachedElement;
}
