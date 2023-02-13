"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
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
    const promise = await axios_1.default.request(options);
    return promise.data.response;
}
async function GamesPerDate(date) {
    const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/games",
        params: { date: date },
        headers: {
            "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
    };
    const promise = await axios_1.default.request(options);
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
    const promise = await axios_1.default.request(options);
    return promise.data.response;
}
async function PlayerStatsByGameId(gameid) {
    const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/players/statistics",
        params: { game: gameid },
        headers: {
            "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
    };
    const promise = await axios_1.default.request(options);
    return promise.data.response;
}
async function SearchPlayer() {
    const promise = await axios_1.default.get("https://api.sportsdata.io/v3/nba/scores/json/Players?key=fffdddc54d6b415787ec39b4752281ae");
    return promise.data;
}
function Correct(search) {
    const str = search.toLowerCase();
    const strArr = str.split(" ");
    const result = strArr
        .map((str) => {
        return str[0].toUpperCase() + str.substring(1);
    })
        .join(" ");
    return result;
}
async function GameStats(id) {
    const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/games",
        params: { id: id },
        headers: {
            "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
    };
    const promise = await axios_1.default.request(options);
    return promise.data.response;
}
async function Standings(conference) {
    console.log((0, dayjs_1.default)().year());
    console.log(conference);
    const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/standings",
        params: {
            league: "standard",
            season: (0, dayjs_1.default)().year(),
            conference: conference,
        },
        headers: {
            "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
    };
    const promise = await axios_1.default.request(options);
    console.log(promise.data.result);
    const result = promise.data.response;
    if (result.length === 0) {
        const options = {
            method: "GET",
            url: "https://api-nba-v1.p.rapidapi.com/standings",
            params: {
                league: "standard",
                season: (0, dayjs_1.default)().year() - 1,
                conference: conference,
            },
            headers: {
                "X-RapidAPI-Key": "017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b",
                "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
        };
        const promise = await axios_1.default.request(options);
        return promise.data.response;
    }
    return promise.data.result;
}
const GamesUtils = {
    GamesInLive,
    GamesPerDate,
    Teams,
    SearchPlayer,
    Correct,
    PlayerStatsByGameId,
    GameStats,
    Standings,
};
exports.default = GamesUtils;
