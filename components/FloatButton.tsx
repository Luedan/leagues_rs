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

export function FloatButtonGroup({
  children,
  spacing = "mb-3",
}: {
  children: React.ReactNode[];
  spacing?: string;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {children.map((child, idx) => (
        <div key={idx} className={idx < children.length - 1 ? spacing : ""}>
          {child}
        </div>
      ))}
    </div>
  );
}
