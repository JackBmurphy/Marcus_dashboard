import { BuildPlanClient, BuildPlanData } from "./client";
import rawData from "@/data/build-plan.json";

export default function BuildPlanPage() {
  return <BuildPlanClient data={rawData as unknown as BuildPlanData} />;
}
