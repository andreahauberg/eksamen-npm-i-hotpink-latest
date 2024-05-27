import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  return (
    <>
      <section className="grid justify-center">
        <div className="flex justify-center">
          <div className="w-4/6 pt-16	pb-12">
            <Skeleton borderRadius height="129px" />
          </div>
        </div>
        <div className="flex justify-between py-5">
          <div className="w-2/6">
            <Skeleton borderRadius height="64px" />
          </div>
          <div className="w-3/6">
            <Skeleton borderRadius height="64px" />
          </div>
        </div>
        <div className="grid grid-cols-2 py-5 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="288px" width="331px" />
          </div>
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="288px" width="331px" />
          </div>
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="288px" width="331px" />
          </div>
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="288px" width="331px" />
          </div>
        </div>
      </section>
    </>
  );
}
