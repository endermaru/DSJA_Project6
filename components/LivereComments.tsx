import { useEffect } from 'react';

const LivereComments = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (typeof (window as any).LivereTower === 'function') return; // 이미 로드된 경우 중복 로드 방지

    const script = document.createElement('script');
    script.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    script.async = true;

    const container = document.getElementById('lv-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="lv-container"
      data-id="city"
      data-uid="MTAyMC82MDQyOS8zNjg5OQ=="
    >
      <noscript>라이브리 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
    </div>
  );
};

export default LivereComments;
