'use client';

import { useClubReportDialogStore } from '@/store/clubReportDialog';

import { Button } from '../ui/button';
import { ResponsiveDialog } from '../ui/responsive-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export default function ClubReportDialog() {
    const reportDialogOpen = useClubReportDialogStore((store) => store.open);
    const reportDialogOnOpenChange = useClubReportDialogStore((store) => store.onOpenChange);
    return (
        <ResponsiveDialog open={reportDialogOpen} onOpenChange={reportDialogOnOpenChange}>
            <ResponsiveDialog.Header>
                <ResponsiveDialog.Title>Пожаловаться на клуб</ResponsiveDialog.Title>
                <ResponsiveDialog.Description>
                    Выберите причину жалобы на клуб и добавьте комментарий (необязательно).
                </ResponsiveDialog.Description>
            </ResponsiveDialog.Header>
            <ResponsiveDialog.Inherited>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Причина</p>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите причину" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="spam">Спам</SelectItem>
                            <SelectItem value="personalization">Аватар или баннер</SelectItem>
                            <SelectItem value="description">Описание</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="font-semibold">Комментарий</p>
                    <Textarea placeholder="Комментарий (необязательно)" />
                </div>
            </ResponsiveDialog.Inherited>
            <ResponsiveDialog.Footer>
                <Button>Отправить</Button>
                <Button variant={'outline'}>Отмена</Button>
            </ResponsiveDialog.Footer>
        </ResponsiveDialog>
    );
}
