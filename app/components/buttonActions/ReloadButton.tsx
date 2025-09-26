import { ActionIcon, Tooltip } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { useRuneScapeStore } from "~/store/RunescapeStore";

export const ReloadButton = () => {
  const { data, refetch } = useRuneScapeStore((state) => state);

  return data && data?.username ? (
    <Tooltip
      label="Refresh Profile Data"
      openDelay={500}
      closeDelay={100}
      transitionProps={{ transition: "rotate-left", duration: 300 }}
    >
      <ActionIcon variant="light" size={"xl"} onClick={() => refetch()}>
        <IconReload stroke={2} className="animate-pulse" />
      </ActionIcon>
    </Tooltip>
  ) : null;
};
