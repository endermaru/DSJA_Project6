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
    <div className="w-full overflow-hidden" style={{ height: '700px' }}>
      <div
        className="tableauPlaceholder"
        id="viz1740554677266"
        style={{ position: 'relative', width: '527px', height: '727px' }}
      >
        <noscript>
          <a href="#">
            <img
              alt="시군구별 요양기관 당 평균 환자수 분포"
              src="https://public.tableau.com/static/images/ma/map_17404720558950/Dashboard1/1_rss.png"
              style={{ border: 'none' }}
            />
          </a>
        </noscript>
        <object className="tableauViz w-full h-full">
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="map_17404720558950/Dashboard1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https://public.tableau.com/static/images/ma/map_17404720558950/Dashboard1/1.png"
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
