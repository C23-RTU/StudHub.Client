import type { Metadata } from "next";
import EventView from "./EventView";
import { events } from "@/data/events";
import type { ClubEvent } from "@/lib/types/event";

export const metadata: Metadata = {
    title: 'Событие',
    description: '',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const event: ClubEvent | undefined = events.find((e) => e.id === +id);
    return <EventView event={event || null} />;
}