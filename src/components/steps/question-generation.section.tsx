import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../ui/loading-indicator";
import StepScaffold from "./step-scaffold";

type UserQuestion = {
  setId: number;
  stackNum: number;
  question: string;
  answer: string | null;
};

const mockQuestions: UserQuestion[] = [
  {
    setId: 1,
    stackNum: 1,
    question: "동해물과 백두산이 마르고 닳도록?",
    answer: "이건 대답이에요.",
  },
  {
    setId: 2,
    stackNum: 1,
    question: "동해물과 백두산이 마르고 닳도록 2222?",
    answer: null,
  },
  {
    setId: 1,
    stackNum: 2,
    question: "동해물과 백두산이 마르고 닳도록 33?",
    answer: null,
  },
];

export default function QuestionGenSection() {
  const {
    data: questions,
    isLoading,
    // isPending,
  } = useQuery({
    queryKey: ["gen-q"],
    queryFn: async () =>
      new Promise<UserQuestion[]>((resolve) => {
        setTimeout(() => {
          resolve(mockQuestions);
        }, 2000);
      }),
    networkMode: "online",
  });

  return (
    <StepScaffold index={3} title="질문 생성">
      {isLoading ? (
        <div className="flex justify-center p-8">
          <LoadingIndicator />
        </div>
      ) : (
        <div>
          <ul className="divide-y">
            {/* {mockQuestions.map(({ setId, stackNum, question, answer }) => ( */}
            {questions?.map(({ question, answer }) => (
              <li className="py-4">
                <div className="mb-4 before:content-['Q.'] before:font-bold before:text-lg before:mr-2">{question}</div>
                <div className="before:content-['A.'] before:font-bold before:text-lg before:mr-2">{answer}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </StepScaffold>
  );
}
