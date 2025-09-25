import { PieChart } from "@mantine/charts";
import { Divider, Paper, Text, Title } from "@mantine/core";
import React from "react";
import { useRuneScapeStore } from "~/store/RunescapeStore";
import { TASK_DATA } from "~/utils/constants";

export const Graphs = () => {
  const { completedByTier, incompleteByTier } = useRuneScapeStore(
    (state) => state
  );
  return (
    <Paper shadow="sm" p="md" withBorder w={"100%"}>
      <Title order={3}>Graphs</Title>
      <Divider my="md" />
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-evenly items-center">
        <div>
          <Text fz="xs" mb="sm" ta="center">
            Data based on completed tasks by tier
          </Text>
          <PieChart
            data={completedByTier?.length ? completedByTier : TASK_DATA}
            withLabels
            labelsType="percent"
            withTooltip
            tooltipDataSource="segment"
            mx="auto"
            size={300}
          />
        </div>
        <div>
          <Text fz="xs" mb="sm" ta="center">
            Data based on incomplete tasks by tier
          </Text>
          <PieChart
            data={incompleteByTier?.length ? incompleteByTier : TASK_DATA}
            withLabels
            labelsType="percent"
            withTooltip
            tooltipDataSource="segment"
            mx="auto"
            size={300}
          />
        </div>
      </div>
    </Paper>
  );
};
