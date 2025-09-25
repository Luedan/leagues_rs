import { ActionIcon, Button, type ActionIconProps } from "@mantine/core";

interface FloatButtonProps extends ActionIconProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function FloatButton({ children, ...props }: FloatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ActionIcon {...props}>{children}</ActionIcon>
    </div>
  );
}
