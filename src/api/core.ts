import axios, { AxiosInstance } from "axios";

const BASE_URL = "/api"; //TODO: proxy 서버 구성으로 임시로 해놓음

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
