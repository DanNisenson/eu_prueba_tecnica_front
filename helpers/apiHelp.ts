import { Method } from "~/types/helpersTypes";
import { Task } from "~/types/storeTypes";

class ApiHelp {
  static getURI() {
    return `http://localhost:8080/v1`;
  }

  static async makeReq(slug: string, method: Method, body?: Task | Task[]) {
    return await useFetch(this.getURI() + slug, {
      method: method,
      body: body,
    });
  }

  static errMsg(action: string) {
    return `There's been a problem ${action} your tasks. Check your internet connection.`;
  }
}

export default ApiHelp;
