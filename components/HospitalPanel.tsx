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

const HospitalPanel: React.FC<{ hospitals: Hospital[]; onSelect: (hospital: Hospital) => void }> = ({
  hospitals,
  onSelect,
}) => {
  return (
    <Card className="absolute top-4 right-4 w-80 h-[60vh] flex flex-col">
      <CardContent className="flex flex-col gap-2">
        {/* 필터 선택 */}
        <div className="flex justify-between items-center">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="병원 찾기 옵션" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nearby">내 위치 주변</SelectItem>
              <SelectItem value="region">지역 찾기</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 병원 목록 */}
        <ScrollArea className="flex-1 h-full">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="p-2 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(hospital)}
            >
              <p className="font-bold">{hospital.name}</p>
              <p className="text-sm text-gray-600">{hospital.hosType}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
