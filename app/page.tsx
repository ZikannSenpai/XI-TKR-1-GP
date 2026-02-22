"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

// Data struktur organisasi
const strukturData = [
    { jabatan: "Wali Kelas", nama: "Pak Inggar, S.Pd" },
    { jabatan: "Ketua Kelas", nama: "Marvin" },
    { jabatan: "Wakil Ketua", nama: "Fadli" },
    { jabatan: "Sekretaris", nama: "Ardinda" },
    { jabatan: "Bendahara", nama: "Ricky Julian" }
];

// Jadwal pelajaran statis
const jadwal: Record<string, string[]> = {
    Senin: ["Pend. Pancasila", "Bahasa Inggris", "BK", "Matematika", "KK TKR"],
    Selasa: ["Bahasa Inggris", "Kokurikuler", "KK TKR", "KIK"],
    Rabu: ["Bahasa Indonesia", "KK TKR", "Sejarah", "KIK"],
    Kamis: ["Kokurikuler", "KK TKR", "PAIBP", "Bahasa Jawa"],
    Jumat: ["PJOK", "Mapil Sepeda Motor"]
};

export default function Home() {
    const [messages, setMessages] = useState<{ text: string }[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [avgRating, setAvgRating] = useState(0);
    const [jadwalHariIni, setJadwalHariIni] = useState<string[]>([]);

    // Ambil jadwal berdasarkan hari sekarang
    useEffect(() => {
        const hari = new Date().toLocaleDateString("id-ID", {
            weekday: "long"
        });
        setJadwalHariIni(jadwal[hari] || []);
    }, []);

    // Ambil data dari API
    useEffect(() => {
        fetchMessages();
        fetchRating();
    }, []);

    const fetchMessages = async () => {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
    };

    const fetchRating = async () => {
        const res = await fetch("/api/ratings");
        const data = await res.json();
        setAvgRating(data.avg);
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newMessage })
        });
        setNewMessage("");
        fetchMessages();
    };

    const sendRating = async () => {
        await fetch("/api/ratings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value: rating })
        });
        fetchRating();
    };

    const getEmoji = (val: number) => {
        if (val <= 2) return "😠";
        if (val <= 4) return "😞";
        if (val <= 6) return "😐";
        if (val <= 8) return "🙂";
        return "😍";
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="text-center py-16 bg-gradient-to-b from-blue-50 to-white">
                <h1 className="text-5xl font-extrabold text-blue-800">
                    XI TKR 1 GIRIPURO
                </h1>
                <p className="text-lg text-blue-600 mt-2">
                    Teknik Kendaraan Ringan • SMK GIRIPURO
                </p>
            </section>

            {/* Instagram & Web Pembuat */}
            <div className="flex flex-wrap justify-center gap-4 py-6">
                <Link
                    href="#"
                    target="_blank"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition transform active:scale-95"
                >
                    Instagram Kelas
                </Link>
                <Link
                    href=""
                    target="_blank"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition transform active:scale-95"
                >
                    Web Pembuat
                </Link>
            </div>

            {/* Text Anonim */}
            <Section title="Pesan Anonim">
                <form
                    onSubmit={sendMessage}
                    className="flex flex-col sm:flex-row gap-2"
                >
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Tulis pesan rahasia..."
                        className="flex-1 border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition transform active:scale-95"
                    >
                        Kirim
                    </button>
                </form>
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className="bg-blue-100 p-3 rounded-lg shadow"
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
            </Section>

            {/* Gallery Carousel */}
            <Section title="Galeri Kelas">
                <Carousel />
            </Section>

            {/* Struktur Organisasi */}
            <Section title="Struktur Organisasi Kelas" bg="bg-blue-50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {strukturData.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition transform hover:scale-105 active:scale-95"
                        >
                            <div
                                className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-3 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('/images/avatar-placeholder.png')"
                                }}
                            ></div>
                            <h3 className="font-bold text-blue-800">
                                {item.jabatan}
                            </h3>
                            <p className="text-sm">{item.nama}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Jadwal Pelajaran */}
            <Section
                title={`Jadwal Pelajaran (${new Date().toLocaleDateString("id-ID", { weekday: "long" })})`}
            >
                {jadwalHariIni.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {jadwalHariIni.map((mapel, idx) => (
                            <div
                                key={idx}
                                className="bg-blue-100 p-4 rounded-lg text-center font-medium shadow"
                            >
                                {mapel}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        Tidak ada jadwal untuk hari ini
                    </p>
                )}
            </Section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-10">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo */}
                    <div className="flex justify-center md:justify-start">
                        <Image
                            src="/images/logo.png"
                            alt="Logo SMK GIRIPURO"
                            width={100}
                            height={100}
                            className="rounded-full bg-white p-1"
                        />
                    </div>

                    {/* Created by */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">
                            Created by
                        </h4>
                        <p>Tim IT Kelas XI TKR 1</p>
                        <p className="text-sm text-blue-200">
                            dengan ❤️ untuk GIRIPURO
                        </p>
                    </div>

                    {/* Follow us */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">
                            Follow us
                        </h4>
                        <div className="flex gap-4">
                            <Link
                                href="https://tiktok.com/@tkr1_giripuro"
                                target="_blank"
                                className="hover:text-blue-300"
                            >
                                TikTok
                            </Link>
                            <Link
                                href="https://youtube.com/@tkr1_giripuro"
                                target="_blank"
                                className="hover:text-blue-300"
                            >
                                YouTube
                            </Link>
                        </div>
                    </div>

                    {/* Rate us */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Rate us</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl">{getEmoji(rating)}</span>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                value={rating}
                                onChange={e =>
                                    setRating(Number(e.target.value))
                                }
                                className="w-full accent-blue-400"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1 text-sm">
                            <span>0</span>
                            <span>{rating}</span>
                            <span>10</span>
                        </div>
                        <button
                            onClick={sendRating}
                            className="mt-2 bg-white text-blue-900 px-4 py-1 rounded-full hover:bg-blue-100 transition transform active:scale-95"
                        >
                            Kirim Rating (rata-rata: {avgRating.toFixed(1)})
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-4 border-t border-blue-700">
                    &copy; {new Date().getFullYear()} XI TKR 1 GIRIPURO. All
                    rights reserved.
                </div>
            </footer>
        </main>
    );
}

// Komponen Section dengan efek scroll fade + zoom
function Section({
    title,
    children,
    bg = ""
}: {
    title: string;
    children: React.ReactNode;
    bg?: string;
}) {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section ref={ref} className={`py-12 px-4 ${bg}`}>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
                    {title}
                </h2>
                <div
                    className={`transition-all duration-700 ease-out ${
                        inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                >
                    {children}
                </div>
            </div>
        </section>
    );
}

// Komponen Carousel otomatis
function Carousel() {
    const [current, setCurrent] = useState(0);
    const images = [
        "/images/gallery1.jpg",
        "/images/gallery2.jpg",
        "/images/gallery3.jpg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 overflow-hidden rounded-2xl shadow-xl">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className="w-full h-full flex-shrink-0 relative"
                    >
                        <Image
                            src={src}
                            alt={`Gallery ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
