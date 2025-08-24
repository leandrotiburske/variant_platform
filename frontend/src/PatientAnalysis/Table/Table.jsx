import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./Table.module.css"
import api from "../../api"
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSearch } from "react-icons/fa"

function Table({ id }) {

  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

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
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  const navigate = useNavigate();

  function handleRowClick(id) {
    navigate(`./${id}`);
  }

  // Create state for filter inputs
  const [filterInputs, setFilterInputs] = useState({
    gene: "",
    classification: "",
    phenotype: "",
    chromosome: "",
  });

  // Function to apply filters
  const applyFilters = () => {
    const filters = [];

    if (filterInputs.gene.trim()) {
      filters.push({ id: 'gene', value: filterInputs.gene });
    }
    if (filterInputs.classification.trim()) {
      filters.push({ id: 'classification', value: filterInputs.classification });
    }
    if (filterInputs.phenotype.trim()) {
      filters.push({ id: 'phenotypes', value: filterInputs.phenotype });
    }
    if (filterInputs.chromosome.trim()) {
      filters.push({ id: 'chromosome', value: filterInputs.chromosome });
    }

    console.log('Applying filters:', filters);
    console.log('Sample phenotypes data:', data.slice(0, 3).map(item => item.phenotypes));

    setColumnFilters(filters);
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <div>
      <div className={styles.filterWrapper}>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Filter by gene"
            className={styles.filterInput}
            value={filterInputs.gene}
            onChange={(v) => setFilterInputs({ ...filterInputs, gene: v.target.value })}
            onKeyPress={handleKeyPress}
          />
          <FaFilter className={styles.icon} />
        </label>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Filter by classification"
            className={styles.filterInput}
            value={filterInputs.classification}
            onChange={(v) => setFilterInputs({ ...filterInputs, classification: v.target.value })}
            onKeyPress={handleKeyPress}
          />
          <FaFilter className={styles.icon} />
        </label>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Filter by phenotype"
            className={styles.filterInput}
            value={filterInputs.phenotype}
            onChange={(v) => setFilterInputs({ ...filterInputs, phenotype: v.target.value })}
            onKeyPress={handleKeyPress}
          />
          <FaFilter className={styles.icon} />
        </label>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Filter by chromosome"
            className={styles.filterInput}
            value={filterInputs.chromosome}
            onChange={(v) => setFilterInputs({ ...filterInputs, chromosome: v.target.value })}
            onKeyPress={handleKeyPress}
          />
          <FaFilter className={styles.icon} />
        </label>

        <button id={styles.searchButton} onClick={applyFilters}>
          <FaSearch id={styles.searchIcon} />
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
