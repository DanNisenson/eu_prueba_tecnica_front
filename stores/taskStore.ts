import { defineStore } from "pinia";
import ApiHelp from "~/helpers/apiHelp";
import { Task, State } from "~/types/storeTypes";

export const useTasksStore = defineStore("tasks", {
  state: (): State => {
    return {
      tasks: [],
      didFetchFail: "",
    };
  },

  actions: {
    async getAllTasks() {
      const slug = `/task/all`;
      const { data, error } = await ApiHelp.makeReq(slug, "GET");
      if (error.value) {
        this.setFailAlert(ApiHelp.errMsg("fetching"));
        return;
      }

      const tasks = data.value as Task[];
      tasks.sort((a: Task, b: Task) => a.id - b.id);
      this.tasks = tasks;
    },

    async addTask(title: string) {
      const slug = `/task`;
      const newTask = {
        id: 0,
        uuid: "",
        title,
        tag: `none`,
        completed: false,
      };
      const { data, error } = await ApiHelp.makeReq(slug, "POST", newTask);
      if (error.value) {
        this.setFailAlert(ApiHelp.errMsg("adding"));
        return;
      }

      this.tasks = [...this.tasks, data.value as Task];
    },

    async deleteTask(uuid: string) {
      const slug = `/task/${uuid}`;
      const { error } = await ApiHelp.makeReq(slug, "DELETE");
      if (error.value) {
        this.setFailAlert(ApiHelp.errMsg("deleting"));
        return;
      }

      this.tasks = this.tasks.filter((task: Task) => task.uuid !== uuid);
    },

    async updateTask(task: Task) {
      const slug = `/task`;
      const { data, error } = await ApiHelp.makeReq(slug, "PATCH", task);
      if (error.value) {
        const addMsg = `Or maybe you just changed stuff around really fast. Please be gentle. I'm not a robot. I swear.`;
        this.setFailAlert(ApiHelp.errMsg("updating") + addMsg);
        return;
      }

      this.tasks = this.tasks.map((t: Task) =>
        t.uuid === task.uuid ? (data.value as Task) : t
      );
    },

    async updateAllTasks(taskList: Task[]) {
      const slug = `/task/all`;
      const { error } = await ApiHelp.makeReq(slug, "PATCH", taskList);
      if (error.value) {
        this.setFailAlert(ApiHelp.errMsg("updating"));
        return;
      }
    },

    setFailAlert(msg: string) {
      this.didFetchFail = msg;
      setTimeout(() => {
        this.didFetchFail = "";
      }, 6000);
    },
  },
});
