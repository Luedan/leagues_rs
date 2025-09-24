import { Box, Divider, Paper, Tabs, Title } from "@mantine/core";
import { MantineReactTable, type MRT_TableInstance } from "mantine-react-table";
import type { Completed } from "~/types/responses";

export const TaskPanel = ({
  incompleteTable,
  completedTable,
}: {
  incompleteTable: MRT_TableInstance<Completed>;
  completedTable: MRT_TableInstance<Completed>;
}) => {
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
