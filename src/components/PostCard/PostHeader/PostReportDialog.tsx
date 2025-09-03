'use client';

import { usePostReportDialogStore } from '@/components/PostCard/store/useReportPostStore';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function PostReportDialog() {
    const postDialogOpen = usePostReportDialogStore((store) => store.open);
    const postDialogOnOpenChange = usePostReportDialogStore((store) => store.onOpenChange);
    return (
        <ResponsiveDialog open={postDialogOpen} onOpenChange={postDialogOnOpenChange}>
            <ResponsiveDialog.Header>
                <ResponsiveDialog.Title>Пожаловаться на пост</ResponsiveDialog.Title>
                <ResponsiveDialog.Description>
                    Выберите причину жалобы на пост и добавьте комментарий (необязательно).
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
                            <SelectItem value="personalization">Введение в заблуждение</SelectItem>
                            <SelectItem value="description">Разжигание ненaвести</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="font-semibold">Комментарий</p>
                    <Textarea placeholder="Комментарий (необязательно)" className="text-sm" />
                </div>
            </ResponsiveDialog.Inherited>
            <ResponsiveDialog.Footer>
                <Button>Отправить</Button>
                <Button variant={'outline'}>Отмена</Button>
            </ResponsiveDialog.Footer>
        </ResponsiveDialog>
    );
}
