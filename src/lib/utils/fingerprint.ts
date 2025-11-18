// lib/utils/fingerprint.js

let thumbmarkLoadPromise = null;
let isThumbmarkLoaded = false;

function loadThumbmarkScript() {
  if (thumbmarkLoadPromise) return thumbmarkLoadPromise;

  thumbmarkLoadPromise = new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.ThumbmarkJS) {
      isThumbmarkLoaded = true;
      resolve(window.ThumbmarkJS);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@thumbmarkjs/thumbmarkjs/dist/thumbmark.umd.js';
    script.async = true;
    script.onload = () => {
      isThumbmarkLoaded = true;
      resolve(window.ThumbmarkJS);
    };
    script.onerror = () => reject(new Error('Failed to load ThumbmarkJS'));
    document.head.appendChild(script);
  });

  return thumbmarkLoadPromise;
}

export async function getDeviceFingerprint() {
  try {
    const ThumbmarkJS = await loadThumbmarkScript();

    const tm = new ThumbmarkJS.Thumbmark({
      exclude: ['math', 'permissions'],
      stabilize: ['private', 'iframe'],
      log: false
    });

    const result = await tm.get();
    const browserName = await getBrowserName();
    const osInfo = getOSInfo();

    return {
      thumbmark: result.thumbmark,
      confidence: result.confidence || 'high',
      metadata: {
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        browserName: browserName,
        osName: osInfo.osName,
        osVersion: osInfo.osVersion,
        platform: navigator.platform
      }
    };
  } catch (error) {
    console.error('Fingerprint generation failed:', error);

    // Return fallback data
    return {
      thumbmark: null,
      confidence: 'none',
      error: error.message,
      metadata: {
        timestamp: new Date().toISOString(),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform
      }
    };
  }
}

async function isBraveBrowser() {
  if (navigator.brave && await navigator.brave.isBrave()) {
    return true;
  }
  return false;
}

async function getBrowserName() {
  const ua = navigator.userAgent;

  // Check Brave first
  if (await isBraveBrowser()) {
    return 'Brave';
  }
  // Arc Browser
  else if (ua.includes('Arc/')) {
    return 'Arc';
  }
  // Vivaldi
  else if (ua.includes('Vivaldi/')) {
    return 'Vivaldi';
  }
  // Opera
  else if (ua.includes('OPR/') || ua.includes('Opera/')) {
    return 'Opera';
  }
  // Edge
  else if (ua.includes('Edg/')) {
    return 'Edge';
  }
  // Samsung Internet
  else if (ua.includes('SamsungBrowser/')) {
    return 'Samsung Internet';
  }
  // UC Browser
  else if (ua.includes('UCBrowser/')) {
    return 'UC Browser';
  }
  // Yandex
  else if (ua.includes('YaBrowser/')) {
    return 'Yandex';
  }
  // Chrome
  else if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
    return 'Chrome';
  }
  // Firefox
  else if (ua.includes('Firefox/')) {
    return 'Firefox';
  }
  // Safari
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    return 'Safari';
  }

  return 'Unknown';
}

function getOSInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  let osName = 'Unknown';
  let osVersion = 'Unknown';

  // Windows
  if (ua.includes('Windows NT 10.0')) {
    osName = 'Windows';
    osVersion = '10/11';
  } else if (ua.includes('Windows NT 6.3')) {
    osName = 'Windows';
    osVersion = '8.1';
  } else if (ua.includes('Windows NT 6.2')) {
    osName = 'Windows';
    osVersion = '8';
  } else if (ua.includes('Windows NT 6.1')) {
    osName = 'Windows';
    osVersion = '7';
  }
  // macOS
  else if (ua.includes('Mac OS X') || platform.includes('Mac')) {
    osName = 'macOS';
    osVersion = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
  }
  // Linux
  else if (ua.includes('Linux') && !ua.includes('Android')) {
    osName = 'Linux';
  }
  // ChromeOS
  else if (ua.includes('CrOS')) {
    osName = 'ChromeOS';
  }
  // Android
  else if (ua.includes('Android')) {
    osName = 'Android';
    osVersion = ua.match(/Android (\d+\.\d+)/)?.[1] || 'Unknown';
  }
  // iOS
  else if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) {
    osName = ua.includes('iPad') ? 'iPadOS' : 'iOS';
    osVersion = ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
  }

  return {
    osName,
    osVersion,
    platform: navigator.platform
  };
}
