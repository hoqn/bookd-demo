import { useUserScrapStore } from "@/stores/user-lib";
import { UserScrapDraft } from "@/types/user-lib.types";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import FormColumn from "../form/form-col";
import StepScaffold from "./step-scaffold";
import { useDialog } from "../ui/dialog";
import Button from "../ui/button";
import ScrapCard from "../scrap/scrap-card";

interface AddScrapFormInputs extends UserScrapDraft {}

export default function ScrapListSection() {
  const { userScraps, addUserScrap, deleteUserScrap } = useUserScrapStore();

  const { Component: Dialog, setOpen } = useDialog();

  const { handleSubmit, control, reset } = useForm<AddScrapFormInputs>();

  const handleOnSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        addUserScrap(data);
        reset({ memo: "", scrap: "" });
        setOpen(false);
      }),
    []
  );

  return (
    <StepScaffold index="2" title="스크랩">
      <Dialog>
        {/* 신규 추가 폼 */}
        <form
          // className="-mx-2 rounded-2xl bg-slate-100 border border-solid border-slate-300 p-4"
          className="p-4"
          onSubmit={handleOnSubmit}
        >
          <FormColumn control={control} title="스크랩" name="scrap" rules={{ required: true }} />
          <FormColumn
            className="mt-4"
            control={control}
            title="메모"
            description="이 스크랩에 대한 생각이나 메모를 적어주세요"
            name="memo"
          />
          {/* <button type="submit" >추가</button> */}
          <Button className="block w-full mt-4 rounded-lg" tint="primary" intent="contained" type="submit">
            확인
          </Button>
        </form>
      </Dialog>
      <div className="text-right pb-4">
        <Button tint="primary" onClick={() => setOpen(true)}>새로운 스크랩 추가</Button>
      </div>
      {/* 스크랩 목록 */}
      <div className="space-y-4">
        {userScraps.map((data) => (
          <ScrapCard
            className="-mx-2"
            key={data.id}
            data={data}
            onDeleteButtonClick={() => {
              deleteUserScrap(data.id);
            }}
          />
        ))}
      </div>
    </StepScaffold>
  );
}
