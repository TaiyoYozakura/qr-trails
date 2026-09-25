import type { VisualKind } from "@/types";
import { EcosystemIllustration } from "./ecosystem";
import { FlowerBedIllustration } from "./flowerbed";
import { GardenIllustration } from "./garden";
import { LeafIllustration } from "./leaf";
import { NeighborhoodIllustration } from "./neighborhood";
import { PlantIllustration } from "./plant";
import { PlaqueIllustration } from "./plaque";
import { RootsIllustration } from "./roots";
import { RoundaboutIllustration } from "./roundabout";
import { SeeSawIllustration } from "./seesaw";
import { ShadeIllustration } from "./shade";
import { SlideIllustration } from "./slide";
import { SlopeIllustration } from "./slope";
import { StatueIllustration } from "./statue";
import { SwingIllustration } from "./swing";
import { TidyIllustration } from "./tidy";
import { TrunkIllustration } from "./trunk";
import { WalkwayIllustration } from "./walkway";
import { WaterIllustration } from "./water";

/** Kinds that are drawn by the shared flora illustrations. */
const plantKinds = { tree: "tree", flower: "flower", herb: "herb" } as const;

type PlantKind = keyof typeof plantKinds;

const visuals: Record<
  Exclude<VisualKind, PlantKind>,
  (props: { className?: string }) => React.ReactElement
> = {
  leaf: LeafIllustration,
  trunk: TrunkIllustration,
  roots: RootsIllustration,
  water: WaterIllustration,
  ecosystem: EcosystemIllustration,
  garden: GardenIllustration,
  statue: StatueIllustration,
  plaque: PlaqueIllustration,
  neighborhood: NeighborhoodIllustration,
  shade: ShadeIllustration,
  flowerbed: FlowerBedIllustration,
  walkway: WalkwayIllustration,
  tidy: TidyIllustration,
  slide: SlideIllustration,
  swing: SwingIllustration,
  slope: SlopeIllustration,
  seesaw: SeeSawIllustration,
  roundabout: RoundaboutIllustration,
};

export function TopicIllustration({
  kind,
  accent,
  className,
}: {
  kind: VisualKind;
  /** Accent colour for plant-style visuals. */
  accent?: string;
  className?: string;
}) {
  if (kind in plantKinds) {
    return (
      <PlantIllustration
        kind={plantKinds[kind as PlantKind]}
        accent={accent ?? "#5e9e4e"}
        className={className}
      />
    );
  }

  const Illustration = visuals[kind as keyof typeof visuals];
  return <Illustration className={className} />;
}
