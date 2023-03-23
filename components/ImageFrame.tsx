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
  const loadingImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    // We immediately disconnect the observer when isIntersecting === true
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          executeLoadImage();
          observer.disconnect();
        }
      });
    }, options);

    // We're attaching out observer to this element
    observer.observe(loadingImage.current!);

    // We're going to attempt to remove the listeners if the user exits 
    // before image loads or before transitionend
    return () => {
      loadingImage.current?.removeEventListener('load', cleanUpLoadImage);
      if (loadingImage.current) {
        (loadingImage.current!.closest('li') as HTMLLIElement)?.removeEventListener('transitionend', resetAnimationDelay);
        loadingImage.current = null;
      }
    };
  }, []);

  function resetAnimationDelay() {
    // We're removing the transition-delay because it will affect :hover transitions...and delay them
    (loadingImage.current!.closest('li') as HTMLLIElement)?.style.removeProperty('transition-delay');
    (loadingImage.current!.closest('li') as HTMLLIElement)?.removeEventListener('transitionend', resetAnimationDelay);
    // We no longer need this reference once all the loading machinations are complete
    loadingImage.current = null;
  }

  function cleanUpLoadImage() {
    (loadingImage.current!.closest('li') as HTMLLIElement).style.filter = 'blur(0px)';
    // We're looking for the completion of the blur transition event
    (loadingImage.current!.closest('li') as HTMLLIElement)?.addEventListener('transitionend', resetAnimationDelay);
    loadingImage.current?.removeEventListener('load', cleanUpLoadImage);
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
