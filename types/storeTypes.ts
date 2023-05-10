export interface Task {
  id: number;
  uuid: string;
  title: string;
  tag: string;
  completed: boolean;
}

export interface State {
  tasks: Task[];
  didFetchFail: string;
}

export interface UseFetchOptions {
  method?: string;
  body?: Task | Task[];
}
