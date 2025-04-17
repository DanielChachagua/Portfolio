import { RoleDTO } from "../role/roleDTO";
import { UserDTO } from "./userDTO";

export interface UserMember{
    id: string;
    user: UserDTO;
    role: RoleDTO;
    created: Date;
}