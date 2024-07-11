export type GameStatus = 'notPlaying' | 'Playing' | 'Lost' | 'Won'

export type Difficulty = 'easy' | 'medium'

export interface box {
  covered: boolean
  flag: boolean
  bomb: boolean
  bombsAround: number
  boxIndex: number
  rowIndex: number
}

export type board = box[][]