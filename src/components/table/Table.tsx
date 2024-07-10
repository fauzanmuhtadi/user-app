import React from "react";

interface TableProps {
  headers: string[];
  data: { [key: string]: any }[];
  action: boolean;
  handleEdit: (id: any) => void;
  handleDelete: (id: any) => void;
}

const Table: React.FC<TableProps> = ({ headers, data, action, handleEdit, handleDelete }) => {
  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                {capitalizeFirstLetter(header)}
              </th>
            ))}
            {action && <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-700">
                  {row[header]}
                </td>
              ))}
              {action && (
                <td className="px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-700">
                  <button id={`edit-` + row.id} className="text-blue-600 hover:text-blue-900 mr-4" onClick={() => handleEdit(row.id)}>
                    Edit
                  </button>
                  <button id={`delete-` + row.id} className="text-red-600 hover:text-red-900" onClick={() => handleDelete(row.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
