import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./Table.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Table({data}) {  

  const [papers, setPapers] = useState({});

  useEffect(() => {
    async function fetchPapers() {

    const publications = data.map((pub) => {

      const url = pub.publications;
      const id = url.split('/').filter(Boolean).pop();
      return {
        "publications" : url,
      }

    });  

      const id = "15114531";

      try {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${id}&retmode=json`)
        setPapers(response);
        console.log(response);
        
        
        // console.log(response.data.result[id].title);
        
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchPapers();
  }, data)  

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "publications",
        header: "Publications"
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                <span className="link">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
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
