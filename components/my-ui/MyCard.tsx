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

export const MyCard: React.FC<Magang> = (props) => {
  return (
    <Card className='col-span-12 sm:col-span-6 lg:col-span-4 px-2 py-3 md:px-4 md:py-6 gap-4 hover:bg-gray-100 transition shadow-md'>
      <div className='min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] pt-2 relative'>
        <Image
          src={props.logo}
          alt={"Logo"}
          fill
          className='object-contain'
          sizes='100vw'
          quality={10}
        />
      </div>
      <div className='flex flex-col justify-between gap-2'>
        <div>
          <CardHeader>
            <CardTitle className='text-sm md:text-md line-clamp-2 hover:underline cursor-pointer'>
              <a
                href={`https://kampusmerdeka.kemdikbud.go.id/program/magang/browse/${props.mitra_id}/${props.id}`}
                target='_blank'
              >
                {props.name}
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xs md:text-sm line-clamp-1'>
              {props.activity_name}
            </p>
            <p className='text-xs md:text-sm line-clamp-1'>
              {props.mitra_name} • {props.location}
            </p>
            <p className='text-xs md:text-sm text-muted-foreground'>
              {props.credits_count} SKS • {props.total} bulan
            </p>
          </CardContent>
        </div>
        <CardFooter>
          {props.certified ? (
            <p className='text-xs text-green-700'>Bersertifikat</p>
          ) : (
            <p className='text-xs text-red-700'>Tidak Bersertifikat</p>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};
