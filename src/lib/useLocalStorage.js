import { useEffect, useState } from 'react';

/** localStorage 에 동기화되는 상태 (SSR/차단 환경에서도 안전) */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : saved;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* 사생활 보호 모드 등에서 저장 실패는 무시 */
    }
  }, [key, value]);

  return [value, setValue];
}
