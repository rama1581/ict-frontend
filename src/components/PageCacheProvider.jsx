// src/components/PageCacheProvider.js
import React, { createContext, useContext, useRef } from 'react';

// Context type: ref object
const PageCacheContext = createContext(null);

export function PageCacheProvider({ children }) {
  const cacheRef = useRef({});

  return (
    <PageCacheContext.Provider value={cacheRef}>
      {children}
    </PageCacheContext.Provider>
  );
}

// HOOK dipisah dan diekspor stabil
export function usePageCache(key, element) {
  const cacheRef = useContext(PageCacheContext);

  if (!cacheRef.current[key]) {
    cacheRef.current[key] = element;
  }

  return cacheRef.current[key];
}
