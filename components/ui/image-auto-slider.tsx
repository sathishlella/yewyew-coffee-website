import React from 'react';

export const ImageAutoSlider = ({ images = [] }: { images?: string[] }) => {
  const defaultImages = [
    "/images/instagram/657992319_18095753483326375_6177742294481352183_n.jpg",
    "/images/instagram/658176454_18095753492326375_4381321122818612355_n.jpg",
    "/images/instagram/670732566_18097250816326375_7205059477463636713_n.jpg",
    "/images/instagram/670981857_18097250825326375_1268442109247296717_n.jpg",
    "/images/instagram/670998181_18097057364326375_1294917869901006569_n.jpg",
    "/images/instagram/684049998_18099064550326375_9206107062925129754_n.jpg",
    "/images/instagram/696137706_18099973307326375_5695417545564373015_n.jpg",
    "/images/instagram/703948362_18101082977326375_7849881427683113854_n.jpg",
    "/images/instagram/yewyewcoffee_kl_368358630_17991819026326375_3844655820082375301_n.jpg",
    "/images/instagram/yewyewcoffee_kl_467719178_18043780049326375_7571454225323034277_n.jpg",
    "/images/instagram/yewyewcoffee_kl_467721346_18043776263326375_8810133646621068170_n.jpg",
    "/images/instagram/yewyewcoffee_kl_467779589_18043978898326375_8300117687938603893_n.jpg",
    "/images/instagram/yewyewcoffee_kl_472645088_18049163777326375_7531240720473362797_n.jpg",
    "/images/instagram/yewyewcoffee_kl_472974944_18048948143326375_8136913604790235859_n.jpg",
    "/images/instagram/yewyewcoffee_kl_479180157_18052841093326375_4941585298896833101_n.jpg",
    "/images/instagram/yewyewcoffee_kl_504514992_18064335107326375_5603472614916989428_n.jpg"
  ];

  const safeImages = images.length > 0 ? images : defaultImages;

  // Split images into two halves for the two rows
  const mid = Math.ceil(safeImages.length / 2);
  const topImages = safeImages.slice(0, mid);
  const bottomImages = safeImages.slice(mid).length > 0 ? safeImages.slice(mid) : topImages;

  // Duplicate for seamless loop
  const duplicatedTop = [...topImages, ...topImages];
  const duplicatedBottom = [...bottomImages, ...bottomImages];

  return (
    <div className="w-full bg-transparent relative overflow-hidden flex flex-col items-center justify-center py-24 gap-6">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .infinite-scroll-left {
          animation: scroll-left 45s linear infinite;
        }
        .infinite-scroll-right {
          animation: scroll-right 55s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
          will-change: transform;
        }

        .image-item:hover {
          transform: scale(1.03);
          filter: brightness(1.1);
        }
      `}</style>

      {/* Top Row */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="scroll-container w-full max-w-[100vw]">
          <div className="infinite-scroll-left flex gap-6 w-max px-3">
            {duplicatedTop.map((image, index) => (
              <div
                key={`top-${index}`}
                className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl bg-[#111]"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative z-10 w-full flex items-center justify-center mt-2">
        <div className="scroll-container w-full max-w-[100vw]">
          <div className="infinite-scroll-right flex gap-6 w-max px-3">
            {duplicatedBottom.map((image, index) => (
              <div
                key={`bottom-${index}`}
                className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl bg-[#111]"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
