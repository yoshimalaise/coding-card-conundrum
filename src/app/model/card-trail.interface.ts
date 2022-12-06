import { CodeCard } from "./code-card.interface";
import { EnvironmentCard } from "./environment-card.interface";
import { TracetableLine } from "./tracetable-line.interface";

export interface CardTrail {
    environmentCard: EnvironmentCard;
    codeCards: CodeCard[];
    tracetable: TracetableLine[];
}