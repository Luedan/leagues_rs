import { Box, Paper, Text, Title, Divider, Group, Anchor, Image } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconSword,
} from "@tabler/icons-react";

export const AboutComponent = () => {
  return (
    <Box className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
      <Paper shadow="sm" p="xl" withBorder bg={"oklch(20.8% 0.042 265.755)"}>
        <Group mb="md" align="center" gap="sm">
          <Image src="/logo.png" w={48} />
          <Title order={1} c="#f4e2b0">
            RuneScape Leagues Lookup
          </Title>
        </Group>

        <Divider my="lg" />

        <div className="space-y-6 text-white">
          <div>
            <Title order={3} mb="md">
              🎮 About this project
            </Title>
            <Text size="lg" className="leading-relaxed">
              This is an <strong>unofficial fan website</strong> dedicated to RuneScape 3 players participating in Leagues seasons. Here you can check your progress, skill statistics, and the completion status of League tasks.
            </Text>
          </div>

          <div>
            <Title order={3} mb="md">
              ⚡ Features
            </Title>
            <ul className="space-y-2">
              <li>📊 Full visualization of skill statistics</li>
              <li>✅ Tracking of completed and incomplete tasks</li>
              <li>🏆 Trophy system based on points earned</li>
              <li>📍 Organization by regions and locations</li>
              <li>📱 Responsive and modern design</li>
            </ul>
          </div>

          <div>
            <Title order={3} mb="md">
              🛠️ Technologies used
            </Title>
            <Text className="text-gray-600">
              Built with React Router 7, TypeScript, Mantine UI, TailwindCSS, Zustand for state management, and React Query for data fetching.
            </Text>
          </div>

          <div>
            <Title order={3} mb="md">
              ⚠️ Disclaimer
            </Title>
            <Text size="sm" className="italic">
              This is an independent fan project and is not affiliated with, endorsed, or sponsored by Jagex Ltd. RuneScape is a registered trademark of Jagex Ltd.
            </Text>
          </div>
        </div>
      </Paper>

      <Paper shadow="sm" p="xl" withBorder bg={"oklch(20.8% 0.042 265.755)"} className="text-white">
        <Title order={3} mb="md">
          👨‍💻 Luedandev
        </Title>

        <Text mb="lg">Developed with ❤️ by a passionate RuneScape fan</Text>

        <Group gap="md">
          <Anchor
            href="https://www.linkedin.com/in/luedandev/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <IconBrandLinkedin size={20} />
            <Text fw={500}>LinkedIn</Text>
          </Anchor>

          <Anchor
            href="https://github.com/Luedan/leagues_rs"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <IconBrandGithub size={20} />
            <Text fw={500}>GitHub Repository</Text>
          </Anchor>
        </Group>
      </Paper>
    </Box>
  );
};
