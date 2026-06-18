export type VideoPlatform =
  | 'youtube'
  | 'vimeo'
  | 'tella'
  | 'vidyard'
  | 'wistia'
  | 'file';

export function resolveVideo(
  url: string,
  explicitType?: VideoPlatform,
): { kind: 'iframe' | 'video'; embedUrl: string } {
  const isFile =
    explicitType === 'file' ||
    /\.(mp4|webm|ogg)(\?|$)/i.test(url) ||
    (url.startsWith('/') && !/youtube|vimeo|tella|vidyard|wistia/i.test(url));

  if (isFile) {
    return { kind: 'video', embedUrl: url };
  }

  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (youtubeMatch || explicitType === 'youtube') {
    const id = youtubeMatch?.[1] ?? url.split('/').pop();
    return {
      kind: 'iframe',
      embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch || explicitType === 'vimeo') {
    const id = vimeoMatch?.[1] ?? url.split('/').pop();
    return {
      kind: 'iframe',
      embedUrl: `https://player.vimeo.com/video/${id}`,
    };
  }

  const wistiaMatch = url.match(/wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/([a-z0-9]+)/i);
  if (wistiaMatch || explicitType === 'wistia') {
    const id = wistiaMatch?.[1] ?? url.split('/').pop();
    return {
      kind: 'iframe',
      embedUrl: `https://fast.wistia.net/embed/iframe/${id}`,
    };
  }

  const vidyardMatch = url.match(
    /(?:play|share)\.vidyard\.com\/(?:watch\/)?([a-zA-Z0-9_-]+)/,
  );
  if (vidyardMatch || explicitType === 'vidyard') {
    const id = vidyardMatch?.[1] ?? url.split('/').pop();
    return {
      kind: 'iframe',
      embedUrl: `https://play.vidyard.com/${id}`,
    };
  }

  const isTella =
    explicitType === 'tella' ||
    url.includes('tella.tv') ||
    url.includes('effektdigital.no');

  if (isTella) {
    const base = url
      .replace(/\/embed\/?$/, '')
      .replace(/\/view\/?$/, '')
      .replace(/\/?$/, '');
    return { kind: 'iframe', embedUrl: `${base}/embed` };
  }

  if (
    url.includes('youtube.com/embed') ||
    url.includes('player.vimeo.com') ||
    url.includes('fast.wistia.net/embed') ||
    url.includes('play.vidyard.com')
  ) {
    return { kind: 'iframe', embedUrl: url };
  }

  return { kind: 'video', embedUrl: url };
}
