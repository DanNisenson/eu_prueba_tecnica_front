import { defineStore } from "pinia";
import { Task } from "~/types/Task";

interface State {
  tasks: Task[];
  didFetchFail: boolean;
}

interface UseFetchOptions {
  method?: string;
  body?: Task | Task[];
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
      const uri = "http://localhost:8080/v1/task/all";
      const { data } = await useFetch(uri);

      if (!data.value) {
        this.didFetchFail = true;
        return;
      }

      const tasks = data.value;
      tasks.sort((a: Task, b: Task) => a.id - b.id);
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

    async deleteTask(uuid: string) {
      const uri = `http://localhost:8080/v1/task/${uuid}`;
      const config: UseFetchOptions = {
        method: "DELETE",
      };

      const { data } = await useFetch(uri, config);

      this.tasks = this.tasks.filter((task: Task) => task.uuid !== uuid);
    },

    async updateTask(task: Task) {
      const uri = `http://localhost:8080/v1/task/`;
      const config: UseFetchOptions = {
        method: "PATCH",
        body: task,
      };

      const { data } = await useFetch(uri, config);

      this.tasks = this.tasks.map((t: Task) =>
        t.uuid === task.uuid ? data.value : t
      );
    },

    async updateAllTasks(taskList: Task[]) {
      console.log("patchreq", taskList);
      const uri = `http://localhost:8080/v1/task/all`;
      const config: UseFetchOptions = {
        method: "PATCH",
        body: taskList,
      };

      const { data } = await useFetch(uri, config);
      console.log("response", data.value);

      // this.tasks = taskList;
    },
  },
};

export const useTasksStore = defineStore("tasks", opts);
