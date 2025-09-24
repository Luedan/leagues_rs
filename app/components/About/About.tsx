import { Box, Paper, Text, Title, Divider, Group, Anchor, Image } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconSword,
} from "@tabler/icons-react";

export const AboutComponent = () => {
  return (
    <Box className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
      <Paper shadow="sm" p="xl" withBorder  bg={"oklch(20.8% 0.042 265.755)"}>
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
              🎮 Acerca de este proyecto
            </Title>
            <Text size="lg" className="leading-relaxed">
              Este es un <strong>fan website</strong> no oficial dedicado a los
              jugadores de RuneScape 3 que participan en las temporadas de
              Leagues. Aquí puedes consultar tu progreso, estadísticas de
              habilidades y el estado de completación de las League tasks.
            </Text>
          </div>

          <div>
            <Title order={3} mb="md">
              ⚡ Características
            </Title>
            <ul className="space-y-2">
              <li>📊 Visualización completa de estadísticas de habilidades</li>
              <li>✅ Seguimiento de tareas completadas e incompletas</li>
              <li>🏆 Sistema de trofeos basado en puntos obtenidos</li>
              <li>📍 Organización por regiones y localidades</li>
              <li>📱 Diseño responsive y moderno</li>
            </ul>
          </div>

          <div>
            <Title order={3} mb="md">
              🛠️ Tecnologías utilizadas
            </Title>
            <Text className="text-gray-600">
              Construido con React Router 7, TypeScript, Mantine UI,
              TailwindCSS, Zustand para manejo de estado y React Query para
              fetching de datos.
            </Text>
          </div>

          <div>
            <Title order={3} mb="md">
              ⚠️ Descargo de responsabilidad
            </Title>
            <Text size="sm" className="italic">
              Este es un proyecto de fans independiente y no está afiliado,
              respaldado o patrocinado por Jagex Ltd. RuneScape es una marca
              registrada de Jagex Ltd.
            </Text>
          </div>
        </div>
      </Paper>

      <Paper shadow="sm" p="xl" withBorder   bg={"oklch(20.8% 0.042 265.755)"} className="text-white">
        <Title order={3} mb="md">
          👨‍💻 Luedandev
        </Title>

        <Text mb="lg">Desarrollado con ❤️ por un apasionado del RuneScape</Text>

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
