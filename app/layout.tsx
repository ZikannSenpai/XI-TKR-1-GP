import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "XI TKR 1 GIRIPURO",
    description: "Website Kelas XI TKR 1 GIRIPURO SUMPIUH",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
        ],
        apple: [{ url: "/apple-touch-icon.png" }]
    }
};
export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-white text-blue-900">{children}</body>
        </html>
    );
}
