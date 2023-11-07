import ApiClient from "./core";
import { UserScrapDto } from "./types/diary.dto";

class DiaryService extends ApiClient {
  constructor() {
    super();
  }

  public async addScrap() {
    return this.baseClient
      .post("/diary/scrap", {
        content
      } satisfies UserScrapDto)
  }
}

const diaryService = new DiaryService();

export default diaryService;
