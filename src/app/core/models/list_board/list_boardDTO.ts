import { CardDTO } from "../card/cardDTO"

export interface ListBoardDTO{
    id: string;
    name: string;
    order: number;
    created: Date;
    updated: Date;
    cards?: CardDTO[];
    boardId: string;
}