import { Box, Divider, Grid, Image, Paper, Text, Title } from "@mantine/core";
import { type IResponseRS } from "~/types/responses";
import { SkillMax, validateRange } from "~/utils";

export const Profile = ({ data }: { data: IResponseRS | undefined }) => {
  const skillData = data?.levels || {};
  const skills = Object.keys(skillData || {}) || [];
  const totalLvl = Object.values(skillData || {})?.reduce((a, b) => a + b, 0);
  const realTotal = SkillMax.totalLevel;
  const completationPercentage = data
    ? (
        (data?.completed?.length /
          (data?.completed?.length + data?.incompleted?.length)) *
        100
      ).toFixed(2)
    : "0.00";

  const totalPoints =
    data?.completed?.reduce((acc, task) => acc + (+task.points || 0), 0) || 0;

  const trophy = validateRange(totalPoints);
  return (
    /* contenedor padre */
    <Box className="flex flex-col gap-4">
      <Paper shadow="sm" w={"100%"} p="md" withBorder>
        <Title order={3}>Profile</Title>
        <Divider my="md" />
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, sm: 6, lg: 4, xs: 6 }}>
            <Text fw={"bolder"}>Rsn: {data?.username}</Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, sm: 6, lg: 4, xs: 6 }}>
            <Text fw={"bolder"}>
              Completed Tasks: {data?.completed?.length || 0}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, sm: 6, lg: 4, xs: 6 }}>
            <Text fw={"bolder"}>
              Incomplete Tasks: {data?.incompleted?.length || 0}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, sm: 6, lg: 4, xs: 6 }}>
            <Text fw={"bolder"}>
              Completion Percentage: {completationPercentage}%
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, sm: 6, lg: 4, xs: 6 }}>
            <Text fw={"bolder"}>Total Points: {totalPoints}</Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, sm: 6, lg: 4, xs: 6 }}>
            <div className="flex items-center gap-1">
              <Text fw={"bolder"} className="capitalize">
                Trophy: {trophy}
              </Text>
              {trophy !== "none" && (
                <Image
                  src={`https://runescape.wiki/images/Catalyst_${trophy}_trophy.png?769a6`}
                  w={21}
                />
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Paper>
      <Paper shadow="sm" w={"100%"} p="md" withBorder>
        <Title order={3}>Skills</Title>
        <Divider my="md" />
        <Grid>
          {skills?.map((skill) => (
            <Grid.Col
              key={skill}
              span={{ base: 6, md: 2, sm: 3, lg: 1, xs: 4 }}
            >
              <Box className="flex gap-2 rounded border-1 border-slate-400 flex-col p-1 shadow-sm">
                <Image
                  className="self-start"
                  src={`https://runescape.wiki/images/thumb/${skill}-icon.png/21px-${skill}-icon.png?93d2b`}
                  w={21}
                />
                <Text className="self-end" size="xs" fw={700}>
                  {skillData[skill as keyof typeof skillData]} /{" "}
                  {SkillMax[skill as keyof typeof SkillMax]}
                </Text>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
        <Box className="flex justify-end mt-3">
          <Box
            className="flex gap-2 rounded border-1 border-slate-400 flex-col p-1 shadow-sm"
            w={"10%"}
          >
            <Image
              className="self-start"
              src={"https://runescape.wiki/images/Skills_icon.png?51831"}
              w={21}
            />
            <Text className="self-end" size="xs" fw={700}>
              {totalLvl} / {realTotal}
            </Text>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
