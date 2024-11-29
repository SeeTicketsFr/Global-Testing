"use client"

import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowRight, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getLogsByScenarioId } from "@/app/_store/Execution"
import { scenarioAtom } from "@/lib/atoms"
import { useAtom } from "jotai"
import { Log } from "@/services"
import { useTranslations } from "next-intl"
import { ScenarioExecutionDrawerDialog } from "@/components/shared-components/Logs/ScenarioExecutionDrawerDialog"
import _ from "lodash"
import ExecutionsMetrics from "./ExecutionsMetrics"
import NoResource from "@/components/shared-components/NoResource"

export function Executions() {
  const tExecutions = useTranslations('executions');
  const [idExecution, setIdExecution] = useState<string|undefined|null>(null);

  const initialSorting: SortingState = [
    {
      id: 'createdAt',
      desc: false,
    },
  ];

  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [scenario] = useAtom(scenarioAtom);
  const [data, setData] = useState<Log[]>([]);
  const [total, setTotal] = useState({ totalItems: 0, totalPage: 1 });
  const [pageIndex, setPageIndex] = useState(1);

  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: "idExecution",
      header: tExecutions('id_execution'),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {tExecutions('created_at')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt");
        return <div>{createdAt?.toLocaleString()}</div>;
      }
    },
    {
      accessorKey: tExecutions('access_log'),
      cell: ({ row }) => {
        const idExecution = row.original.idExecution;
        return (
          <Button size="icon" variant="outline" onClick={() => { setIdExecution(idExecution)}}>
            <ArrowRight className="h-4 w-5" />
          </Button>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const pageSize = table.getState().pagination.pageSize;
      const executions = await getLogsByScenarioId({ idScenario: scenario.id, page: pageIndex });
      setData(executions['hydra:member']);
      setTotal({
        totalItems: executions['hydra:totalItems'] ?? 0,
        totalPage: Math.ceil((executions['hydra:totalItems'] || 1) / pageSize)
      });
    };
    fetchData();
  }, [scenario.id, pageIndex, table.getState().pagination.pageIndex, table.getState().pagination.pageSize]);

  return (
    <div className="w-full">
      {!_.isUndefined(scenario.metrics) && !_.isNull(scenario.metrics) && <ExecutionsMetrics metrics={scenario.metrics} /> }
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
                  className="h-fit text-center"
                >
                  <NoResource text={tExecutions('no_results')} noPadding />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {tExecutions('total_items', { totalItems: (total?.totalItems ?? 0)})}
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
            {tExecutions('previous')}
          </Button>
          <div className="flex-1 text-sm text-muted-foreground">
            {pageIndex} / {total.totalPage}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPageIndex(pageIndex + 1);
              table.nextPage()
            }}
            disabled={pageIndex === total.totalPage }
            >
            {tExecutions('next')}
          </Button>
        </div>
      </div>

      {!_.isUndefined(idExecution) && !_.isNull(idExecution) && (
        <ScenarioExecutionDrawerDialog idExecution={idExecution} setIdExecution={setIdExecution} />
      )}
    </div>
  )
}
