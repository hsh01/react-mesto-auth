import {UserInfoModel} from "./UserInfoModel";

export type CardModel = {
    _id?: string,
    name: string,
    link: string,
    likes: Array<UserInfoModel>,
    owner: UserInfoModel
}