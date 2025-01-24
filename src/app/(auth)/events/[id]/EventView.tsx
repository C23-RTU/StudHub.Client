'use client';

import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { ClubEvent } from '@/lib/types/event';
import { Copy, EllipsisVertical, OctagonAlert } from 'lucide-react';
import Image from 'next/image';
import { FaCalendar, FaCompass } from 'react-icons/fa';

export default function EventView({ event }: { event: ClubEvent | null }) {

  return (
    <article className="min-h-screen">
      <div className="fixed flex flex-row justify-between items-center p-4 z-20 w-full max-w-[1024px]">
        <div className="flex flex-row items-center">
            <BackButton />
            <p className="text-lg ml-4 font-bold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary font-geologica rounded-lg leading-8 h-10 py-1 px-3 hover:cursor-pointer" onClick={() => navigator.clipboard.writeText('@IKB_MIREA')}>
                Подробности
            </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg w-10 h-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Copy />
              Скопировать ссылку
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#FF0000]">
              <OctagonAlert stroke="#FF0000" />
              Пожаловаться
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative flex w-full h-[400px]">
        <Image
          src={event?.image || '/img/eventbanner.jpg'}
          fill
          alt={event?.title || 'Event banner'}
          className="object-cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="container mx-auto">
          <div className="flex absolute z-10 flex-col items-start px-4 h-full w-full justify-end gap-3 pb-4">
            <h1 className="font-geologica text-4xl font-semibold text-white">{event?.title}</h1>
          </div>
        </div>
      </div>
      <div className="page flex flex-col gap-4">
        {/* <p className="text-sm text-gray-200 font-inter">{event?.startDate.toLocaleDateString('ru-RU')}</p> */}
        <p className="font-inter font-light text-lg text-gray-200">{event?.description}</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <FaCompass className="w-4 h-4" />
            <p className="font-inter text-md text-gray-white">{event?.location}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaCalendar className="w-4 h-4" />
            <p className="font-inter text-md text-gray-white">{event?.startDate.toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
