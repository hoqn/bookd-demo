import FormColumn from "@/components/form/form-col";
import ScrapCard from "@/components/scrap/scrap-card";
import BookSelectSection from "@/components/steps/book-select.section";
import StepHead from "@/components/steps/step-head";
import Button from "@/components/ui/button";
import { useUserScrapStore } from "@/stores/user-lib";
import { UserScrapDraft } from "@/types/user-lib.types";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "./main.layout";
import StepScaffold from "@/components/steps/step-scaffold";
import QuestionGenSection from "@/components/steps/question-generation.section";
import ImageGenSection from "@/components/steps/img-generation.section";
import ScrapListSection from "@/components/steps/scrap-list.section";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <MainLayout contentClassName="relative">
      <BookSelectSection />
      <hr />
      <ScrapListSection />
      {/* <QuestionGenSection />
      <ImageGenSection /> */}
      <div className="h-32"></div>
      <div className="fixed bottom-0 left-0 right-0">
        <div className="bg-gradient-to-t from-white to-transparent h-12" />
        <div className="container mx-auto p-4 bg-white">
          <Button as={Link} to="/questions" className="block text-center w-full shadow-lg" size="lg" tint="primary" intent="contained">
            질문 생성
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
