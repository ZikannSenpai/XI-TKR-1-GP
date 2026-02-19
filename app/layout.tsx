import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "XI TKR 1 GIRIPURO",
    description: "Website resmi kelas XI TKR 1 SMK GIRIPURO",
    icons: {
        icon: "/favicon.ico" // pastikan file logo sekolah diletakkan di public/favicon.ico
    }
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <body className="bg-white text-blue-900">{children}</body>
        </html>
    );
}
