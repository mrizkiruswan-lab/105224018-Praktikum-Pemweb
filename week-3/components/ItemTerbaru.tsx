
"use client";

import { useEffect, useState } from "react";
import type { Item } from "@/lib/tipe";

type Status = "memuat" | "berhasil" | "gagal";

export default function ItemTerbaru() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>("memuat");
  const [pesanError, setPesanError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function muat() {
      try {
        const res = await fetch("/data/item.json", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data: Item[] = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Format JSON harus berupa array.");
        }

        setItems(data.slice(0, 3));
        setStatus("berhasil");
      } catch (error) {
        if (controller.signal.aborted) return;

        setPesanError(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan yang tidak diketahui."
        );
        setStatus("gagal");
      }
    }

    muat();

    return () => controller.abort();
  }, []);

  if (status === "memuat") {
    return <p>Memuat data…</p>;
  }

  if (status === "gagal") {
    return (
      <p role="alert" className="text-red-700">
        Data gagal dimuat: {pesanError}
      </p>
    );
  }

  if (items.length === 0) {
    return <p>Belum ada item terbaru.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-lg border p-4">
          <h3 className="font-semibold">{item.judul}</h3>
          <p className="mt-2 text-sm text-gray-600">
            {item.deskripsi}
          </p>
        </li>
      ))}
    </ul>
  );
}