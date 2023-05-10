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

// export type UseFetchOptions = {
//   key?: string;
//   method?: string;
//   // query?: SearchParams;
//   // params?: SearchParams;
//   body?: RequestInit["body"] | Record<string, any>;
//   headers?: Record<string, string> | [key: string, value: string][] | Headers;
//   baseURL?: string;
//   server?: boolean;
//   lazy?: boolean;
//   immediate?: boolean;
//   // default?: () => DataT;
//   // transform?: (input: DataT) => DataT;
//   pick?: string[];
//   // watch?: WatchSource[];
// };
