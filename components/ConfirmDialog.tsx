import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { type PropsWithChildren } from "react";

interface ConfirmDialogProps extends PropsWithChildren {
  onConfirm?: () => void;
  children: React.ReactNode;
  titleDialog?: String | React.ReactNode;
  buttonText?: String | React.ReactNode;
}

export const ConfirmDialog = ({
  onConfirm,
  children,
  titleDialog = "Please confirm your action",
  buttonText = "Open confirm modal",
}: ConfirmDialogProps) => {
  const openModal = () =>
    modals.openConfirmModal({
      title: titleDialog,
      children,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => onConfirm && onConfirm(),
    });

  return <Button onClick={openModal}>{buttonText}</Button>;
};
