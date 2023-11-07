interface UserScrap extends UserScrapDraft {
  id: number;
}

interface UserScrapDraft {
  scrap: string;
  memo: string;
}

interface UserBook {
  isbn: string;
  title: string;
  authors: string;
}

export type { UserScrap, UserScrapDraft, UserBook };
