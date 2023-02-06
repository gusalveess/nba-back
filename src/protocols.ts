import { Prisma, userInfo } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type date = {
  DateGame: string;
};

export type data = {
  id: number;
  league: string;
  season: number;
  date: {
    start: string;
    end: null;
    duration: null;
    stage: number;
  };
  status: {
    clock: string | null;
    halftime: boolean;
    short: number;
    long: string;
  };
  periods: {
    current: number;
    total: number;
    endOfPeriod: boolean;
  };
  arena: {
    name: null;
    city: null;
    state: null;
    country: null;
  };
  teams: {
    visitors: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
    home: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
  };
  scores: {
    visitors: {
      win: number;
      loss: number;
      points: number;
    };
    home: {
      win: number;
      loss: number;
      points: number;
    };
  };
};

export type teams = {
  id: number;
  name: string;
  nickname: string;
  code: string;
  city: string;
  logo: string;
  allStar: boolean;
  nbaFranchise: boolean;
  leagues: {
    standard: {
      conference: string;
      division: string;
    };
    vegas: {
      conference: string;
      division: null;
    };
    utah: {
      conference: string;
      division: string;
    };
    sacramento: {
      conference: string;
      division: string;
    };
  };
};

export type commentData = Omit<Prisma.commentsUncheckedCreateInput, "id">;

export type playerSearch = {
  PlayerID: number;
  SportsDataID: string;
  Status: string;
  TeamID: number;
  Team: string;
  Jersey: number;
  PositionCategory: string;
  Position: string;
  FirstName: string;
  LastName: string;
  Height: number;
  Weight: number;
  BirthDate: string;
  BirthCity: string;
  BirthState: string;
  BirthCountry: string;
  HighSchool: null;
  College: string;
  Salary: number;
  PhotoUrl: string;
  Experience: number;
  SportRadarPlayerID: string;
  RotoworldPlayerID: number;
  RotoWirePlayerID: number;
  FantasyAlarmPlayerID: number;
  StatsPlayerID: number;
  SportsDirectPlayerID: number;
  XmlTeamPlayerID: number;
  InjuryStatus: string;
  InjuryBodyPart: string;
  InjuryStartDate: null;
  InjuryNotes: string;
  FanDuelPlayerID: number;
  DraftKingsPlayerID: number;
  YahooPlayerID: number;
  FanDuelName: string;
  DraftKingsName: string;
  YahooName: string;
  DepthChartPosition: string;
  DepthChartOrder: number;
  GlobalTeamID: number;
  FantasyDraftName: string;
  FantasyDraftPlayerID: number;
  UsaTodayPlayerID: number;
  UsaTodayHeadshotUrl: string;
  UsaTodayHeadshotNoBackgroundUrl: string;
  UsaTodayHeadshotUpdated: string;
  UsaTodayHeadshotNoBackgroundUpdated: string;
  NbaDotComPlayerID: number;
};

export type CommentsResult = {
  id: number;
  comment: string;
  gameid: number;
  userid: number;
  users: {
    id: number;
    name: string;
    picture: string;
  };
};

export type PlayerStats = {
  player: {
    id: number;
    firstname: string;
    lastname: string;
  };
  team: {
    id: number;
    name: string;
    nickname: string;
    code: string;
    logo: string;
  };
  game: {
    id: number;
  };
  points: number;
  pos: string;
  min: string;
  fgm: number;
  fga: number;
  fgp: string;
  ftm: number;
  fta: number;
  ftp: string;
  tpm: number;
  tpa: number;
  tpp: string;
  offReb: number;
  defReb: number;
  totReb: number;
  assists: number;
  pFouls: number;
  steals: number;
  turnovers: number;
  blocks: number;
  plusMinus: string;
  comment: null;
};

export type TeamStats = {
  team: string
}

export type UserInfoBody = Omit<userInfo, "id" | "userid">;
