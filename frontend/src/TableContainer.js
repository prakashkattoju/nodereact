import React from "react";
import { useTable, usePagination } from "react-table";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, Container } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export default function TTable({ columns, data, num = 2 }) {
    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        prepareRow,
        page,
        pageOptions,
        state: { pageIndex, pageSize },
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: num },
        },
        usePagination,
    )

    return (
        <Container maxWidth="xl">
            <TableContainer component={Paper} sx={{ my: 5 }}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            { data.length > num ? <div>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage} startIcon={<ArrowBack />}>
                        Previous
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage} endIcon={<ArrowForward />}>
                        Next
                    </Button>
                </ButtonGroup>
                <div>
                    Page{' '}
                    <em>
                        {pageIndex + 1} of {pageOptions.length}
                    </em>
                </div>
            </div> : '' }
        </Container>
    );
}