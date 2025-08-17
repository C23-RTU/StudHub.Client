'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuPencil } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { clubCreationRequestsApi } from '@/api/api.admin';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { type ClubFormValues, clubSchema } from '@/lib/schemas/create-club';

type ImageType = 'banner' | 'avatar';

export default function CreateClub() {
    const [currentBanner, setCurrentBanner] = useState<string>('/img/default-club-banner.jpg');
    const [currentAvatar, setCurrentAvatar] = useState<string>('/img/default-club-avatar.png');
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

    const router = useRouter();

    const bannerInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (file: File, type: ImageType): void => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const imageUrl = e.target?.result as string;
                if (type === 'banner') {
                    setCurrentBanner(imageUrl);
                } else if (type === 'avatar') {
                    setCurrentAvatar(imageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerClick = (): void => {
        bannerInputRef.current?.click();
    };

    const handleAvatarClick = (): void => {
        avatarInputRef.current?.click();
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(clubSchema),
        defaultValues: {
            clubName: '',
            comment: '',
            about: '',
        },
    });

    const onSubmit = async (data: ClubFormValues) => {
        if (!acceptTerms) {
            toast.error('Вы должны принять условия.');
            return;
        }

        try {
            await clubCreationRequestsApi.clubCreationRequestsAdd(
                data.clubName,
                data.about,
                data.avatar?.[0],
                data.banner?.[0] || null,
                data.comment
            );
            router.back();
            toast.success('Заявка на создание клуба отправлена!', {
                duration: 5000,
                style: {
                    border: '1px solid #22c55e',
                    padding: '16px',
                },
            });
        } catch (error) {
            toast.error('Ошибка при отправке заявки');
            console.error('Error submitting club creation request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="page">
            <Header>
                <HeaderTitle>Создание клуба</HeaderTitle>
            </Header>
            <MainContent className="flex w-full flex-col gap-6">
                <div className="relative flex flex-col items-center">
                    {/* Выбор баннера */}
                    <div
                        onClick={handleBannerClick}
                        className="group relative flex h-[175px] w-full cursor-pointer items-center justify-center transition-opacity hover:opacity-80 md:h-[200px] lg:h-[225px]"
                    >
                        <Image
                            src={currentBanner}
                            width={9000}
                            height={9000}
                            className="-z-10 h-[175px] w-full rounded-md object-cover transition-opacity duration-200 group-hover:opacity-60 md:h-[200px] lg:h-[225px]"
                            alt="Предпросмотр баннера клуба"
                        />
                        <LuPencil
                            className="absolute inset-0 z-50 mx-auto mt-8 justify-center text-center opacity-0 group-hover:opacity-100"
                            color="#fff"
                            size={48}
                        />
                    </div>

                    <Image
                        onClick={handleAvatarClick}
                        src={currentAvatar}
                        width={128}
                        height={128}
                        className="border-background absolute mt-28 size-[128px] cursor-pointer rounded-full border-8 bg-neutral-800 object-cover md:mt-32 lg:mt-40"
                        alt="Предпросмотр аватара клуба"
                    />

                    {/* Скрытые input элементы для выбора файлов */}
                    <Controller
                        name="banner"
                        control={control}
                        render={({ field }) => (
                            <input
                                ref={(e) => {
                                    field.ref(e);
                                    bannerInputRef.current = e;
                                }}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, 'banner');
                                }}
                                className="hidden"
                            />
                        )}
                    />

                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <input
                                ref={(e) => {
                                    field.ref(e);
                                    avatarInputRef.current = e;
                                }}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, 'avatar');
                                }}
                                className="hidden"
                            />
                        )}
                    />
                </div>
                <p className="mt-14 text-center text-neutral-400">Нажмите на аватар или баннер чтобы изменить его</p>
                {errors.banner && (
                    <p className="mt-2 text-center text-sm text-red-500">{errors.banner.message?.toString()}</p>
                )}
                {errors.avatar && (
                    <p className="mt-2 text-center text-sm text-red-500">{errors.avatar.message?.toString()}</p>
                )}
                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-neutral-300">Название клуба</h2>
                        <Input placeholder="Введите название вашего клуба" {...register('clubName')} />
                        {errors.clubName && (
                            <p className="mt-2 text-sm text-red-500">{errors.clubName.message?.toString()}</p>
                        )}
                        <p className="text-xs text-neutral-500">
                            Название клуба отражает к какой тематике он относиться, или к какому отделу в РТУ МИРЭА оно
                            относиться.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-neutral-300">Описание клуба</h2>
                        <Textarea placeholder="Введите описание для клуба" className="text-sm" {...register('about')} />
                        {errors.about && (
                            <p className="mt-2 text-sm text-red-500">{errors.about.message?.toString()}</p>
                        )}
                        <p className="text-xs text-neutral-500">
                            Расскажите подробнее, о чем вы хотите рассказывать в этом клубе чтобы завлечь больше
                            единомышленников.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-neutral-300">Расскажите о себе</h2>
                        <Textarea placeholder="Расскажите о себе здесь" className="text-sm" {...register('comment')} />
                        {errors.comment && (
                            <p className="mt-2 text-sm text-red-500">{errors.comment.message?.toString()}</p>
                        )}
                        <p className="text-xs text-neutral-500">
                            Нам было бы интересно узнать, кто вы и зачем создаете этот клуб.
                        </p>
                    </div>
                </section>
                <section className="flex flex-row gap-2">
                    <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={() => {
                            setAcceptTerms(!acceptTerms);
                        }}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-neutral-300">
                            Я согласен с правилами использования площадки СтудХаб и даю свое согласие на обработку
                            персональных данных.
                        </label>
                    </div>
                </section>
                <p className="text-xs text-neutral-500">
                    После того как вы нажмете на кнопку &quot;Создать клуб&quot; ваша заявка будет отправлена на
                    модерацию. Ее обработка может занять до 7 дней.
                </p>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Создать клуб'}
                </Button>
            </MainContent>
        </form>
    );
}
