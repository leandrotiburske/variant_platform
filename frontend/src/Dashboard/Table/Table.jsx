import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./Table.module.css"
import axios from "axios";

function Table() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.get("http://localhost:8080/subjects");
        setData(response.data.subjects);
      } catch (error) {
        setData([]);
      }
    }

    fetchSubjects();
  }, []);  

  const columns = React.useMemo(
    () => [
      { accessorKey: "id",
        header: "Patient ID",
      },
      {
        accessorKey: "name",
        header: "Patient name",
      },
      {
        accessorKey: "email",
        header: "Patient email",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table border="1">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
