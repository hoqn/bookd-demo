import BookSelectSection from "@/components/steps/book-select.section";
import ScrapListSection from "@/components/steps/scrap-list.section";
import Button from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "./main.layout";

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
