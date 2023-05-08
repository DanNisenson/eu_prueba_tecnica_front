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
}

const opts = {
  state: (): State => {
    return {
      tasks: [],
    };
  },
  actions: {
    async setTasks() {
      const uri = "http://localhost:8080/v1/task";
      const { data } = await useFetch(uri);
      const tasks = data.value;
      this.tasks = tasks;
    },
  },
};

export const useTasksStore = defineStore("tasks", opts);
