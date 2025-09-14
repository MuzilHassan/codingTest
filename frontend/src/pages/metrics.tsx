import { ISSMGetMetrics } from "@/api/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type metricsType = {
  averageRating: number;
  counts: { 1: number; 2: number; 3: number; 4: number; 5: number };
};
export default function ISSMMetrics() {
  const [metrics, setMetrics] = useState<metricsType | null>(null);
  console.log(metrics);
  useEffect(() => {
    const ISSMFetchMetrics = async () => {
      const data = await ISSMGetMetrics();
      setMetrics(data.data.metrics[0]);
    };
    ISSMFetchMetrics();
  }, []);

  if (!metrics) return <p>Loading...</p>;
  return (
    <Card className=" max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className=" text-center">Metrics</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p>Averate rating: {metrics?.averageRating}</p>

        <div>
          <h1>Counts:</h1>
          <ul>
            {Object.entries(metrics?.counts).map(([rating, count]) => (
              <li key={rating}>
                Rating {rating}: {count}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
