import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import HospitalPanel from "./HospitalPanel";
import HospitalDetail from "./HospitalDetail";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

type Hospital = {
  id: string;
  name: string;
  hosType: string;
  addr: string;
  phone?: string;
  homePage?: string;
  coordinates: [number, number]; // [lng, lat]
  city: string;
  district: string;
};

const MapBox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<String | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | [null, null]>([null, null]);

  useEffect(() => {
    // 병원 데이터 불러오기
    const fetchHospitals = async () => {
      try {
        const response = await fetch("/data/hospitals.json");
        const data: Hospital[] = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("병원 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/endermaru/cm7ld6py5004o01ssgl3jhewv',
    });

    map.current.on('style.load', () => {
      setLoaded(true);
      map.current?.setFilter('hospitals_highlight', ['==', 'id', '']);

      // 사용자의 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude])
            // 지도 이동: flyTo 사용
            map.current?.flyTo({
              center: [longitude, latitude],
              zoom: 11,
              duration: 1000,
              pitch: 0,
              bearing: 0,
              essential: true,
            });
          },
          (error) => {
            console.error("위치 정보를 가져오는 중 오류 발생: ", error);
          }
        );
      } else {
        console.error("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
    });

    // hospitals 레이어 클릭 이벤트 추가
    map.current.on('click', 'hospitals', (e) => {
      if (!e.features || e.features.length === 0) return;

      const hospitalId = e.features[0].properties?.id
      if (hospitalId) return;

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
      {/* 지도 제목 */}
      <h1 className="absolute top-4 left-4 text-xl font-bold bg-white p-2 rounded shadow-md z-10">
        지도
      </h1>
  
      {/* 지도 컨테이너 */}
      <div className="z-0" ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />
  
      {/* 병원 정보 패널 (병원이 선택된 경우에만 표시)
      {selectedHospital && (
        <div className="absolute top-10 right-4 w-80 bg-white p-4 rounded-lg shadow-lg z-10">
          <h2 className="text-lg font-semibold">{selectedHospital.name}</h2>
          <p className="text-sm text-gray-600">{selectedHospital.hosType}</p>
          <p className="mt-2">{selectedHospital.addr}</p>
          <p className="text-blue-600">
            <a>{selectedHospital.phone}</a>
          </p>
          {selectedHospital.homePage && (
            <p className="mt-2">
              <a
                href={selectedHospital.homePage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {selectedHospital.homePage}
              </a>
            </p>
          )}
        </div>
      )} */}
    </div>
  );
  
};

export default MapBox;
