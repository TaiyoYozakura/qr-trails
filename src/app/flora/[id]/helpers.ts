import { plants } from "@/data";

export function getPlantIndex(id: string): number {
  const index = plants.findIndex((p) => p.id === id);
  return index === -1 ? -1 : index;
}

export function getPlantByIndex(index: number) {
  if (index < 0 || index >= plants.length) return undefined;
  return plants[index];
}