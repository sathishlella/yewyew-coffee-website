"use client";

import Link from 'next/link';
import {
  Instagram,
  Facebook,
  MessageCircle, // Using MessageCircle for WhatsApp
  MapPin,
  Clock,
  Coffee,
  Mail,
  Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/mapcn-marker-popup";

function PopupSlider() {
  const images = [
    "/images/instagram/yewyewcoffee_klimg1.jpg",
    "/images/instagram/yewyewcoffee_klimg2.jpg",
    "/images/instagram/yewyewcoffee_klimg3.jpg",
    "/images/instagram/yewyewcoffee_klimg4.jpg"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Yew Yew Coffee Chinatown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

export default function FooterSection() {
  const klCoordinates: [number, number] = [101.6980, 3.1438];

  return (
    <footer className="relative z-10 w-full overflow-hidden border-t border-white/10 bg-black/40 py-12 backdrop-blur-md md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Brand Banner */}
        <div className="mb-10 text-center">
          <Link href="#home" aria-label="go home" className="group inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
              <Coffee className="size-5 text-porcelain" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/78 transition-colors group-hover:text-white">
              yewyew
            </span>
          </Link>
          <h2 className="mt-6 font-display text-[clamp(1.75rem,3.5vw,3.5rem)] font-black uppercase leading-[0.8] tracking-normal text-white">
            Only at Chinatown <br className="md:hidden" />
            <span className="text-white/40">Kuala Lumpur.</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] lg:gap-16">
          
          {/* Left Side: Store Details */}
          <div className="flex flex-col gap-6">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-white/50" />
                <div className="text-sm leading-relaxed text-white/70">
                  <strong className="block text-white">Bangunan Ka Yin</strong>
                  63D, FB1 First Floor, <br />
                  Jalan Sultan, Kuala Lumpur, <br />
                  Malaysia 50000
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-white/50" />
                <div className="text-sm leading-relaxed text-white/70">
                  <strong className="block text-white">Hours</strong>
                  Everyday: 10:00 AM — 6:00 PM
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-white/50" />
                <div className="text-sm leading-relaxed text-white/70">
                  <strong className="block text-white">Collab & Event</strong>
                  <a href="mailto:yewyewkl@gmail.com" className="transition hover:text-white">
                    yewyewkl@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 border-l border-white/10 pl-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                <Heart className="size-3.5 text-white/40" />
                Muslim Friendly
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-2 flex gap-4">
              <Link
                href="https://www.instagram.com/yewyewcoffee_kl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-porcelain hover:text-black"
              >
                <Instagram className="size-5" />
              </Link>
              <Link
                href="https://www.facebook.com/yewyewkl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-porcelain hover:text-black"
              >
                <Facebook className="size-5" />
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=601165631233"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-porcelain hover:text-black"
              >
                <MessageCircle className="size-5" />
              </Link>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="relative h-[250px] w-full overflow-hidden rounded-[8px] border border-white/10 bg-white/5 md:h-[320px]">
            <Map
              theme="dark"
              viewport={{
                center: klCoordinates,
                zoom: 15,
                pitch: 45,
              }}
              className="absolute inset-0 h-full w-full"
            >
              <MapMarker longitude={klCoordinates[0]} latitude={klCoordinates[1]}>
                <MarkerContent>
                  <div className="relative flex size-12 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-30"></span>
                    <img 
                      src="/images/instagram/yewyewcoffee_maps.jpg" 
                      alt="Yew Yew Coffee Location"
                      className="relative z-10 size-8 rounded-full border-2 border-white object-cover shadow-lg transition-transform hover:scale-110"
                    />
                  </div>
                </MarkerContent>
                <MarkerPopup className="overflow-hidden border border-white/10 bg-black p-0 shadow-2xl">
                  <div className="relative flex h-40 w-48 flex-col justify-end">
                    <PopupSlider />
                    <div className="relative z-10 flex flex-col items-center gap-1 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
                      <span className="font-semibold text-white drop-shadow-md">Yew Yew Coffee</span>
                      <span className="text-white/80 drop-shadow-md">Chinatown, KL</span>
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            </Map>
            <div className="pointer-events-none absolute inset-0 rounded-[8px] ring-1 ring-inset ring-white/10" />
          </div>
        </div>

        {/* Bottom copyright & Developer Signature */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            © {new Date().getFullYear()} Yew Yew Coffee. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/in/sathishlella/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block font-mono text-[10px] uppercase tracking-[0.24em] text-white/20 transition-colors hover:text-white/60"
          >
            Designed & Developed by <span className="text-white font-bold">Sathish Lella</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
