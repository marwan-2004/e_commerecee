

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './_components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

import NextauthProvider from "./providers/nextauthProvider";
import Providers from './providers/react-query-provider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <NextauthProvider>
          <Toaster/>
        <Navbar/>
        <div className="container mx-auto max-w-7xl">
          {children}

        </div>
        <Footer/>

        </NextauthProvider>
        </Providers>
      
        

        
        

        
      </body>
    </html>
  );
}
