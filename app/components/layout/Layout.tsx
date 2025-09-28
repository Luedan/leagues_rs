import {
  ActionIcon,
  Anchor,
  AppShell,
  Image,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { IconMoonFilled, IconSearch, IconSunFilled } from "@tabler/icons-react";
import { NavLink, Outlet, useLocation, useNavigation } from "react-router";
import { useRsOffline } from "~/hooks/useRsOffline";
import { ModalConfig } from "../buttonActions/ModalConfig";
import { Loading } from "./Loading";
import { FloatButtonGroup } from "components/FloatButton";
import { ReloadButton } from "../buttonActions/ReloadButton";

export default function Layout() {
  const { handleSearch, isLoading, value, handleChange } = useRsOffline();

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const location = useLocation();

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{
        height: 75,
      }}
    >
      <Notifications position="top-right" />
      <Loading isLoading={isLoading || isNavigating} />
      <AppShell.Header className="p-2" bg={"oklch(20.8% 0.042 265.755)"}>
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <div className="flex gap-4 md:flex-[.33]">
            <Image src={"/logo.png"} w={56} />
            <div className="hidden md:block">
              <Image src={"/Logo_nuevo2.png"} w={"230"} />
            </div>
          </div>
          {/* menu: Home and About */}
          <div className="flex md:flex-[.33] md:justify-center items-center">
            <div className="mr-2">
              <NavLink to="/">
                <Anchor fw={location?.pathname === "/" ? "bold" : "normal"}>
                  Home
                </Anchor>
              </NavLink>
            </div>
            <div>
              <NavLink to="/about">
                <Anchor
                  fw={location?.pathname === "/about" ? "bold" : "normal"}
                >
                  About
                </Anchor>
              </NavLink>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex items-center md:flex-[.33] justify-end">
            <form
              className="flex items-center gap-2 rounded p-2"
              onSubmit={handleSearch}
            >
              <TextInput
                placeholder="Your Rsn"
                value={value || ""}
                onChange={handleChange}
                autoFocus={true}
              />
              <ActionIcon variant="light" aria-label="Settings" type="submit">
                <IconSearch
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </form>
            <ActionIcon
              className="mr-3"
              variant="light"
              onClick={() =>
                setColorScheme(colorScheme === "dark" ? "light" : "dark")
              }
            >
              {colorScheme !== "dark" ? (
                <IconMoonFilled
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              ) : (
                <IconSunFilled
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Main className="flex items-center justify-center">
        <div className="flex w-full flex-col items-center gap-4 p-4 container">
          <Outlet />
        </div>
        <FloatButtonGroup>
          {[<ReloadButton />, <ModalConfig />]}
        </FloatButtonGroup>
      </AppShell.Main>
    </AppShell>
  );
}
