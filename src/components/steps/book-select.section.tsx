import { useForm } from "react-hook-form";
import StepHead from "./step-head";
import Button from "../ui/button";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import bookService from "@/api/book.service";
import TabsScaffold from "../ui/tabs-scaffold";
import { useDialog } from "../ui/dialog";
import LoadingIndicator from "../ui/loading-indicator";
import { useUserBookStore } from "@/stores/user-lib";
import { UserBook } from "@/types/user-lib.types";
import StepScaffold from "./step-scaffold";

export default function BookSelectSection() {
  const { userBook, setUserBook } = useUserBookStore();
  return (
    <StepScaffold index={1} title="도서 선택">
      {!!userBook ? (
        <div className="card bg-slate-500 text-white p-4 block -mx-2 mb-4">
          <div className="text-sm">현재 선택된 도서</div>
          <div className="text-base font-bold">{userBook?.title}</div>
          <div className="text-sm opacity-50">{userBook?.isbn}</div>
          <div className="text-right pt-2">
            <Button onClick={() => setUserBook(null)}>다시 선택</Button>
          </div>
        </div>
      ) : (
        <TabsScaffold
          tabData={[
            {
              tabValue: "title",
              displayValue: "책 제목으로 검색",
              content: (
                <div className="py-4">
                  <SearchByTitleSection />
                </div>
              ),
            },
            {
              tabValue: "isbn",
              displayValue: "ISBN으로 검색",
              content: (
                <div className="py-4">
                  <BookDetailSection />
                </div>
              ),
            },
          ]}
          defaultTabValue="title"
        />
      )}
    </StepScaffold>
  );
}

/**
 * 책 세부 정보 검색 (thru ISBN)
 */
function BookDetailSection() {
  const { handleSubmit, register, reset } = useForm<{ isbn: string }>();

  const handleOnSubmit = useMemo(
    () =>
      handleSubmit(({ isbn }) => {
        reset({ isbn: "" });
        setIsbn(isbn);
      }),
    []
  );

  const [isbn, setIsbn] = useState<string | null>(null);

  const {
    data: searchResult,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["book-detail", isbn],
    queryFn: () => bookService.getBookDetail(isbn!),
    enabled: !!isbn,
  });

  return (
    <>
      <form className="flex flex-row" onSubmit={handleOnSubmit}>
        <input
          className="flex-1 w-0 rounded-lg px-2 outline outline-1 outline-slate-300 bg-slate-100 focus:ring leading-loose"
          placeholder="ISBN"
          {...register("isbn", { required: true })}
        />
        <Button className="flex-none ml-2 rounded-lg" size="md" tint="primary" intent="contained" type="submit">
          검색
        </Button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        !isPending && (
          <>
            <div className="card">{searchResult && searchResult.response.detail[0].book.bookname}</div>
          </>
        )
      )}
    </>
  );
}

/**
 * 제목으로 책 검색
 */
function SearchByTitleSection() {
  const { userBook, setUserBook } = useUserBookStore();

  const { handleSubmit, register } = useForm<{
    searchQuery: string;
  }>();

  const handleOnSubmit = useMemo(
    () =>
      handleSubmit(({ searchQuery }) => {
        setSearchQuery(searchQuery);
      }),
    []
  );

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const {
    data: searchResult,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["book-search", searchQuery],
    queryFn: () => bookService.searchByTitle(searchQuery!),
    enabled: !!searchQuery,
  });

  const { Component: Dialog, setOpen } = useDialog();

  const handleOnItemClick = useCallback((data: UserBook) => {
    setSelectedBook(data);
    setOpen(true);
  }, []);

  const [selectedBook, setSelectedBook] = useState<UserBook | null>(null);

  return (
    <>
      <Dialog>
        <div className="p-4">
          <h2 className="font-bold text-lg">도서 선택</h2>
          <div className="font-normal text-sm mt-2">아래의 도서를 선택하시겠어요?</div>
        </div>
        <div className="card mx-4 p-4">
          <div className="flex flex-row text-base font-bold">{selectedBook?.title}</div>
          <div className="flex flex-row text-sm font-normal">{selectedBook?.isbn}</div>
        </div>
        <div className="p-4 text-right space-x-2">
          <Button intent="tonal" tint="neutral" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            intent="contained"
            tint="primary"
            onClick={() => {
              if (!!selectedBook) setUserBook(selectedBook);
              setOpen(false);
            }}
          >
            선택할게요
          </Button>
        </div>
      </Dialog>
      <form className="flex flex-row" onSubmit={handleOnSubmit}>
        <input
          className="flex-1 w-0 rounded px-2 outline outline-1 outline-slate-300 bg-slate-100 focus:ring leading-loose"
          placeholder="제목을 입력하세요"
          {...register("searchQuery", { required: true })}
        />
        <Button className="flex-none ml-2" tint="primary" intent="contained" type="submit">
          검색
        </Button>
      </form>
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <LoadingIndicator />
        </div>
      ) : (
        !isPending && (
          <>
            <div className="my-4">총 {searchResult?.response.numFound}개의 책이 검색되었어요.</div>
            <ul className="card overflow-hidden -mx-2 divide-y max-h-[32rem] overflow-y-auto">
              {searchResult?.response.docs &&
                (Array.isArray(searchResult.response.docs.doc)
                  ? searchResult.response.docs.doc
                  : [searchResult.response.docs.doc]
                ).map((data) => (
                  <li
                    key={data.isbn13}
                    className="flex p-4 border-slate-300 cursor-pointer active:bg-slate-300 transition"
                    onClick={() =>
                      handleOnItemClick({ isbn: data.isbn13, title: data.bookname, authors: data.authors })
                    }
                  >
                    <div className="flex-0 mr-4">
                      <img width={72} height={96} className="rounded-lg shadow" src={data.bookImageURL} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{data.bookname}</div>
                      <div className="font-normal text-sm">{data.authors}</div>
                      <div className="font-normal text-xs mt-2 opacity-50">{data.isbn13}</div>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )
      )}
    </>
  );
}
