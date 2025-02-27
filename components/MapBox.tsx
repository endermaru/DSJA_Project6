"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { pretendard } from "@/lib/fonts";

const hosTypeCategories = {
  "상담센터": ["상담센터"],
  "정신건강복지센터": ["광역정신건강복지센터", "기초정신건강복지센터"],
  "의원": ["의원"],
  '기타 정신과 기관': [
    "병원",
    "보건소",
    "보건의료원",
    "보건지소",
    "상급종합",
    "요양병원",
    "정신병원",
    "종합병원",
    "한방병원",
  ],
};

const labelColors: { [key: string]: string } = {
  상담센터: "text-[#0ea2e8]", 
  정신건강복지센터: "text-[#ba3850]",
  의원: "text-[#4edeaf]",
  "기타 정신과 기관": "text-[#6e8487]",
};


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

const MapBox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const router = useRouter();

  const [loaded, setLoaded] = useState<Boolean>(false)
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [filterType, setFilterType] = useState("nearby");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [regionData, setRegionData] = useState<Record<string, Record<string, { 위도: number; 경도: number }>>>({});
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const [selectedHosTypes, setSelectedHosTypes] = useState<string[]>([]);

  const handleCheckboxChange = (type: string, checked: boolean | "indeterminate") => {
    setSelectedHosTypes((prev) =>
      Boolean(checked) ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("/data/hospitals.json");
        const rawData = await response.json();
    
        // JSON 데이터를 Hospital 타입에 맞게 변환
        const mappedData: Hospital[] = rawData.map((item: any) => ({
          id: item.id,
          name: item.기관명,  // '기관명' → 'name'
          hosType: item.기관구분,  // '기관구분' → 'hosType'
          addr: item.주소,  // '주소' → 'addr'
          phone: item.전화번호 || "",  // '전화번호' → 'phone' (null 방지)
          homePage: item.홈페이지 || "",  // '홈페이지' → 'homePage' (null 방지)
          coordinates: [item.경도, item.위도],  // '경도', '위도' → 'coordinates: [lng, lat]'
          city: item.시도,  // '시도' → 'city'
          district: item.시군구,  // '시군구' → 'district'
        }));
    
        setHospitals(mappedData);
      } catch (error) {
        console.error("병원 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    
    const fetchRegions = async () => {
      try {
        const response = await fetch("/data/selection_with_center.json");
        const data = await response.json();
        setRegionData(data);
      } catch (error) {
        console.error("지역 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchHospitals();
    fetchRegions();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/endermaru/cm7ld6py5004o01ssgl3jhewv",
      refreshExpiredTiles: true,
      interactive: true,
      pitchWithRotate: false,
      dragRotate: false,
      pitch: 0, 
    });

    map.current.on("style.load", () => {
      map.current?.setFilter("hospitals_highlight3", ["==", "id", ""]);
      setLoaded(true)
    });

    // hospitals 레이어 클릭 이벤트 추가
    map.current.on("click", "hospitals", (e) => {
      if (!e.features || e.features.length === 0) return;

      const hospitalInfo = e.features[0].properties;
      if (!hospitalInfo) return;

      const hospitalId = hospitalInfo["id"];

      map.current?.setFilter("hospitals_highlight3", ["==", "id", hospitalId]);

      const geometry = e.features[0].geometry;
      if (geometry.type === "Point") {
        const pointGeometry = geometry as GeoJSON.Point;
        const coordinates = pointGeometry.coordinates as [number, number];

        setSelectedHospital({
          id: hospitalInfo["id"],
          name: hospitalInfo["기관명"],
          addr: hospitalInfo["주소"],
          hosType: hospitalInfo["기관구분"],
          district: hospitalInfo["시군구"],
          city: hospitalInfo["시도"],
          phone: hospitalInfo["전화번호"],
          homePage: hospitalInfo["홈페이지"],
          coordinates: coordinates,
        });

        map.current?.flyTo({
          duration: 1000,
          center: coordinates,
          zoom: 13,
        });
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([longitude, latitude]);

          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 13,
            duration: 1000,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        }
      );
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (filterType === "nearby") {
      if (!currentLocation) {
        setFilteredHospitals([]); // 위치 정보 없으면 빈 리스트 유지
        return;
      }

      const sortedHospitals = hospitals
        .map((hospital) => ({
          ...hospital,
          distance: getDistance(currentLocation, hospital.coordinates),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 50);

      setFilteredHospitals(sortedHospitals);
    } else if (filterType === "region") {
      if (!selectedCity || !selectedDistrict) {
        setFilteredHospitals([]);
        return;
      }

      setFilteredHospitals(hospitals.filter((h) => h.city === selectedCity && h.district === selectedDistrict));
    } else {
      setFilteredHospitals(hospitals);
    }
  }, [filterType, hospitals, currentLocation, selectedCity, selectedDistrict]);

  useEffect(() => {
    if (filterType === "region" && selectedCity && selectedDistrict && map.current) {
      const districtData = regionData[selectedCity]?.[selectedDistrict];
      if (districtData) {
        const { 경도, 위도 } = districtData;
        map.current.flyTo({
          center: [경도, 위도],
          zoom: 12,
          duration: 1000,
        });
      }
    }
  }, [filterType, selectedCity, selectedDistrict, regionData]);
  
  useEffect(() => {
    if (filterType === "nearby" && currentLocation && map.current) {
      map.current.flyTo({
        center: currentLocation,
        zoom: 13,
        duration: 1000,
      });
    }
  }, [filterType, currentLocation]);

  useEffect(() => {
    if (selectedHospital && map.current) {
      map.current.flyTo({
        center: selectedHospital.coordinates,
        zoom: 14,
        duration: 1000,
      });
  
      map.current.setFilter("hospitals_highlight3", ["==", "id", selectedHospital.id]);
    }
  }, [selectedHospital]);
  
  useEffect(() => {
    let updatedHospitals = hospitals;
  
    // 'nearby' 필터 적용
    if (filterType === "nearby") {
      if (!currentLocation) {
        setFilteredHospitals([]);
        return;
      }
  
      updatedHospitals = hospitals
        .map((hospital) => ({
          ...hospital,
          distance: getDistance(currentLocation, hospital.coordinates),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 50);
    }
  
    // 'region' 필터 적용
    if (filterType === "region" && selectedCity && selectedDistrict) {
      updatedHospitals = hospitals.filter(
        (h) => h.city === selectedCity && h.district === selectedDistrict
      );
    }
  
    // 체크박스 필터 적용
    if (selectedHosTypes.length > 0) {
      updatedHospitals = updatedHospitals.filter((hospital) =>
        selectedHosTypes.includes(hospital.hosType)
      );
    }
  
    setFilteredHospitals(updatedHospitals);
  }, [filterType, hospitals, currentLocation, selectedCity, selectedDistrict, selectedHosTypes]);
  
  useEffect(() => {
    if (!map.current || !loaded) return;
  
    if (selectedHosTypes.length === 0) {
      // 선택된 기관 유형이 없으면 모든 병원 표시
      map.current!!.setFilter("hospitals_icon", null);
      map.current!!.setFilter("hospitals", null);
    } else {
      console.log(selectedHosTypes)
      // 선택된 기관 유형에 해당하는 병원만 표시
      map.current!!.setFilter("hospitals_icon", [
        "in",
        "기관구분",
        ...selectedHosTypes,
      ]);

      map.current!!.setFilter("hospitals", [
        "in",
        "기관구분",
        ...selectedHosTypes,
      ]);
    }
  }, [selectedHosTypes]);
  

  return (
    <div className={`${pretendard.variable} fixed top-0 left-0 w-screen h-screen`}>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />
    
      <Card className="absolute top-4 right-4 w-96 h-[65vh] flex flex-col">
        <CardContent className="flex h-full flex-col gap-1 pt-2">
          <Select value={filterType} onValueChange={(value) => {
            setFilterType(value);
            if (value === "nearby") {
              setSelectedCity(null); // '내 위치 주변' 선택 시 지역 선택 초기화
              setSelectedDistrict(null);
            }
          }}>
            <SelectTrigger>
              <SelectValue>{filterType === "nearby" ? "내 위치 주변" : "지역 찾기"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nearby">내 위치 주변</SelectItem>
              <SelectItem value="region">지역 찾기</SelectItem>
            </SelectContent>
          </Select>


          {filterType === "region" && (
            <>
              <Select onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="시도 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(regionData).map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={setSelectedDistrict} disabled={!selectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="시군구 선택" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCity &&
                    Object.keys(regionData[selectedCity]).map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </>
          )}

          <ScrollArea className="overflow-y-auto flex-1">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedHospital(hospital)}
              >
                <p className="text-sm font-medium">{hospital.name}</p>
                <p className="text-xs text-gray-600">{hospital.hosType}</p>
              </div>
            ))}
          </ScrollArea>


        </CardContent>
      </Card>
      {selectedHospital && (
        <Card className="absolute bottom-4 right-4 w-96 pt-2 ">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">{selectedHospital.name}</h2>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold w-20">기관구분</TableCell>
                  <TableCell className="break-all">{selectedHospital.hosType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">주소</TableCell>
                  <TableCell className="break-all">{selectedHospital.addr}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">전화번호</TableCell>
                  <TableCell className="break-all">
                    {selectedHospital.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">홈페이지</TableCell>
                  <TableCell>
                    <a
                      href={selectedHospital.homePage?.startsWith("http") ? selectedHospital.homePage : `https://${selectedHospital.homePage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline break-all"
                    >
                      {selectedHospital.homePage}
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      <div className="absolute top-4 left-4 flex flex-col space-y-4">
        <Card className="pt-5 bg-white w-fit">
          <CardContent>
            <h1 className="text-4xl text-emerald-600">🗺️ 마음 안내소</h1>
            <p className="text-xl mt-3 ">나에게 맞는 정신건강지원기관을 한눈에 찾아보세요!</p>
            <p className="text-sm mb-3">출처: 건강보험심사평가원, 국립 정신건강정보포털, 사회서비스 전자바우처</p>
            <Button className="text-xl w-fit mx-auto 
            bg-white border border-emerald-500 border-2 text-emerald-500 font-semibold rounded-md 
            transition-colors hover:bg-emerald-500 hover:text-white active:bg-emerald-500" onClick={() => router.push("/")}>
              보도문으로 돌아가기
            </Button>
          </CardContent>
        </Card>

        <Card className="w-auto max-w-fit">
          <CardContent>
            <p className="text-base font-extrabold mt-2 mb-2">기관 구분 필터</p>
            {Object.entries(hosTypeCategories).map(([category, types]) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={types.some((type) => selectedHosTypes.includes(type))}
                  onCheckedChange={(checked) => {
                    types.forEach((type) => handleCheckboxChange(type, Boolean(checked)));
                  }}
                />
                <label htmlFor={category} className={`text-base font-extrabold select-none ${labelColors[category] || "text-black"}`}>
                  {category}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default MapBox;
