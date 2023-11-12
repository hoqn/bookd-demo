import { UserBook, UserScrap, UserScrapDraft } from "@/types/user-lib.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserScrapStore {
  userScraps: UserScrap[];
  addUserScrap: (data: UserScrapDraft) => void;
  deleteUserScrap: (id: number) => void;
  __userScrapIdCursor: number;
}

export const useUserScrapStore = create(persist<UserScrapStore>((set, get) => ({

  // 스크랩
  userScraps: [] as UserScrap[],
  addUserScrap: (data: UserScrapDraft) => {
    const { __userScrapIdCursor, userScraps } = get();
    set({ userScraps: [...userScraps, { ...data, id: __userScrapIdCursor }], __userScrapIdCursor: __userScrapIdCursor + 1 });
  },
  deleteUserScrap: (id: number) => set({ userScraps: get().userScraps.filter((value) => value.id !== id) }),
  __userScrapIdCursor: 0,

}), {
  name: "user-scrap",
  storage: createJSONStorage(() => sessionStorage),
}));

interface UserBookStore {
  userBook: UserBook | null;
  setUserBook(userBook: UserBook | null): void;
}

export const useUserBookStore = create(persist<UserBookStore>((set) => ({
  userBook: null,
  setUserBook(userBook) {
    set({ userBook });
  },
}), {
  name: "user-book",
  storage: createJSONStorage(() => localStorage),
}));
