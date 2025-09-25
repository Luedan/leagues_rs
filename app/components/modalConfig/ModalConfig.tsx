import { Button, Modal, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { FloatButton } from "components/FloatButton";
import { useRef, useEffect } from "react";
import {
  useRuneScapePersistStore,
  useRuneScapeStore,
} from "~/store/RunescapeStore";

export const ModalConfig = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const { clearStore, rsName, setRsName } = useRuneScapePersistStore(
    (state) => state
  );
  const { setSearch } = useRuneScapeStore((state) => state);

  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = refInput.current?.value?.trim() || "";
    if (!value || value.length === 0) return;
    if (value === rsName) return close();

    clearStore();
    setRsName(value);
    close();
  };

  return (
    <>
      <Tooltip
        label="Profile App Settings"
        openDelay={500}
        closeDelay={100}
        transitionProps={{ transition: "rotate-left", duration: 300 }}
      >
        <FloatButton variant="light" size={"xl"} onClick={open}>
          <IconUser stroke={2} className="animate-pulse" />
        </FloatButton>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Profile App Settings"
        centered
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            defaultValue={rsName || ""}
            label="Runescape Name"
            description="Set your default Runescape Name for faster profile access"
            ref={refInput}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Modal>
    </>
  );
};
