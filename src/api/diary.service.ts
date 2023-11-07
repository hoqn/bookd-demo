import ApiClient from "./core";
import { UserScrapDto } from "./types/diary.dto";

class DiaryService extends ApiClient {
  constructor() {
    super();
  }

  public async addScrap(dto: UserScrapDto) {
    return this.baseClient
      .post("/diary/scrap", {
        ...dto
      } satisfies UserScrapDto)
  }
}

const diaryService = new DiaryService();

export default diaryService;
