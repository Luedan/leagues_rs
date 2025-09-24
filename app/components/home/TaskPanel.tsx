import { Box, Divider, Paper, Tabs, Title } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_TableInstance,
} from "mantine-react-table";
import { useMemo } from "react";
import { useRuneScapeStore } from "~/store/RunescapeStore";
import type { Completed } from "~/types/responses";

export const TaskPanel = () => {
  const { data, isLoading } = useRuneScapeStore((state) => state);

  const columns = useMemo<MRT_ColumnDef<Completed>[]>(
    () => [
      { accessorKey: "taskId", header: "Task ID" },
      { accessorKey: "locality", header: "Locality" },
      { accessorKey: "task", header: "Task" },
      { accessorKey: "information", header: "Information" },
      { accessorKey: "requirements", header: "Requirements" },
      { accessorKey: "points", header: "Points" },
      { accessorKey: "completion", header: "Completion" },
    ],
    []
  );

  const incompleteTable = useMantineReactTable({
    columns,
    data: data?.incompleted || [],
    state: {
      isLoading,
    },
    initialState: { density: "md" },
    mantineTableContainerProps: { mah: "50dvh" },
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

  return (
    <Paper shadow="sm" w={"100%"} p="md" withBorder>
      <Title order={3}>Task Lists</Title>
      <Divider my="md" />
      <Tabs defaultValue="incompleted">
        <Tabs.List>
          <Tabs.Tab value="incompleted">Incomplete</Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="incompleted" pt="xs">
          <MantineReactTable table={incompleteTable} />
        </Tabs.Panel>

        <Tabs.Panel value="completed" pt="xs">
          <MantineReactTable table={completedTable} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
