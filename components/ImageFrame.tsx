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
  const loadingImage = useRef<HTMLImageElement>(null);
  const imagesContainer = useRef<HTMLDivElement>(null);
  const placeholderImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadingImagePointer = loadingImage.current;

    if (loadingImage.current?.complete) {
      executeLoadImage();
    }

    loadingImage.current?.addEventListener('load', executeLoadImage);
    placeholderImage.current?.addEventListener('transitionend', hidePlaceholder);

    return () => {
      loadingImagePointer?.removeEventListener('load', executeLoadImage);
    };
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    console.log(w)
  },[])

  function executeLoadImage() {
    if (loadingImage.current && placeholderImage.current && imagesContainer.current) {
      // loadingImage.current.style.opacity = '1';
      // placeholderImage.current.style.opacity = '0';
      imagesContainer.current.style.filter = 'blur(0)';
    }
  }

  function hidePlaceholder() {
    if (placeholderImage.current) {
      placeholderImage.current.style.display = 'none';
    }
  }

  return (
      <img
        className='image_frame--image'
        ref={loadingImage}
        src={blurDataUrl}
        width={imgSize.w}
        height={imgSize.h}
        // srcSet={`${imageURL_1x} 1x, ${imageURL_2x} 2x`}
        alt={`placeholder for ${imgAlt}`}
        style={{
          borderRadius: '5px',
          // position: 'absolute',
          // zIndex: 3,
          // height:'100%',
          // width:'100%',
          // left: 0,
          // top: 0,
          // transitionDelay: transitionDelay,
          // backgroundImage: `url(${blurDataUrl})`,
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover'
        }}
      />
    //   <img
    //     className='image_frame--image main-image'
    //     srcSet={`${imageURL_1x} 1x, ${imageURL_2x} 2x`}
    //     src={`${imageURL_1x}`}
    //     alt={imgAlt}
    //     width={imgSize.w}
    //     height={imgSize.h}
    //     ref={loadingImage}
    //     loading={loading}
    //     decoding='async'
    //     style={{ opacity: 0, transitionDelay: transitionDelay, zIndex: 4 }}
    //   /> 
    // </div >
  );
}
