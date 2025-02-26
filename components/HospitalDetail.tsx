import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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
        <h2 className="text-lg font-bold mb-2">{hospital.name}</h2>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">유형</TableCell>
              <TableCell>{hospital.hosType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">주소</TableCell>
              <TableCell>{hospital.addr}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">전화번호</TableCell>
              <TableCell className="text-blue-600">
                <a href={`tel:${hospital.phone}`}>{hospital.phone}</a>
              </TableCell>
            </TableRow>
            {hospital.homePage && (
              <TableRow>
                <TableCell className="font-semibold">홈페이지</TableCell>
                <TableCell>
                  <a
                    href={hospital.homePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    방문하기
                  </a>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HospitalDetail;
