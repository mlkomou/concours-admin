import {Postulation} from "./postulation";

export class PostulationDoc {
    id?: number;
    path: string;
    name: string;
    type: string;
    accepted: boolean;
    postulation: Postulation;
}
