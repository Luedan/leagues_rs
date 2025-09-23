import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getPlayers } from "~/services/rs";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import type { Completed, IResponseRS } from "~/types/responses";

export function Welcome() {
  const { data } = useQuery({
    queryFn: () => getPlayers("Luedan"),
    queryKey: ["Player_League", "Luedan"],
  });

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


  const table = useMantineReactTable({
    columns,
    data: data?.completed || [],
  });

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <MantineReactTable table={table} />
    </main>
  );
}
