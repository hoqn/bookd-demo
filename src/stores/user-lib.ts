import { UserBook, UserScrap, UserScrapDraft } from "@/types/user-lib.types";
import { create } from "zustand";

interface UserScrapStore {
  userScraps: UserScrap[];
  addUserScrap: (data: UserScrapDraft) => void;
  deleteUserScrap: (id: number) => void;
  __userScrapIdCursor: number;
}

export const useUserScrapStore = create<UserScrapStore>((set, get) => ({

  // 스크랩
  userScraps: [] as UserScrap[],
  addUserScrap: (data: UserScrapDraft) => {
    const { __userScrapIdCursor, userScraps } = get();
    set({ userScraps: [...userScraps, { ...data, id: __userScrapIdCursor }], __userScrapIdCursor: __userScrapIdCursor + 1 });
  },
  deleteUserScrap: (id: number) => set({ userScraps: get().userScraps.filter((value) => value.id !== id) }),
  __userScrapIdCursor: 0,

} as const));

interface UserBookStore {
  userBook: UserBook | null;
  setUserBook(userBook: UserBook | null): void;
}

export const useUserBookStore = create<UserBookStore>((set) => ({
  userBook: null,
  setUserBook(userBook) {
    set({ userBook });
  },
} as const));
