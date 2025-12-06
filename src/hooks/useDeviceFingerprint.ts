import { useEffect, useState } from 'react';

// Generate a simple device fingerprint based on browser characteristics
const generateFingerprint = (): string => {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    !!navigator.cookieEnabled,
    navigator.hardwareConcurrency || 'unknown',
  ];
  
  // Create a simple hash from the components
  const fingerprint = components.join('|');
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36);
};

const getDeviceName = (): string => {
  const ua = navigator.userAgent;
  
  if (/iPhone|iPad|iPod/.test(ua)) {
    return 'iOS Device';
  } else if (/Android/.test(ua)) {
    return 'Android Device';
  } else if (/Windows/.test(ua)) {
    return 'Windows PC';
  } else if (/Mac/.test(ua)) {
    return 'Mac';
  } else if (/Linux/.test(ua)) {
    return 'Linux PC';
  }
  
  return 'Unknown Device';
};

export const useDeviceFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');

  useEffect(() => {
    // Get or generate fingerprint
    let storedFingerprint = localStorage.getItem('device_fingerprint');
    
    if (!storedFingerprint) {
      storedFingerprint = generateFingerprint();
      localStorage.setItem('device_fingerprint', storedFingerprint);
    }
    
    setFingerprint(storedFingerprint);
    setDeviceName(getDeviceName());
  }, []);

  return { fingerprint, deviceName };
};
