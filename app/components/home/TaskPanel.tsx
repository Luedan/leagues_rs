import { Button, Divider, Image, Paper, Tabs, Title } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import {
  useRuneScapePersistStore,
  useRuneScapeStore,
} from "~/store/RunescapeStore";
import type { Completed } from "~/types/responses";
import { getTaskInIncompleteTask } from "~/utils";
import { LOCATIONS, POINTS, TIERS } from "~/utils/constants";

export const TaskPanel = () => {
  const { data, isLoading } = useRuneScapeStore((state) => state);
  const { setTodoTasks, todoTasks } = useRuneScapePersistStore(
    (state) => state
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const todoTasksData = useMemo(() => {
    return getTaskInIncompleteTask(data?.incomplete || [], todoTasks);
  }, [data?.incomplete, todoTasks]);

  const columns = useMemo<MRT_ColumnDef<Completed>[]>(
    () => [
      { accessorKey: "taskId", header: "Task ID", filterFn: "includesString" },
      {
        accessorKey: "locality",
        header: "Locality",
        filterVariant: "multi-select",
        mantineFilterMultiSelectProps: { data: LOCATIONS },
      },
      { accessorKey: "task", header: "Task", filterFn: "includesString" },
      {
        accessorKey: "information",
        header: "Information",
        filterFn: "includesString",
      },
      {
        accessorKey: "requirements",
        header: "Requirements",
        filterFn: "includesString",
      },
      {
        accessorKey: "points",
        header: "Points",
        filterVariant: "multi-select",
        mantineFilterMultiSelectProps: { data: POINTS },
      },
      {
        accessorKey: "taskTier",
        header: "Tier",
        filterVariant: "multi-select",
        mantineFilterMultiSelectProps: {
          data: TIERS,
        },
        Cell: ({ cell }: { cell: MRT_Cell<Completed> }) => {
          const tier = cell.getValue<string>();
          return (
            <div className="flex items-center gap-1">
              {tier}
              <Image
                src={`https://runescape.wiki/images/thumb/Catalyst_League_tasks_-_${tier}.png/15px-Catalyst_League_tasks_-_${tier}.png?3bb1b`}
                w={15}
              />
            </div>
          );
        },
      },
      { accessorKey: "completion", header: "Completion" },
    ],
    []
  );

  const hasSelection = Object.keys(rowSelection).length > 0;

  const handleTodoTask = () => {
    setTodoTasks({ ...todoTasks, ...rowSelection });
    setRowSelection({});
  };

  const incompleteTable = useMantineReactTable({
    columns,
    data: data?.incomplete || [],
    state: {
      isLoading,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    initialState: { density: "md" },
    mantineTableContainerProps: { mah: "50dvh" },
    enableStickyHeader: true,
    enableRowSelection: true,
    getRowId: (originalRow) => originalRow.taskId,
    columnFilterDisplayMode: "popover",
  });

  const completedTable = useMantineReactTable({
    columns,
    data: data?.completed || [],
    state: {
      isLoading,
    },
    initialState: { density: "md" },
    mantineTableContainerProps: { mah: "50dvh" },
  });

  const todoTable = useMantineReactTable({
    columns,
    data: todoTasksData || [],
    state: {
      isLoading,
    },
    initialState: { density: "md" },
    mantineTableContainerProps: { mah: "50dvh" },
    enableStickyHeader: true,
  });

  return (
    <Paper shadow="sm" w={"100%"} p="md" withBorder>
      <div className="flex items-center justify-between">
        <Title order={3}>Task Lists</Title>
        {hasSelection && (
          <Button
            disabled={!hasSelection}
            variant="outline"
            onClick={handleTodoTask}
          >
            {hasSelection ? "Save To-Do Tasks" : "No Tasks Selected"}
          </Button>
        )}
      </div>
      <Divider my="md" />
      <Tabs defaultValue="incompleted">
        <Tabs.List>
          <Tabs.Tab value="incompleted">Incomplete</Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
          {todoTasksData?.length ? (
            <Tabs.Tab value="todo">To-Do ({todoTasksData?.length})</Tabs.Tab>
          ) : null}
        </Tabs.List>

        <Tabs.Panel value="incompleted" pt="xs">
          <MantineReactTable table={incompleteTable} />
        </Tabs.Panel>

        <Tabs.Panel value="completed" pt="xs">
          <MantineReactTable table={completedTable} />
        </Tabs.Panel>

        {todoTasksData?.length ? (
          <Tabs.Panel value="todo" pt="xs">
            <MantineReactTable table={todoTable} />
          </Tabs.Panel>
        ) : null}
      </Tabs>
    </Paper>
  );
};
