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
import { Webhook } from "@/services"
import { useTranslations } from "next-intl"
import _ from "lodash"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useWebhooks } from "@/app/_hooks/useWebhooks"
import { deleteWebhook } from "@/app/_store/Webhook"
import AddWebhook from "./AddWebhook"

interface WebhooksTableProps {
    idScenario: string | undefined
}

export function WebhooksTable({ idScenario }: WebhooksTableProps) {
    const { get, webhooks, del } = useWebhooks();
    const tWebhooks = useTranslations('webhooks');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const [total, setTotal] = useState({ totalItems: 0, totalPages: 1 });
    const [pageIndex, setPageIndex] = useState(1);

    const [editingWebhooks, setEditingWebhooks] = useState<Webhook|null>(null);

    const columns: ColumnDef<Webhook>[] = [
        {
            accessorKey: "eventType",
            enableHiding: false,
            header: tWebhooks('table.columns.event_type'),
            cell: ({ row }) => <div className="lowercase">{row.getValue("eventType")}</div>,

        },
        {
            accessorKey: "url",
            enableHiding: false,
            header: tWebhooks('table.columns.url'),
            cell: ({ row }) => <div className="lowercase">{row.getValue("url")}</div>,
        },
        {
            accessorKey: "actions",
            enableHiding: false,
            header: tWebhooks('table.columns.actions.title'),
            cell: ({ row }) => {
                const webhookId = row.original.id

                const deleteWebhook = async () => {
                    if (!_.isUndefined(webhookId)) {
                        await del(webhookId)
                    }
                };


                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">{tWebhooks('table.columns.actions.open_menu')}</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{tWebhooks('table.columns.actions.actions')}</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => setEditingWebhooks(row.original)}
                                className="flex items-center gap-2"
                            >
                                <Pencil className="h-4 w-4" />
                                {tWebhooks('table.columns.actions.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => deleteWebhook()}
                                className="flex items-center gap-2"
                            >
                                <Trash className="h-4 w-4" color="red" />
                                <p className="text-destructive">{tWebhooks('table.columns.actions.delete')}</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        },
    ]

    const table = useReactTable({
        data: webhooks,
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
            const { totalItems, totalPages } = await get(idScenario, pageIndex);
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
                                    {tWebhooks('no_result')}
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
                            {tWebhooks('table.total_items', { totalItems: (total?.totalItems ?? 0) })}
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
                                {tWebhooks('table.previous')}
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
                                {tWebhooks('table.next')}
                            </Button>
                        </div>
                    </div>
                )}
                {editingWebhooks && (
                    <AddWebhook
                        webhook={editingWebhooks}
                        setWebhook={setEditingWebhooks}
                    />
                )}
        </div>
    )
}
