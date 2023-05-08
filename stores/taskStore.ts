import { defineStore } from "pinia";

interface Task {
  id: number;
  uuid: string;
  title: string;
  color: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
  didFetchFail: boolean;
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
  },
};

export const useTasksStore = defineStore("tasks", opts);
