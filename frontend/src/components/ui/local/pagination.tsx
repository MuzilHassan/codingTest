import { useSearchParams } from "react-router-dom";
import { Button } from "../button";

type props = {
  count: number;
  limit: number;
};
function ISSMPagination({ count, limit }: props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const pageCount = Math.ceil(count / limit);

  const nextPage = () => {
    if (current < pageCount) {
      searchParams.set("page", String(current + 1));
      setSearchParams(searchParams);
    }
  };

  const previousPage = () => {
    if (current > 1) {
      searchParams.set("page", String(current - 1));
      setSearchParams(searchParams);
    }
  };

  if (count <= limit) return null;

  return (
    <div className="flex items-center justify-between my-4 p-2 w-full">
      <p className="text-base font-medium">
        Showing{" "}
        <span className="font-semibold">{limit * (current - 1) + 1}</span> to{" "}
        <span className="font-semibold">
          {current === pageCount ? count : current * limit}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex items-center gap-4">
        <Button onClick={previousPage} disabled={current === 1}>
          Previous
        </Button>
        <Button onClick={nextPage} disabled={current === pageCount}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default ISSMPagination;
