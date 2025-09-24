import {
  ActionIcon,
  AppShell,
  Image,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useMemo, useRef, useState } from "react";
import { getPlayers } from "~/services/rs";
import type { Completed } from "~/types/responses";
import { Profile } from "./Profile";
import { TaskPanel } from "./TaskPanel";

export function Welcome() {
  const [searchParams, setSearchParams] = useState("");
  const refInput = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (refInput.current) {
        setSearchParams(refInput.current.value);
      }
    },
    [refInput]
  );

  const { data, isLoading } = useQuery({
    queryFn: () => getPlayers(searchParams),
    queryKey: ["Player_League", searchParams],
    enabled: !!searchParams,
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

  const incompletedTable = useMantineReactTable({
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
    <AppShell
      bg={"oklch(98.4% 0.003 247.858)"}
      header={{
        height: 75,
      }}
    >
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 3 }}
      />
      <AppShell.Header className="p-2" bg={"oklch(20.8% 0.042 265.755)"}>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-4">
            <Image src={"/logo.png"} w={56} />
            <Image src={"/Logo_nuevo2.png"} w={"230"} />
          </div>
          <form
            className="mr-3 flex items-center gap-2 rounded p-2"
            onSubmit={handleSearch}
          >
            <TextInput placeholder="Your Rsn" ref={refInput} autoFocus={true} />
            <ActionIcon variant="filled" aria-label="Settings" type="submit">
              <IconSearch
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </form>
        </div>
      </AppShell.Header>
      <AppShell.Main className="flex items-center justify-center">
        <div className="flex w-full flex-col items-center gap-4 p-4 container">
          <Profile data={data} />

          <TaskPanel
            incompleteTable={incompletedTable}
            completedTable={completedTable}
          />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
