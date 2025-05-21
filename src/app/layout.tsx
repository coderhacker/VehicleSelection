import type { Metadata } from 'next';
import { Inter as Geist } from 'next/font/google'; // Using Inter as a placeholder for Geist Sans as per guidelines, typically Geist is separate.
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Ensure Toaster is imported

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// const geistMono = Geist_Mono({ // Assuming Geist_Mono is not strictly needed for this project
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'AutoSpec Vehicle Selector',
  description: 'Select your vehicle manufacturer, model, and type.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
