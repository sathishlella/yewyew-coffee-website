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
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Yew+Yew+Coffee+Chinatown+Kuala+Lumpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/address text-sm leading-relaxed text-white/70 transition-colors hover:text-white"
                >
                  <strong className="block text-white group-hover/address:text-chrome transition-colors">Bangunan Ka Yin</strong>
                  63D, FB1 First Floor, <br />
                  Jalan Sultan, Kuala Lumpur, <br />
                  Malaysia 50000
                </a>
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
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
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
