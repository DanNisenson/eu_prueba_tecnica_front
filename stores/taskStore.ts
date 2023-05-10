import { defineStore } from "pinia";
import { Task, State, UseFetchOptions } from "~/types/storeTypes";

export const useTasksStore = defineStore("tasks", {
  state: (): State => {
    return {
      tasks: [],
      didFetchFail: "",
    };
  },

  actions: {
    async getAllTasks() {
      const uri = "http://localhost:8080/v1/task/all";
      const { data, error } = await useFetch(uri);
      if (error.value) {
        const msg =
          "There's been a problem fetching your tasks. Make sure you're connected to the internet.";
        this.setFailAlert(msg);
        return;
      }

      const tasks = data.value as Task[];
      tasks.sort((a: Task, b: Task) => a.id - b.id);
      this.tasks = tasks;
    },

    async addTask(title: string) {
      const newTask = {
        id: 0,
        uuid: "",
        title,
        tag: "none",
        completed: false,
      };

      const config: UseFetchOptions = {
        method: "POST",
        body: newTask,
      };

      const uri = "http://localhost:8080/v1/task";
      const { data, error } = await useFetch(uri, config);
      if (error.value) {
        const msg = "There's been a problem adding your task.";
        this.setFailAlert(msg);
        return;
      }

      this.tasks = [...this.tasks, data.value as Task];
    },

    async deleteTask(uuid: string) {
      const uri = `http://localhost:8080/v1/task/${uuid}`;
      const config: UseFetchOptions = {
        method: "DELETE",
      };

      const { error } = await useFetch(uri, config);
      if (error.value) {
        const msg = "There's been a problem deleting your task.";
        this.setFailAlert(msg);
        return;
      }

      this.tasks = this.tasks.filter((task: Task) => task.uuid !== uuid);
    },

    async updateTask(task: Task) {
      const uri = `http://localhost:8080/v1/task/`;
      const config: UseFetchOptions = {
        method: "PATCH",
        body: task,
      };

      const { data, error } = await useFetch(uri, config);
      if (error.value) {
        const msg =
          "There's been a problem updating your task. Check your internet connection. Or maybe you just changed stuff around really fast. Please be gentle. I'm not a robot. I swear.";
        this.setFailAlert(msg);
        return;
      }

      this.tasks = this.tasks.map((t: Task) =>
        t.uuid === task.uuid ? (data.value as Task) : t
      );
    },

    async updateAllTasks(taskList: Task[]) {
      const uri = `http://localhost:8080/v1/task/all`;
      const config: UseFetchOptions = {
        method: "PATCH",
        body: taskList,
      };

      const { error } = await useFetch(uri, config);
      if (error.value) {
        const msg =
          "There's been a problem updating your tasks. Check your internet connection.";
        this.setFailAlert(msg);
        return;
      }
    },

    setFailAlert(msg: string) {
      this.didFetchFail = msg;
      setTimeout(() => {
        this.didFetchFail = "";
      }, 4000);
    },
  },
});
