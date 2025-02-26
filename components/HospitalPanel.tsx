import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

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

type Props = {
  hospitals: Hospital[];
  currentLocation: [number, number] | null;
  onSelect: (hospital: Hospital) => void;
  onMoveMap: (coords: [number, number]) => void;
};

const HospitalPanel: React.FC<Props> = ({ hospitals, currentLocation, onSelect, onMoveMap }) => {
  const [filterType, setFilterType] = useState("nearby");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);

  const [regionData, setRegionData] = useState<Record<string, Record<string, { 위도: number; 경도: number }>>>({});
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("/data/selection_with_center.json");
        const data = await response.json();
        setRegionData(data);
      } catch (error) {
        console.error("지역 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchRegions();
  }, []);

  const cities = Object.keys(regionData); // 시도 리스트
  const districts = selectedCity ? Object.keys(regionData[selectedCity]) : [];

  useEffect(() => {
    if (filterType === "nearby" && currentLocation) {
      const sortedHospitals = hospitals
        .filter((hospital) => Array.isArray(hospital.coordinates) && hospital.coordinates.length === 2)
        .map((hospital) => ({
          ...hospital,
          distance: getDistance(currentLocation, hospital.coordinates),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);

      setFilteredHospitals(sortedHospitals);
    } else if (filterType === "region" && selectedCity && selectedDistrict) {
      setFilteredHospitals(hospitals.filter((h) => h.city === selectedCity && h.district === selectedDistrict));

      // 선택된 지역으로 지도 이동
      const selectedCoords = regionData[selectedCity]?.[selectedDistrict];
      if (selectedCoords) {
        onMoveMap([selectedCoords.경도, selectedCoords.위도]); // [lng, lat] 형태로 전달
      }
    } else {
      setFilteredHospitals(hospitals);
    }
  }, [filterType, hospitals, currentLocation, selectedCity, selectedDistrict]);

  return (
    <Card className="absolute top-4 right-4 w-80 h-[60vh] flex flex-col">
      <CardContent className="flex flex-col gap-2">
        {/* 필터 선택 */}
        <Select onValueChange={(value) => setFilterType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="병원 찾기 옵션" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nearby">내 위치 주변</SelectItem>
            <SelectItem value="region">지역 찾기</SelectItem>
          </SelectContent>
        </Select>

        {/* 지역 선택 */}
        {filterType === "region" && (
          <div className="flex flex-col gap-2">
            {/* 시도 선택 */}
            <Select onValueChange={(value) => setSelectedCity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="시도 선택" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 시군구 선택 */}
            <Select onValueChange={(value) => setSelectedDistrict(value)} disabled={!selectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="시군구 선택" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 병원 목록 */}
        <ScrollArea className="flex-1 h-full">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelect(hospital)}
              >
                <p className="font-bold">{hospital.name}</p>
                <p className="text-sm text-gray-600">{hospital.hosType}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">병원 데이터를 불러오는 중...</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Haversine 거리 계산
const getDistance = (coord1: [number, number] | null, coord2: [number, number] | null): number => {
  if (!coord1 || !coord2) return Infinity;

  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default HospitalPanel;
