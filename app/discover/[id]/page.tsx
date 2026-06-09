import { INVENTORY } from "@/lib/inventory";
import WatchDetailClient from "./WatchDetailClient";

export function generateStaticParams() {
  return INVENTORY.map((w) => ({ id: w.id }));
}

export default async function WatchDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WatchDetailClient id={id} />;
}
