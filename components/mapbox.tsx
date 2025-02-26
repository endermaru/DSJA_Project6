import { useEffect, useState, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const MapBox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/endermaru/cm7ld6py5004o01ssgl3jhewv',
    });

    map.current.on('style.load', () => {
      setLoaded(true);
      map.current?.setFilter('hospitals_highlight', ['==', 'id', '']);
    });

    // hospitals 레이어 클릭 이벤트 추가
    map.current.on('click', 'hospitals', (e) => {
      if (!e.features || e.features.length === 0) return;

      const hospitalId = e.features[0].properties?.id; // 클릭한 병원의 ID 가져오기
      if (!hospitalId) return;

      setSelectedHospital(hospitalId);

      // hospitals_highlight 레이어 필터 설정 (선택한 ID만 표시)
      map.current?.setFilter('hospitals_highlight', ['==', 'id', hospitalId]);

      // 병원 위치 가져오기 (geometry.type 확인 후 처리)
      const geometry = e.features[0].geometry;

      if (geometry.type === 'Point') {
        const pointGeometry = geometry as GeoJSON.Point;
        const coordinates = pointGeometry.coordinates;

        // 배열 길이가 2인지 확인 후 변환
        if (coordinates.length === 2) {
          const coord = coordinates as [number, number];

          // 병원 위치로 지도 이동
          if (map.current) {
            map.current.flyTo({
              duration: 1000,
              center: coord, // [lng, lat] 형태로 전달
              zoom: 13, // 적절한 줌 레벨 설정
              pitch: 0, // 시각적으로 강조
              bearing: 0,
              essential: true,
            });
          }
        } else {
          console.warn('병원 위치 데이터가 올바른 형식이 아닙니다.', coordinates);
        }
      } else {
        console.warn('병원 위치 데이터가 Point 타입이 아닙니다.', geometry);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0">
      <div className="z-0" ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
};

export default MapBox;
