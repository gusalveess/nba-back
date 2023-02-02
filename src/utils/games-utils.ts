import axios from "axios";

async function GamesInLive() {
  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: { live: "all" },
    headers: {
      "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  const promise = await axios.request(options);
  return promise.data.response;
}

async function GamesPerDate(date: string) {
  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: { date: date },
    headers: {
      "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };
  const promise = await axios.request(options);
  return promise.data.response;
}

async function Teams() {
  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/teams",
    headers: {
      "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };
  const promise = await axios.request(options);
  return promise.data.response;
}

async function PlayerStatsByGameId(gameid: string) {
  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/players/statistics",
    params: { game: gameid },
    headers: {
      "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  const promise = await axios.request(options);
  return promise.data.response;
}

async function SearchPlayer() {
  const promise = await axios.get(
    "https://api.sportsdata.io/v3/nba/scores/json/Players?key=fffdddc54d6b415787ec39b4752281ae"
  );
  return promise.data;
}

function Correct(search: string) {
  const str = search.toLowerCase();
  const strArr = str.split(" ");

  const result = strArr
    .map((str) => {
      return str[0].toUpperCase() + str.substring(1);
    })
    .join(" ");
  return result;
}

const GamesUtils = {
  GamesInLive,
  GamesPerDate,
  Teams,
  SearchPlayer,
  Correct,
  PlayerStatsByGameId
};

export default GamesUtils;
