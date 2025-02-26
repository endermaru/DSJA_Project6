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

const HospitalDetail: React.FC<{ hospital: Hospital | null }> = ({ hospital }) => {
  if (!hospital) return null;

  return (
    <Card className="absolute bottom-4 right-4 w-80">
      <CardContent>
        <p className="text-lg font-bold">{hospital.name}</p>
        <p className="text-gray-600">{hospital.hosType}</p>
        <p>{hospital.addr}</p>
        <p className="text-blue-600">{hospital.phone}</p>
        {hospital.homePage && (
          <p>
            <a href={hospital.homePage} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              홈페이지 방문
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
