import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "/api"; //TODO: proxy 서버 구성으로 임시로 해놓음

/* Decorators */

function handleError<This, Args extends any[], Return extends Promise<any>>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  return function (this: This, ...args: Args): Return {
    const result = target.call(this, ...args);
    result.catch(e => {
      console.log(e);
    });

    return result;
  }
}

export { handleError };

/* Client */

abstract class ApiClient {
  readonly baseClient: AxiosInstance;

  protected constructor() {
    const baseURL = BASE_URL;

    this.baseClient = axios.create({
      baseURL,
      timeout: 6000,
      headers: {
        "Content-Type": "json",
        "Origin": null,
      },
      withCredentials: false,
    });
  }

  // TODO: Error handling
}

export default ApiClient;
