import type { Club } from "./post";

export type ClubEvent = {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    location: string;
    image: string;
    club?: Club;
}