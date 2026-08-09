"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={[
          "w-full h-full flex flex-col items-center justify-center bg-anthracite-2 rounded-lg",
          "border border-white/5",
          className,
        ].join(" ")}
        aria-label={alt}
      >
        <span className="font-display text-3xl md:text-5xl text-warm-white/15 uppercase text-center px-4 leading-tight">
          {fallbackLabel ?? alt}
        </span>
        <span className="font-body text-xs text-warm-white/20 mt-3 tracking-widest uppercase">
          Visuel à venir
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}
