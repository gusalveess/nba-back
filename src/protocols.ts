export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type SignInType = {
  email: string,
  password: string
}

export type date = {
  date: string
}

export type games = {
  id: number,
  status: {
    long: string
  },
  teams: {
    visitors: {
      nickname: string,
      logo: string
    },
    home: {
      nickname: string,
      logo: string
    }
  },
  scores: {
    visitors: {
      points: number | null
    },
    home: {
      points: number | null
    }
  }
}


export type data = {
  id: number,
  league: string,
  season: number,
  date: {
    start: string,
    end: null,
    duration: null,
    stage: number
  },
  status: {
  clock: string | null,
  halftime: boolean,
  short: number,
  long: string
  },
  periods: {
   current: number,
   total: number,
   endOfPeriod: boolean
  },
  arena: {
   name: null,
   city: null,
   state: null,
   country: null
  },
  teams: {
   visitors: {
    id: number,
    name: string,
    nickname: string,
    code: string,
    logo: string
   }
  ,
   home: {
    id: number,
    name: string,
    nickname: string,
    code: string,
    logo: string
   }
  },
  scores: {
   visitors: {
    win: number,
    loss: number,
    points: number
   },
   home: {
    win: number,
    loss: number,
    points: number
   }
  }
  }

  export type teams = {
   id: number,
   name: string,
   nickname: string,
   code: string,
   city: string,
   logo: string,
   allStar: boolean,
   nbaFranchise: boolean,
   leagues: {
     standard: {
       conference: string,
       division: string
      },
     vegas: {
       conference: string,
       division: null
      },
     utah: {
       conference: string,
       division: string
      },
     sacramento: {
       conference: string,
       division: string
      }
    }
  }