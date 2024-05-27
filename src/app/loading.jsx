import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function App() {
  return (
    <>
      <div className=" grid grid-cols-gridContent">
        <div div className="pt-10 mb-20 col-start-3">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Skeleton count={2} />
              <br />
              <Skeleton circle height="70px" width="70px" />
              <br />
              <Skeleton />
            </div>
            <div>
              <Skeleton height="200px" />
            </div>
            <div className="col-span-2 pt-10">
              <Skeleton count={6} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
