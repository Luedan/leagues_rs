import {
  ActionIcon,
  Button,
  Divider,
  Modal,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { ConfirmDialog } from "components/ConfirmDialog";
import { useRef } from "react";
import {
  useRuneScapePersistStore,
  useRuneScapeStore,
} from "~/store/RunescapeStore";

export const ModalConfig = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { clearStore, rsName, setRsName, clearTodoTasks } =
    useRuneScapePersistStore((state) => state);

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

  const triggerFormSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <Tooltip
        label="Profile App Settings"
        openDelay={500}
        closeDelay={100}
        transitionProps={{ transition: "rotate-left", duration: 300 }}
      >
        <ActionIcon variant="light" size={"xl"} onClick={open}>
          <IconUser stroke={2} className="animate-pulse" />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Profile App Settings"
        centered
      >
        <div className="flex flex-col gap-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <TextInput
              defaultValue={rsName || ""}
              label="Runescape Name"
              description="Set your default Runescape Name for faster profile access"
              ref={refInput}
            />
            <ConfirmDialog
              onConfirm={triggerFormSubmit}
              buttonText="Save Changes"
              titleDialog="Are you sure you want to change your Runescape Name?"
            >
              <Text>
                This action will delete your To-Do task and change your quick
                access profile. Are you sure you want to proceed?
              </Text>
            </ConfirmDialog>
          </form>

          <Divider />
          <Button variant="outline" onClick={clearTodoTasks}>
            Clear To-Do Tasks
          </Button>
        </div>
      </Modal>
    </>
  );
};
