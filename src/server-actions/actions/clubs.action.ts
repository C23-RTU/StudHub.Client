import { clubsApi } from "@/api/api";
import { cache } from "react";

export const getClubGetByIdAction = cache(async (id: string) => {
    return (await clubsApi.clubsGetById(Number(id))).data;
});