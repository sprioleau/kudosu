export const SUDOKU_PUZZLE_SIZE = 9;

export const MINIMUM_PROGRESS_PERCENTAGE = 15;

export const DAYS_IN_YEAR = 365;

export const STORAGE_KEYS = {
  LOCAL_STORAGE: {
    CURRENT_GAME_STATE: "current_game_state",
  },
  INDEXEDDB: {
    NAME: "kudosu",
    STORE_NAME: "games_played",
  }
}

export const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
);

