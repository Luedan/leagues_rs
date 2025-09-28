import type { MRT_RowSelectionState } from "mantine-react-table";
import type { Completed } from "~/types/responses";
import { taskData } from "./taskData";

export const SkillMax = {
  Attack: 99,
  Constitution: 99,
  Mining: 110,
  Strength: 99,
  Smithing: 110,
  Defence: 99,
  Fishing: 99,
  Ranged: 99,
  Cooking: 99,
  Prayer: 99,
  Crafting: 110,
  Firemaking: 110,
  Magic: 99,
  Fletching: 110,
  Woodcutting: 110,
  Runecrafting: 110,
  Dungeoneering: 120,
  Agility: 99,
  Herblore: 120,
  Thieving: 99,
  Slayer: 120,
  Farming: 120,
  Construction: 99,
  Hunter: 99,
  Summoning: 99,
  Divination: 99,
  Invention: 120,
  Archaeology: 120,
  Necromancy: 120,

  // metadata
  totalSkills: 29,
  totalLevel: 3095,
};

export const trophies = {
  bronze: 2000,
  iron: 4000,
  steel: 10000,
  mithril: 20000,
  adamant: 30000,
  rune: 45000,
  dragon: 60000,
};

export const validateRange = (points: number) => {
  if (points >= trophies.dragon) return "dragon";
  if (points >= trophies.rune) return "rune";
  if (points >= trophies.adamant) return "adamant";
  if (points >= trophies.mithril) return "mithril";
  if (points >= trophies.steel) return "steel";
  if (points >= trophies.iron) return "iron";
  if (points >= trophies.bronze) return "bronze";
  return "none";
};

export const objectHasKey = <T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T => {
  return Object.keys(obj).includes(key as string);
};

export const getTaskInIncompleteTask = (
  incompleted: Completed[],
  taskObj: MRT_RowSelectionState
) => {
  return incompleted.filter((task) => objectHasKey(taskObj, task.taskId)) || [];
};

export const separateTask = (tasks: Array<Number>) => {
  console.log(tasks)
  const completed: Completed[] = taskData.filter((task) =>
    tasks.includes(+task.taskId)
  );

  console.log(taskData)
  const incomplete: Completed[] = taskData.filter(
    (task) => !tasks.includes(+task.taskId)
  );
  return { completed, incomplete };
};
