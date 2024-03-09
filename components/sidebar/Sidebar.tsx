import { getTableData } from "@/lib/api/requests";
import Table from "../table/Table";

export default async function Sidebar() {
  const data = await getTableData();
  return (
    <aside
      id="sidebar"
      className="left-0 z-40 w-200 h-screen max-md:hidden"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto ">
        <Table data={data} />
      </div>
    </aside>
  );
}
