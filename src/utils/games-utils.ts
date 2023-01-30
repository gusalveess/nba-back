import axios from "axios";
import { games } from "../protocols";

function GamesInLive() {
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games',
        params: {live: 'all'},
        headers: {
          'X-RapidAPI-Key': '017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b',
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
      };

      const promise = axios.request(options);
      promise.then((response) => {
        const data = [
            {
                id: response.data.id,
                status: response.data.status.long,
                homeTeamPic: response.data.teams.home.logo,
                homeTeamNick: response.data.teams.home.nickname,
                homeTeamPoints: response.data.scores.home.points,
                visitorsTeamPic: response.data.teams.visitors.logo,
                visitorsTeamNick: response.data.teams.visitors.nickname,
                visitorsTeamPoints:  response.data.scores.visitors.points
            }
        ]
        return data
      });  
      promise.catch((err) => {
        console.log(err)
    })
}

async function GamesPerDate(date: string) {

const options = {
  method: 'GET',
  url: 'https://api-nba-v1.p.rapidapi.com/games',
  params: {date: date},
  headers: {
    'X-RapidAPI-Key': '017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b',
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  }
};
const promise = await axios.request(options);
return promise.data.response
}

async function Teams() {
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams',
        headers: {
          'X-RapidAPI-Key': '017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b',
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
      };
      const promise = await axios.request(options);
      return promise.data.response
}

async function SearchPlayer(name: string) {
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams',
        headers: {
          'X-RapidAPI-Key': '017c5418bcmshc2ae8324aa9861fp1c26dbjsncd47f788d19b',
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
      };
      const promise = await axios.request(options);
      return promise.data.response
}


const GamesUtils = {
    GamesInLive,
    GamesPerDate,
    Teams,
    SearchPlayer
}

export default GamesUtils;