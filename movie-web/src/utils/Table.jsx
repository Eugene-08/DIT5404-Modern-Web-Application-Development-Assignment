import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

export function Table(props) {
  const { rows, columns, rowCount, current, setCurrent = true, setSelection = false, checkboxSelection = true, hideFooter = false, setSortOrder, setSortFields, handleSortModelChange,
    useCustomPagination = true, ...common } = props;
  const formattedColumns = columns.map((e) => ({
    ...e,
    // sortable: sortable,
    filterable: false,
    disableColumnMenu: true,
  }));

  function customPagination() {
    const apiRef = useGridApiContext();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(rowCount / 10)}
        page={current > 0 ? current : 0}
        defaultPage={1}
        showFirstButton={true}
        showLastButton={true}
        onChange={(event, value) => {apiRef.current.setPage(value - 1); setCurrent(value)}}
      />
    );
  }

  return (
    <>
      {rows.length > 0 ? (
        <Box
          style={{ height: rowCount < 10 ? rowCount * 52 + (hideFooter ? 60 : 120) : 640, width: "100%" }}
        >
          <DataGrid
            rows={rows}
            columns={formattedColumns}
            pageSize={10}
            checkboxSelection={checkboxSelection}
            sortable
            sortingMode="server"
            onSortModelChange={handleSortModelChange}
            rowCount={rowCount}
            paginationMode="server"
            onPageChange={(e) => (setCurrent ? setCurrent(e + 1) : null)}
            disableSelectionOnClick
            onSelectionModelChange={(e) => {
              setSelection ? setSelection(e) : null;
            }}
            hideFooter={hideFooter}
            components={useCustomPagination ? {
              Pagination: customPagination,
            } : null}
            sx={{color: "white"}}
            {...common}
          />
        </Box>
      ) : (
        <Typography>{"No Records"}</Typography>
      )}
    </>
  );
}
