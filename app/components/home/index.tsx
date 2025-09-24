import React from "react";
import { Profile } from "./Profile";
import { TaskPanel } from "./TaskPanel";
import { Graphs } from "./Graphs";

export const HomeComponent = () => {
  return (
    <>
      <Profile />
      <TaskPanel />
      <Graphs />
    </>
  );
};
