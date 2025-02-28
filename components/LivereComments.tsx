import { useEffect } from 'react';

const LivereComments = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 라이브리 초기화 함수
    const loadLivere = () => {
      if (typeof (window as any).LivereTower === 'function') return;

      const script = document.createElement('script');
      script.src = 'https://cdn-city.livere.com/js/embed.dist.js';
      script.async = true;

      document.body.appendChild(script);
    };

    // 옵저버로 실제 화면에 나타날 때만 로드
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadLivere();
        observer.disconnect(); // 한 번 로드되면 더 안 봐도 됨
      }
    });

    const target = document.getElementById('lv-container');
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="lv-container"
      data-id="city"
      data-uid="MTAyMC82MDQyOS8zNjg5OQ=="
      style={{ minHeight: '300px' }} // 최소 높이 강제 설정 (꼭 필요)
    >
      <noscript>라이브리 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
    </div>
  );
};

export default LivereComments;
