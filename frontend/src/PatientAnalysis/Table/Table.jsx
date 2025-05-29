import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./Table.module.css"
import api from "../../api"
import { useNavigate } from "react-router-dom";
import {FaFilter, FaSearch} from "react-icons/fa"

function Table({id}) {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await api.get(`http://localhost:8080/subjects/${id}`);
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
        accessorKey: "chromosome",
        header: "Chromosome"
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
      <div className={styles.filterWrapper}>
      <label className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Filter by gene"
          className={styles.filterInput}
        />
        <FaFilter className={styles.icon}/>
      </label>
      <label className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Filter by classification"
          className={styles.filterInput}
        />
        <FaFilter className={styles.icon}/>
      </label>
      <label className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Filter by phenotype"
          className={styles.filterInput}
        />
        <FaFilter className={styles.icon}/>
      </label>
      <label className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Filter by chromosome"
          className={styles.filterInput}
        />
        <FaFilter className={styles.icon}/>
      </label>

      <button id={styles.searchButton}>
        <FaSearch id={styles.searchIcon}/>
      </button>
      </div>

    <table border="1" className={styles.variantsTable}>
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
