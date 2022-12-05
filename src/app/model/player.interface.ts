import { CodeCard } from '../model/code-card.interface';
import { GoalCard } from '../model/goal-card.interface';

export interface Player {
    name: string;
    hand: CodeCard[];
    goal?: GoalCard;
    score: number;
}