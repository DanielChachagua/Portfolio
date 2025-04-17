import { ListBoardDTO } from "../list_board/list_boardDTO";

export interface BoardDTO{
    id: string,
    name: string,
    description: string,
    created: Date,
    // listBoards?: ListBoardDTO[]
}