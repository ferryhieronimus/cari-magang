"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Magang } from "@/app/types/magang";
import dayjs from "dayjs";
import { Bookmark } from "lucide-react";

export const MyCard: React.FC<Magang> = (props) => {
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);

  React.useEffect(() => {
    const ids: string[] = getBookmarksFromLocalStorage();
    setIsBookmarked(ids.some((id) => id === props.id));
  }, [props.id]);

  const removeFromLocalStorage = (id: string) => {
    const existingData = localStorage.getItem("bookmarks");
    const newData = existingData ? JSON.parse(existingData) : [];
    const updatedData = newData.filter((data: string) => data !== id);
    localStorage.setItem("bookmarks", JSON.stringify(updatedData));
    setIsBookmarked(false);
  };

  const saveToLocalStorage = (data: Magang) => {
    const existingData = localStorage.getItem("bookmarks");
    const newData = existingData ? JSON.parse(existingData) : [];
    const updatedData = [...newData, data.id];
    localStorage.setItem("bookmarks", JSON.stringify(updatedData));
    setIsBookmarked(true);
  };

  const getBookmarksFromLocalStorage = () => {
    const existingData = localStorage.getItem("bookmarks");
    if (existingData) {
      return JSON.parse(existingData);
    } else {
      return [];
    }
  };

  return (
    <Card className='col-span-12 sm:col-span-6 lg:col-span-4 px-2 py-3 md:px-4 md:py-6 gap-4 hover:bg-gray-100 transition shadow-md'>
      <div className='min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] pt-2 relative'>
        <Image
          src={
            props.logo === ""
              ? "https://kampusmerdeka.kemdikbud.go.id/static/media/logo-pendidikan.92aef756.webp"
              : props.logo
          }
          alt={"Logo"}
          fill
          className='object-contain'
          sizes='100vw'
          quality={10}
        />
      </div>
      <div className='flex flex-col justify-between gap-2 w-full'>
        <div>
          <CardHeader className='flex flex-row justify-between gap-2'>
            <CardTitle className='text-sm md:text-md line-clamp-2 hover:underline cursor-pointer'>
              <a
                href={`https://kampusmerdeka.kemdikbud.go.id/program/magang/browse/${props.mitra_id}/${props.id}`}
                target='_blank'
              >
                {props.name}
              </a>
            </CardTitle>
            <Bookmark
              strokeWidth={0.75}
              size={24}
              color='#363636'
              className={`min-w-max cursor-pointer ${
                isBookmarked ? "fill-gray-800" : ""
              }`}
              onClick={() =>
                isBookmarked
                  ? removeFromLocalStorage(props.id)
                  : saveToLocalStorage(props)
              }
            />
          </CardHeader>
          <CardContent>
            <p className='text-xs md:text-sm line-clamp-1'>{props.name}</p>
            <p className='text-xs md:text-sm line-clamp-1'>
              {props.mitra_name}
            </p>
            <p className='text-xs md:text-sm line-clamp-1'>{props.location}</p>
            <p className='text-xs mt-2 md:text-sm text-muted-foreground'>
              {props.credits_count} SKS • {props.months_duration} bulan
            </p>

            <p className='text-xs md:text-sm text-muted-foreground'>
              Participant Count: {props.participants_count}
            </p>
          </CardContent>
        </div>
        <CardFooter className='flex justify-between items-center gap-2'>
          {props.certified ? (
            <p className='text-xs text-green-700'>Bersertifikat</p>
          ) : (
            <p className='text-xs text-red-700'>Tidak Bersertifikat</p>
          )}
          <p className='text-xs text-muted-foreground italic'>
            Published at:{" "}
            {dayjs(props.published_time).format("DD MMM YYYY HH:mm")}
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};
