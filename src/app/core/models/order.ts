export interface Order{
    id: string;
    order: number;
}

export interface ListOrder{
    id: string;
    order: Order[];
}

export interface BoardIdListOrder{
    id: string;
    order: ListOrder;
}