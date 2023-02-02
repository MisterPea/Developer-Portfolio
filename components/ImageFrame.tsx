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
  imageURL: ImageType | string;
  imgAlt: string;
  imgSize: ImgSizeType;
  blurDataUrl: string;
  transitionDelay?: string;
}

import { useEffect, useRef } from 'react';

export default function ImageFrame({ imageURL, imgAlt, imgSize, blurDataUrl, transitionDelay = '0' }: ImageFrameProps) {
  const loadingImage = useRef<HTMLImageElement>(null);
  const imagesContainer = useRef<HTMLDivElement>(null);
  const placeholderImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadingImagePointer = loadingImage.current;

    if (loadingImage.current?.complete) {
      executeLoadImage();
    }

    loadingImage.current?.addEventListener('load', executeLoadImage);

    return () => {
      loadingImagePointer?.removeEventListener('load', executeLoadImage);
    };
  }, []);

  function executeLoadImage() {
    if (loadingImage.current && placeholderImage.current && imagesContainer.current) {
      loadingImage.current.style.opacity = '1';
      placeholderImage.current.style.opacity = '0';
      imagesContainer.current.style.filter = 'blur(0)';
    }
  }


  return (
    <div
      className="image_frame--container"
      style={{ filter: 'blur(5px)', transitionDelay: transitionDelay }}
      ref={imagesContainer}
    >
      <img
        className='image_frame--image placeholder-image'
        ref={placeholderImage}
        src={blurDataUrl}
        alt={`placeholder for ${imgAlt}`}
        style={{ 'borderRadius': '5%', position: 'absolute', zIndex: 3, left: 0, top: 0, width: '100%', height: '100%', transitionDelay: transitionDelay }}
      />
      <img
        className='image_frame--image main-image'
        src={imageURL} alt={imgAlt}
        width={imgSize.w}
        height={imgSize.h}
        ref={loadingImage}
        loading='lazy'
        style={{ opacity: 0, transitionDelay: transitionDelay }}
      />
    </div>
  );
}