export interface IResponseRS {
  username: string;
  timestamp: Date;
  levels: { [key: string]: number };
  incompleted: Completed[];
  completed: Completed[];
  error?: boolean | null;
  message?: string | null;
}

export interface Completed {
  taskId: string;
  locality: Locality;
  task: string;
  information: null | string;
  requirements: string;
  points: string;
  taskTier: string;
  completion: string;
}

export enum Locality {
  Anachronia = "Anachronia",
  AsgarniaBurthorpe = "Asgarnia: Burthorpe",
  AsgarniaFalador = "Asgarnia: Falador",
  AsgarniaPortSarim = "Asgarnia: Port Sarim",
  AsgarniaTaverley = "Asgarnia: Taverley",
  DesertGeneral = "Desert: General",
  DesertMenaphos = "Desert: Menaphos",
  ElvenLandsTirranwn = "Elven Lands: Tirranwn",
  FremennikLunarIsles = "Fremennik: Lunar Isles",
  FremennikMainland = "Fremennik: Mainland",
  Global = "Global",
  KandarinArdougne = "Kandarin: Ardougne",
  KandarinFeldipHills = "Kandarin: Feldip Hills",
  KandarinGnomes = "Kandarin: Gnomes",
  KandarinSeersVillage = "Kandarin: Seers Village",
  KandarinYanille = "Kandarin: Yanille",
  Karamja = "Karamja",
  MisthalinCityOfUm = "Misthalin: City of Um",
  MisthalinDraynorVillage = "Misthalin: Draynor Village",
  MisthalinEdgeville = "Misthalin: Edgeville",
  MisthalinFortForinthry = "Misthalin: Fort Forinthry",
  MisthalinLumbridge = "Misthalin: Lumbridge",
  MisthalinVarrock = "Misthalin: Varrock",
  Morytania = "Morytania",
  WildernessDaemonheim = "Wilderness: Daemonheim",
  WildernessGeneral = "Wilderness: General",
}
