/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef, SetStateAction, Dispatch } from 'react';
import { ImageURLObject } from '../../helpers/types';
import ImageFrame from '../ImageFrame';
import { TfiClose, TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { SlClose } from 'react-icons/sl';
import { roboto } from '../../helpers/fonts';
import { SyntheticBaseEvent } from '../../helpers/types';

interface LightboxOverlayProps {
  imageList: ImageURLObject[];
  openIndex: number;
  closeModalCallback: Dispatch<SetStateAction<number | null>>;
}

export default function LightboxOverlay({ imageList, openIndex, closeModalCallback }: LightboxOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(openIndex);
  const currentImages = useRef<HTMLUListElement>(null);
  const imageArray = useRef<any>([]);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentImages.current && lightboxRef.current) {
      // Show initial image
      document.querySelector('html')?.classList.add('no-scroll');
      imageArray.current = currentImages.current.querySelectorAll('.lightbox--li');
      imageArray.current[openIndex].scrollIntoView({ behavior: 'instant' });
      lightboxRef.current.classList.add('active');
      lightboxRef.current.focus();
    }
  }, [openIndex]);


  function handleKeyDown(e: SyntheticBaseEvent) {
    if (e.code === 'Escape') {
      closeOverlay();
    }
    if (e.code === 'ArrowLeft') {
      prevImage();
    }
    if (e.code === 'ArrowRight') {
      nextImage();
    }
  }

  function getCurrentInFrameImage(): number {
    const elements = currentImages.current?.querySelectorAll('li');
    let output = -1;
    elements?.forEach((element, index) => {
      const { left, width } = element.getBoundingClientRect();
      const math = Math.floor(left + width);
      if (math > 0 && math <= width) {
        output = index;
      }
    });
    return output;
  }

  function prevImage() {
    const imageIndex = getCurrentInFrameImage();
    if (imageIndex > 0) {
      imageArray.current[imageIndex - 1].scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(imageIndex - 1);
    }
  }

  function nextImage() {
    const imageArrayLength = imageArray.current.length;
    const imageIndex = getCurrentInFrameImage();
    if (imageIndex > -1 && imageIndex < (imageArrayLength - 1)) {
      imageArray.current[imageIndex + 1].scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(imageIndex + 1);
    }
  }

  function closeOverlayCleanup(event: TransitionEvent) {
    if (event.propertyName === 'opacity') {
      lightboxRef.current?.removeEventListener('transitionend', closeOverlayCleanup);
      closeModalCallback(null);
    }
  }

  function closeOverlay() {
    // When this is called we:
    // setEventListener -> Clean up the everything -> Fade out -> When done fading call setState from LightboxURL
    lightboxRef.current?.addEventListener('transitionend', closeOverlayCleanup);
    document.querySelector('html')?.classList.remove('no-scroll');
    const currentlyInFrame = currentImages.current?.querySelectorAll('.in-frame');
    currentlyInFrame?.forEach((element) => element.classList.remove('in-frame'));
    currentImages.current?.blur();
    lightboxRef.current?.classList.remove('active');
  }

  return (
    <div
      className='lightbox'
      onKeyDownCapture={handleKeyDown}
      ref={lightboxRef}
      tabIndex={0}
    >
      <span className='lightbox--button_group'>
        <button
          id='lightbox-close-btn'
          style={{ color: '#303000' }}
          onClick={closeOverlay}
          aria-controls='main-image-viewer'
          aria-label='Close Image Viewer'
        >
          <TfiClose size={25} />
        </button>
        <button
          className='lightbox--nav_buttons-prev'
          style={{ color: '#303000', display: `${currentIndex === 0 ? 'none' : 'block'}` }}
          onClick={prevImage}
          aria-controls='main-image-viewer'
          aria-label='View Previous Image'
          aria-disabled={currentIndex === 0 ? true : false}
        >
          <TfiAngleLeft size={30} />
        </button>
        <button
          className='lightbox--nav_buttons-next'
          style={{ color: '#303000', display: `${currentIndex === imageArray.current.length - 1 ? 'none' : 'block'}` }}
          onClick={nextImage}
          aria-controls='main-image-viewer'
          aria-label='View Next Picture'
          aria-disabled={currentIndex === imageArray.current.length - 1 ? true : false}
        >
          <TfiAngleRight size={30} />
        </button>
      </span>
      <ul ref={currentImages} className='lightbox--ul'>
        {imageList.map(({ alt, url_1x, url_2x, imageDesc, dimensions, blurDataURL }, index) => (
          <li key={`main-image-${index}`} className='lightbox--li' >
            <div className='lightbox--image-wrapper'>
              <ImageFrame
                key={url_1x}
                imageURL_1x={`/images/product_images/${url_1x}`}
                imageURL_2x={`/images/product_images/${url_2x}`}
                imgAlt={alt}
                imgSize={{ h: dimensions.h, w: dimensions.w }}
                blurDataUrl={blurDataURL}
                loading='eager'
              />
            </div>
            <p className={`lightbox--image-description ${roboto.className}`}>{imageDesc}</p>
          </li>
        ))}
        <button onClick={closeOverlay} className='mobile-close'>
          <SlClose size={35} />
        </button>
      </ul>
    </div>
  );
}
