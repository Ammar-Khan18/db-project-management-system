"use client";

import { useState } from "react";

interface TableViewProps {
  columns: string[];
  data: any[];
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export default function TableView({ columns, data, onEdit, onDelete }: TableViewProps) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="text-black">
          {columns.map((col) => (
            <th key={col} className="border p-2 bg-gray-200">{col}</th>
          ))}
          <th className="border p-2 bg-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col} className="border p-2">{row[col]}</td>
            ))}
            <td className="border p-2 flex gap-2">
              <button
                className="bg-blue-600 text-white px-2 rounded"
                onClick={() => onEdit(row)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-2 rounded"
                onClick={() => onDelete(row)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
