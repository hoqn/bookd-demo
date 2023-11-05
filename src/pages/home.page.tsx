import FormColumn from "@/components/form/form-col";
import MainLayout from "./main.layout";
import ScrapCard from "@/components/scrap/scrap-card";
import { UserScrap, UserScrapDraft } from "@/types/user-lib.types";
import { FormEventHandler, MouseEventHandler, useCallback, useMemo, useState } from "react";
import { useUserScrapStore } from "@/stores/user-lib";
import { useForm, Controller } from "react-hook-form";
import StepHead from "@/components/steps/step-head";
import Button from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import bookService from "@/api/book.service";

function BookSelectSection() {
  const {
    handleSubmit,
    register,
  } = useForm<{
    searchQuery: string;
  }>();

  const handleOnSubmit = useMemo(() => handleSubmit(({ searchQuery }) => {
    setSearchQuery(searchQuery);
  }), []);

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const {
    data: searchResult,
    isLoading,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["book-search", searchQuery],
    queryFn: () => bookService.searchByTitle(searchQuery!),
    enabled: !!searchQuery,
  });

  return (
    <section className="py-4">
      <StepHead stepIndex={1} stepTitle="도서 선택" />
      {/* 검색 */}
      <form className="flex flex-row" onSubmit={handleOnSubmit}>
        <input className="flex-1 w-0 rounded-lg px-2 outline outline-1 outline-slate-300 bg-slate-100 focus:ring leading-loose" {...register("searchQuery", { required: true })} />
        <Button className="flex-none ml-2 rounded-lg" tint="primary" intent="contained" type="submit">검색</Button>
      </form>
      {/* 검색 결과 */}
      {isLoading
        ? <div>검색 중...</div>
        :
        !isPending &&
        <>
          <div className="my-4">총 {searchResult?.response.numFound}개의 책이 검색되었어요.</div>
          <ul className="card overflow-hidden -mx-2 divide-y">
            {
              searchResult?.response.docs && (Array.isArray(searchResult.response.docs.doc) ? searchResult.response.docs.doc : [searchResult.response.docs.doc]).map((data) => (
                <li key={data.isbn13} className="flex p-4 border-slate-300 cursor-pointer active:bg-slate-300 transition">
                  <div className="flex-0 mr-4">
                    <img width={72} height={96} className="rounded-lg shadow" src={data.bookImageURL} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg">
                      {data.bookname}
                    </div>
                    <div className="font-normal text-sm">
                      {data.authors}
                    </div>
                    <div className="font-normal text-xs mt-2 opacity-50">
                      {data.isbn13}
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </>
      }
    </section>
  )
}

function ScrapSection() {
  const { userScraps, addUserScrap, deleteUserScrap } = useUserScrapStore();

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<AddScrapFormInputs>();

  const handleOnSubmit = useMemo(() =>
    handleSubmit((data) => {
      addUserScrap(data);
      reset({ memo: "", scrap: "", });
    }), []);

  return (
    <section className="py-4">
      <StepHead stepIndex={2} stepTitle="스크랩" />
      {/* 신규 추가 폼 */}
      <form className="-mx-2 rounded-2xl bg-slate-100 border border-solid border-slate-300 p-4" onSubmit={handleOnSubmit}>
        <FormColumn control={control} title="스크랩" name="scrap" rules={{ required: true, }} />
        <FormColumn className="mt-4" control={control} title="메모" description="이 스크랩에 대한 생각이나 메모를 적어주세요" name="memo" />
        {/* <button type="submit" >추가</button> */}
        <Button className="block w-full mt-4 rounded-lg" tint="primary" intent="contained" type="submit">추가</Button>
      </form>
      <hr className="my-4" />
      {/* 스크랩 목록 */}
      <div className="space-y-4">
        {
          userScraps.map((data) => (
            <ScrapCard className="-mx-2" key={data.id} data={data} onDeleteButtonClick={() => {
              deleteUserScrap(data.id);
            }} />
          ))
        }
      </div>
    </section>
  )
}

interface AddScrapFormInputs extends UserScrapDraft { }

export default function HomePage() {
  return <MainLayout>
    <BookSelectSection />
    <ScrapSection />
  </MainLayout>
}