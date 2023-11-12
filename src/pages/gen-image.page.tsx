import MainLayout from "./main.layout";
import { useLocation } from "react-router-dom";
import ScrapCard from "@/components/scrap/scrap-card";
import { useUserScrapStore } from "@/stores/user-lib";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@/components/ui/loading-indicator";

export interface GetImagePageState {
  scrapId: number;
}

export default function GenImagePage() {
  const location = useLocation();
  const locationState = location.state as GetImagePageState | null;

  const userScraps = useUserScrapStore((s) => s.userScraps);
  const scrap = locationState?.scrapId !== undefined && userScraps.find((v) => v.id === locationState.scrapId);

  const apiImage = useQuery({
    queryKey: ["gen-img", scrap],
    queryFn: () => new Promise((res) => setTimeout(res, 5000)),
  });

  const apiImageAlt = useQuery({
    queryKey: ["gen-img-alt", scrap],
    queryFn: () => new Promise((res) => setTimeout(res, 5200)),
  });

  if (!scrap) return <div>잘못된 접근입니다. {JSON.stringify(locationState)}</div>;

  return (
    <MainLayout contentClassName="py-8">
      <div className="pb-4 mb-4 border-b border-solid border-b-slate-300">
        <ScrapCard data={scrap} />
      </div>
      <section className="flex flex-row space-x-4">
        <div className="flex-1">
          <h6 className="text-lg font-bold text-center mb-4">without Readiary</h6>
          {apiImageAlt.status === "pending" ? (
            <div className="text-center p-4">
              <LoadingIndicator />
            </div>
          ) : (
            <div className="w-full h-96 max-h-96 bg-slate-600"></div>
          )}
        </div>
        <div className="flex-1">
          <h6 className="text-lg font-bold text-center mb-4">with Readiary</h6>
          {apiImage.status === "pending" ? (
            <div className="text-center p-4">
              <LoadingIndicator />
            </div>
          ) : (
            <div className="w-full h-96 max-h-96 bg-slate-600"></div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
