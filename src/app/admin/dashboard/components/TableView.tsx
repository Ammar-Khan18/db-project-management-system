"use client";

interface TableViewProps {
  columns: string[];
  data: any[];
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export default function TableView({ columns, data, onEdit, onDelete }: TableViewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-black">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left font-semibold text-black border-b"
              >
                {col.replace("_", " ")}
              </th>
            ))}
            <th className="px-4 py-2 text-left font-semibold text-black border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`text-black ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 border-b text-black">
                  {row[col]}
                </td>
              ))}
              <td className="px-4 py-2 border-b flex gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
