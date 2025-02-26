// components/TableauEmbedded.tsx
import { useEffect } from 'react';

export default function TableauLineChart() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden" style={{ height: '500px' }}>
      <div
        className="tableauPlaceholder"
        id="viz1740449438989"
        style={{ position: 'relative', width: '700px', height: '527px' }}
      >
        <noscript>
          <a href="#">
            <img
              alt="2019~2023 주요 정신질환 환자수 추이 대시보드"
              src="https://public.tableau.com/static/images/li/line_number/20192023_1/1_rss.png"
              style={{ border: 'none' }}
            />
          </a>
        </noscript>
        <object className="tableauViz w-full h-full">
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="line_number/20192023_1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https://public.tableau.com/static/images/li/line_number/20192023_1/1.png"
          />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="ko-KR" />
        </object>
      </div>
    </div>
  );
}
