import Image from "next/image";
import { ITableItem } from "@/lib/models/apiModels";
interface ITable {
  type?: "simple" | "full";
  data: ITableItem[] | undefined;
}

const SIMPLE_HEADER = ["Pos", "Team", "Pl", "Gd", "pts"];
export default function Table({ type = "simple", data }: ITable) {
  if (data?.length === 0) {
    return <h3>Table Not Available</h3>;
  }

  return (
              <div className="relative overflow-x-auto">
                <div className="w-full h-10 flex justify-center items-center">
                  <h3 className="font-bold text-header text-[]">Таблиця Ліги</h3>
                </div>
                <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="sm:text-xs md:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {type === "simple" &&
                        SIMPLE_HEADER.map((el, index) => (
                <th key={index} scope="col" className="px-2 py-2">
                  {el}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="sm:text-xs lg:text-sm">
          {data?.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.pos}
              </th>
              <th
                scope="row"
                className=" flex gap-2 px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Image alt={item.team} src={item.logo} width={20} height={20} />
                {item.team}
              </th>
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.pl}
              </th>
              <td className="px-2 py-2">{item.gd}</td>
              <td className="px-3 py-2">{item.pt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
