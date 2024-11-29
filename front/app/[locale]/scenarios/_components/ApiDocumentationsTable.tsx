"use client"

import { useEffect, useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ApiDocumentation } from "@/services"
import { useTranslations } from "next-intl"
import _ from "lodash"
import { useApiDocumentations } from "@/app/_hooks/useApiDocumentations"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import AddApiDocumentation from "./AddApiDocumentation"

export function ApiDocumentationsTable() {
    const { getAll, apiDocumentations, del } = useApiDocumentations();
    const tApiDocumentations = useTranslations('api_documentations');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const [total, setTotal] = useState({ totalItems: 0, totalPages: 1 });
    const [pageIndex, setPageIndex] = useState(1);

    const [editingApiDocumentation, setEditingApiDocumentation] = useState<ApiDocumentation|null>(null);

    const columns: ColumnDef<ApiDocumentation>[] = [
        {
            accessorKey: "name",
            enableHiding: false,
            header: tApiDocumentations('table.columns.name'),
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,

        },
        {
            accessorKey: "url",
            enableHiding: false,
            header: tApiDocumentations('table.columns.url'),
            cell: ({ row }) => <div className="lowercase">{row.getValue("url")}</div>,
        },
        {
            accessorKey: "actions",
            enableHiding: false,
            header: tApiDocumentations('table.columns.actions.title'),
            cell: ({ row }) => {
                const apiDocumentationId = row.original.id

                const deleteApiDocumentation = async () => {
                    if (!_.isUndefined(apiDocumentationId)) {
                        await del(apiDocumentationId)
                    }
                };


                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">{tApiDocumentations('table.columns.actions.open_menu')}</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{tApiDocumentations('table.columns.actions.actions')}</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => setEditingApiDocumentation(row.original)}
                                className="flex items-center gap-2"
                            >
                                <Pencil className="h-4 w-4" />
                                {tApiDocumentations('table.columns.actions.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => deleteApiDocumentation()}
                                className="flex items-center gap-2"
                            >
                                <Trash className="h-4 w-4" color="red" />
                                <p className="text-destructive">{tApiDocumentations('table.columns.actions.delete')}</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        },
    ]

    const table = useReactTable({
        data: apiDocumentations,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            const { totalItems, totalPages } = await getAll(pageIndex);
            setTotal({
                totalItems,
                totalPages
            });
        };
        fetchData();
    }, [pageIndex, table.getState().pagination.pageIndex]);

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {tApiDocumentations('no_result')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {
                (pageIndex > 0)
                && (
                    <div className="flex items-center justify-center space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {tApiDocumentations('table.total_items', { totalItems: (total?.totalItems ?? 0) })}
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setPageIndex(pageIndex - 1);
                                    table.previousPage()
                                }}
                                disabled={pageIndex === 1}
                            >
                                {tApiDocumentations('table.previous')}
                            </Button>
                            <div className="flex-1 text-sm text-muted-foreground">
                                {pageIndex} / {total.totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setPageIndex(pageIndex + 1);
                                    table.nextPage()
                                }}
                                disabled={pageIndex === total.totalPages}
                            >
                                {tApiDocumentations('table.next')}
                            </Button>
                        </div>
                    </div>
                )}
                {editingApiDocumentation && (
                    <AddApiDocumentation
                        apiDocumentation={editingApiDocumentation}
                        setApiDocumentation={setEditingApiDocumentation}
                    />
                )}
        </div>
    )
}
