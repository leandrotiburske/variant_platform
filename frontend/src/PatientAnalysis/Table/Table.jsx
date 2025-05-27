import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./Table.module.css"
import api from "../../api"
import { useNavigate } from "react-router-dom";

function Table({id}) {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await api.get(`http://localhost:8080/subjects/${id}`);
        console.log(response.data.variants);
        setData(response.data.variants);
      } catch (error) {
        setData([]);
      }
    }

    fetchSubjects();
  }, [id]);  

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Variant ID"
      },
      {
        accessorKey: "gene",
        header: "Gene name",
      },
      {
        accessorKey: "external_id",
        header: "External ID"
      },
      {
        accessorKey: "classification",
        header: "Classification"
      },
      {
        accessorKey: "phenotypes",
        header: "Phenotypes"
      },
      {
        accessorKey: "reference",
        header: "Reference"
      },
      {
        accessorKey: "alternative",
        header: "Alternative"
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  function handleRowClick(id) {
    navigate(`./${id}`);
  }

  return (
    <div>
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
          <tr key={row.id}
          onClick={() => handleRowClick(row.original.id)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Table;
