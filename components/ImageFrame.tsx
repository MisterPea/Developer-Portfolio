/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
type JPG = `${string}.jpg` | `${string}.jpg`;
type WEBP = `${string}.webp`;
type PNG = `${string}.png`;
type GIF = `${string}.gif`;

type ImageType = JPG | WEBP | PNG | GIF;
type ImgSizeType = {
  h: number,
  w: number,
};

interface ImageFrameProps {
  imageURL_1x: ImageType | string;
  imageURL_2x: ImageType | string;
  imgAlt: string;
  imgSize: ImgSizeType;
  blurDataUrl: string;
  transitionDelay?: string;
  loading?: 'lazy' | 'eager';
}

import { useEffect, useRef } from 'react';

export default function ImageFrame({ imageURL_1x, imageURL_2x, imgAlt, imgSize, blurDataUrl, transitionDelay = '0', loading = 'lazy' }: ImageFrameProps) {
  const loadingImage = useRef<HTMLImageElement|null>(null);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    // We immediately disconnect the observer when we're intersecting
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          executeLoadImage();
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(loadingImage.current!);
  }, []);

  function cleanUpLoadImage() {
    (loadingImage.current!.closest('li') as HTMLLIElement).style.filter = 'blur(0px)';
    loadingImage.current?.removeEventListener('load', cleanUpLoadImage);
    loadingImage.current = null;
  }

  function loadMainImage() {
    loadingImage.current?.addEventListener('load', cleanUpLoadImage);
    loadingImage.current?.setAttribute('src', imageURL_1x);
    loadingImage.current?.setAttribute('srcSet', `${imageURL_1x} 1x, ${imageURL_2x} 2x`);
  }

  function executeLoadImage() {
    loadMainImage();
    loadingImage.current?.style.removeProperty('background-image');
    loadingImage.current?.style.removeProperty('background-repeat');
    loadingImage.current?.style.removeProperty('background-size');
  }

  return (
    <img
      className='image_frame--image'
      ref={loadingImage}
      src={blurDataUrl}
      width={imgSize.w}
      height={imgSize.h}
      alt={`placeholder for ${imgAlt}`}
      loading={loading}
      style={{
        borderRadius: '10px',
        transitionDelay: transitionDelay,
        backgroundImage: `url(${blurDataUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    />
  );
}
