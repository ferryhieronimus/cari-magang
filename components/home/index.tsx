"use client";
import { Input } from "@/components/ui/input";
import { MyCard } from "@/components/my-ui/MyCard";
import Pagination from "@mui/material/Pagination";
import React, { useCallback, useEffect } from "react";
import Fuse from "fuse.js";
import { useDebounce } from "rooks";
import { Magang } from "@/app/types/magang";
import { useWindowSize } from "rooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home({ data }: { data: Magang[] }) {
  const [page, setPage] = React.useState(1);
  const [filteredMagang, setFilteredMagang] = React.useState<Magang[]>([]);

  const [posisi, setPosisi] = React.useState("");
  const [lokasi, setLokasi] = React.useState("");
  const [perusahaan, setPerusahaan] = React.useState("");
  const setPosisiDebounced = useDebounce(setPosisi, 500);
  const setLokasiDebounced = useDebounce(setLokasi, 500);
  const setPerusahaanDebounced = useDebounce(setPerusahaan, 500);

  const { innerWidth } = useWindowSize();

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    let filteredMagang = data;

    if (posisi) {
      filteredMagang = new Fuse(data, {
        ignoreLocation: true,
        ignoreFieldNorm: true,
        includeScore: true,
        threshold: 0.3,
        keys: ["name"],
      })
        .search(posisi)
        .map((result) => result.item);
    }

    if (lokasi) {
      filteredMagang = new Fuse(filteredMagang, {
        ignoreLocation: true,
        ignoreFieldNorm: true,
        includeScore: true,
        threshold: 0.3,
        keys: ["location"],
      })
        .search(lokasi)
        .map((result) => result.item);
    }

    if (perusahaan) {
      filteredMagang = new Fuse(filteredMagang, {
        ignoreLocation: true,
        ignoreFieldNorm: true,
        includeScore: true,
        threshold: 0.3,
        keys: ["mitra_name"],
      })
        .search(perusahaan)
        .map((result) => result.item);
    }

    if (selectedValue == "Name (Ascending)") {
      filteredMagang = [...filteredMagang].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (selectedValue == "Name (Descending)") {
      filteredMagang = [...filteredMagang].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (selectedValue == "Company (Ascending)") {
      filteredMagang = [...filteredMagang].sort((a, b) =>
        a.mitra_name.localeCompare(b.mitra_name)
      );
    } else if (selectedValue == "Company (Descending)") {
      filteredMagang = [...filteredMagang].sort((a, b) =>
        b.mitra_name.localeCompare(a.mitra_name)
      );
    } else if (selectedValue == "Published Time (Ascending)") {
      filteredMagang = [...filteredMagang].sort(
        (a, b) =>
          new Date(a.published_time).getTime() -
          new Date(b.published_time).getTime()
      );
    } else if (selectedValue == "Published Time (Descending)") {
      filteredMagang = [...filteredMagang].sort(
        (a, b) =>
          new Date(b.published_time).getTime() -
          new Date(a.published_time).getTime()
      );
    } else if (selectedValue == "Bookmarked") { 
      const ids: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      filteredMagang = filteredMagang.filter((magang) =>
        ids.find((id) => id === magang.id)
      );
    }

    setFilteredMagang(filteredMagang);
    setPage(1);
  }, [posisi, lokasi, perusahaan, selectedValue]);

  const count = Math.ceil(filteredMagang.length / 12);
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8 px-4 md:p-12 lg:p-24 gap-8 max-w-screen-2xl mx-auto'>
      <h1 className='text-3xl font-extrabold lg:text-4xl'>
        Cari Magang Kampus Merdeka 🎓
      </h1>
      <p className='text-xs text-muted-foreground italic'>
        with fuzzy search, faster loading speed, extra information, and sorting
        capabilities. Data is updated every hour. Bookmarked items are stored in local storage.
      </p>
      <div className='flex flex-col md:flex-row gap-2 sm:gap-4 lg:gap-6 w-full lg:w-3/4'>
        <Input
          placeholder='Semua Posisi'
          onChange={(e) => setPosisiDebounced(e.target.value)}
          className='w-full'
        />
        <Input
          placeholder='Semua Lokasi'
          onChange={(e) => setLokasiDebounced(e.target.value)}
          className='w-full'
        />
        <Input
          placeholder='Semua Perusahaan'
          onChange={(e) => setPerusahaanDebounced(e.target.value)}
          className='w-full'
        />
        <Select onValueChange={(value) => handleSelectChange(value)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Sort by'>
              {selectedValue || "Sort by"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Relevance'>Relevance</SelectItem>
            <SelectItem value='Bookmarked'>Bookmarked</SelectItem>
            <SelectItem value='Name (Ascending)'>Name (Ascending)</SelectItem>
            <SelectItem value='Name (Descending)'>Name (Descending)</SelectItem>
            <SelectItem value='Company (Ascending)'>
              Company (Ascending)
            </SelectItem>
            <SelectItem value='Company (Descending)'>
              Company (Descending)
            </SelectItem>
            <SelectItem value='Published Time (Ascending)'>
              Published Time (Ascending)
            </SelectItem>
            <SelectItem value='Published Time (Descending)'>
              Published Time (Descending)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='grid grid-cols-12 mx-auto gap-4'>
        {filteredMagang.slice((page - 1) * 12, page * 12).map((magang) => (
          <MyCard {...magang} key={magang.id} />
        ))}
      </div>
      <div className='fixed bottom-0 backdrop-blur-md bg-white/30 mb-4 md:mb-8 px-4 py-2 rounded-3xl shadow-lg mx-4'>
        {innerWidth! <= 768 ? (
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            siblingCount={0}
            boundaryCount={0}
          />
        ) : (
          <Pagination count={count} page={page} onChange={handleChange} />
        )}
      </div>
    </main>
  );
}
