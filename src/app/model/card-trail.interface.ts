import { CodeCard } from "./code-card.interface";
import { EnvironmentCard } from "./environment-card.interface";

export interface CardTrail {
    environmentCard: EnvironmentCard;
    codeCards: CodeCard[];
}