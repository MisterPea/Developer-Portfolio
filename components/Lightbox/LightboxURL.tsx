/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { LightboxURLProps } from '../../helpers/types';
import { TfiClose, TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { SlClose } from 'react-icons/sl';
import { SyntheticBaseEvent } from '../../helpers/types';
import ImageFrame from '../ImageFrame';

export default function LightboxURL({
  imageList,
  backgroundColor,
  controlsColor,
  imageBoxPadding,
  textDescriptionStyle,
  nextFontAccess,
}: LightboxURLProps) {
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const imageArray = useRef<any>([]);
  const lightboxDiv = useRef<HTMLDivElement>(null);
  const imageUL = useRef<HTMLUListElement>(null);

  useEffect(() => {
    imageArray.current = lightboxDiv.current!.querySelectorAll("[class^='image_container--item']");

    // These two listeners are here to execute changes in z-index when the opacity transition begins and ends.
    (lightboxDiv.current as HTMLElement).addEventListener('transitionstart', activeZIndex);
    (lightboxDiv.current as HTMLElement).addEventListener('transitionend', inactiveZIndex);

    // Here, we're initiating our IntersectionObserver for the lightbox contents
    const options = {
      root: imageUL.current,
      rootMargin: '-2%',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(intersectCallback, options);

    if (imageArray.current) {
      for (let image of imageArray.current) {
        observer.observe(image);
      }
    }

    return () => {
      removeEventListener('transitionstart', activeZIndex);
      removeEventListener('transitionend', inactiveZIndex);
      observer.disconnect();
    };
  }, []);


  function intersectCallback(entries: IntersectionObserverEntry[]) {
    // the length test is to filter-out the initial triggering of the callback
    // in which `entries` is all the observed elements
    if (entries.length === 1) {
      if (entries[0].isIntersecting) {
        const currentIndex = getImageIndex(entries[0].target);
        setCurrentImage(currentIndex);
        entries[0].target.classList.add('in-frame');
        entries[0].target.querySelector('.image-description')?.classList.add('in-frame');
      } else {
        entries[0].target.classList.remove('in-frame');
        entries[0].target.querySelector('.image-description')?.classList.remove('in-frame');
      }
    }

    function getImageIndex(currentImage: any): number {
      for (let i = 0; i < imageArray.current.length; i += 1) {
        const currentImageNode = imageArray.current[i];
        if (currentImage.isEqualNode(currentImageNode)) {
          return i;
        }
      }
      return -1;
    }
  }

  // FUNCTIONS TO HANDLE THE ALTERING OF z-index while switching images //
  // The idea is that when we see an opacity change we switch the z-index.
  // The first change that also happens is handleOnThumbClick where we set the
  // display to 'block', which allows us to have an opacity change. On the way
  // out, we set the display to 'none' after we see the opacity on the image-description 
  // stop, because that element is the last to fade out due to transition-delay.
  function activeZIndex(e: TransitionEvent) {
    if (e.propertyName === 'opacity') {
      if (lightboxDiv.current?.classList.contains('active')) {
        (lightboxDiv.current as HTMLElement).style.zIndex = '10';
        (lightboxDiv.current as HTMLElement).setAttribute('aria-hidden', 'false');

      }
    }
  }

  function inactiveZIndex(e: TransitionEvent) {
    if (e.propertyName === 'opacity') {
      if (!lightboxDiv.current?.classList.contains('active')) {
        (lightboxDiv.current as HTMLElement).style.zIndex = '-1';
        (lightboxDiv.current as HTMLElement).setAttribute('aria-hidden', 'true');
      }
    }

  }

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

  function closeOverlay() {
    lightboxDiv.current!.classList.remove('active');
    document.querySelector('html')?.classList.remove('no-scroll');
    const currentlyInFrame = imageUL.current?.querySelectorAll('.in-frame');
    currentlyInFrame?.forEach((element) => element.classList.remove('in-frame'));
    setCurrentImage(null);
    lightboxDiv.current?.blur();
  }

  function prevImage() {
    if (currentImage! > 0) {
      imageArray.current[currentImage!].classList.remove('in-frame');
      imageArray.current[currentImage!].querySelector('.image-description').classList.remove('in-frame');
      imageArray.current[currentImage! - 1].scrollIntoView({ behavior: 'smooth' });
    }
  }

  function nextImage() {
    const imageArrayLength = imageArray.current.length;
    if (currentImage! < imageArrayLength - 1) {
      imageArray.current[currentImage!].classList.remove('in-frame');
      imageArray.current[currentImage!].querySelector('.image-description').classList.remove('in-frame');
      imageArray.current[currentImage! + 1].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Initial click on a thumbnail
  function handleOnThumbClick(imageIndex: number) {
    document.querySelector('html')?.classList.add('no-scroll');
    setCurrentImage(imageIndex);
    imageArray.current[imageIndex].scrollIntoView({ behavior: 'instant' });
    imageArray.current[imageIndex].classList.add('in-frame');
    imageArray.current[imageIndex].querySelector('.image-description')?.classList.add('in-frame');
    lightboxDiv.current?.classList.add('active');
    lightboxDiv.current?.focus();
  }

  return (
    <>
      <div
        className='main_image_container'
        ref={lightboxDiv}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-hidden='true'
        style={{ backgroundColor: backgroundColor }}
      >
        <span className='main_image_container--button_group'>
          <button
            className='main_image_container--close_button'
            style={{ color: controlsColor }}
            onClick={closeOverlay}
            aria-controls='main-image-viewer'
            aria-label='Close Image Viewer'
          >
            <TfiClose size={25} />
          </button>
          <button
            className='main_image_container--nav_button-prev'
            style={{ color: controlsColor, display: `${currentImage === 0 ? 'none' : 'block'}` }}
            onClick={prevImage}
            aria-controls='main-image-viewer'
            aria-label='View Previous Image'
            aria-disabled={currentImage === 0 ? true : false}
          >
            <TfiAngleLeft size={30} />
          </button>
          <button
            className='main_image_container--nav_button-next'
            style={{ color: controlsColor, display: `${currentImage === imageArray.current.length - 1 ? 'none' : 'block'}` }}
            onClick={nextImage}
            aria-controls='main-image-viewer'
            aria-label='View Next Picture'
            aria-disabled={currentImage === imageArray.current.length - 1 ? true : false}
          >
            <TfiAngleRight size={30} />
          </button>
        </span>
        <ul
          id='main-image-viewer'
          className='image_container'
          ref={imageUL}
          style={{ padding: imageBoxPadding }}
        >
          {imageList.map(({ alt, url_1x, url_2x, imageDesc, dimensions, blurDataURL }, index) => (
            <li
              key={`${alt}-main-image-${index}`}
              className={'image_container--item'}
            >
              <div
                className='image_container--image_wrap-outer'
              >
                <ImageFrame
                  key={url_1x}
                  imageURL_1x={`/images/product_images/${url_1x}`}
                  imageURL_2x={`/images/product_images/${url_2x}`}
                  imgAlt={alt}
                  imgSize={{ h: dimensions.h, w: dimensions.w }}
                  blurDataUrl={blurDataURL}
                  loading='lazy'
                />
              </div>
              <div className={`image-description ${nextFontAccess}`} style={textDescriptionStyle}>
                <p>{imageDesc}</p></div>
            </li>
          ))}
          <button onClick={closeOverlay} className='mobile-close'>
            <SlClose size={35} />
          </button>
        </ul>
      </div>
      <div className="main_thumbnail_container">
        <ul key={'ul-thumb'} className="thumbnail_container">
          {imageList.map(({ alt, thumb_1x, thumb_2x, thumbDimensions, blurDataURL }, index) => (
            <li
              key={`${alt}-${index}`}
              className={'thumbnail_container--item-image'}
              onClick={() => handleOnThumbClick(index)}
              role='listitem'
              style={{
                transitionDelay: `${(index * 60)}ms`
              }}
            >
              <ImageFrame
                key={thumb_1x}
                imageURL_1x={`/images/product_images/${thumb_1x}`}
                imageURL_2x={`/images/product_images/${thumb_2x}`}
                imgAlt={alt}
                imgSize={{ h: thumbDimensions.h, w: thumbDimensions.w }}
                blurDataUrl={blurDataURL}
                loading='lazy'
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
