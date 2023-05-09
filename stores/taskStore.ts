import { defineStore } from "pinia";

interface Task {
  id?: number;
  uuid?: string;
  title: string;
  color: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
  didFetchFail: boolean;
}

interface UseFetchOptions {
  method?: string;
  body?: Task;
}

const opts = {
  state: (): State => {
    return {
      tasks: [],
      didFetchFail: false,
    };
  },
  actions: {
    async getAllTasks() {
      const uri = "http://localhost:8080/v1/task";
      const { data } = await useFetch(uri);

      if (data.value === null) {
        this.didFetchFail = true;
        return;
      }

      const tasks = data.value;
      this.tasks = tasks;
    },

    resetDidFetchFail() {
      this.didFetchFail = false;
    },

    async addTask(title: string) {
      const newTask = {
        title,
        color: "white",
        completed: false,
      };

      const config: UseFetchOptions = {
        method: "POST",
        body: newTask,
      };

      const uri = "http://localhost:8080/v1/task";
      const { data } = await useFetch(uri, config);

      this.tasks = [...this.tasks, data.value];
    },
  },
};

export const useTasksStore = defineStore("tasks", opts);
