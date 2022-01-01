export interface subTimer {
  type: string;
  length: number;
}

export interface Timer {
  _id: string;
  uid: string;
  title: string;
  color: string;
  isDarkMode: boolean;
  timers: Array<subTimer>;
}

export interface TimerInput {
  uid: string;
  title: string;
  color: string;
  isDarkMode: boolean;
  timers: Array<subTimer>;
}
