import {ActionType} from "./ActionType.model";

export interface ActionCreator {
    type: ActionType,
    payload: any
}
