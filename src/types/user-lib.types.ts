interface UserScrap extends UserScrapDraft {
  id: number;
}

interface UserScrapDraft {
  scrap: string;
  memo: string;
}

export type { UserScrap, UserScrapDraft };
