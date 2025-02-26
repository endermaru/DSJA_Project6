import { pretendard } from "@/lib/fonts";
import TableauLineChart from "@/components/TableauLineChart"
import TableauBarChart from "@/components/TableauBarChart"
import TableauMap from "@/components/TableauMap"
import TableauStackedBarChart from "@/components/TableauStackedBarChart"
import MapBox from "@/components/mapbox";


export default function Home() {
  return (
    <div className={`${pretendard.variable} text-4xl font-bold bg-white`}>
      {/* <TableauStackedBarChart/>
      <TableauMap/>
      <TableauLineChart/>
      <TableauBarChart/> */}
      <MapBox/>
    </div>
  );
}
