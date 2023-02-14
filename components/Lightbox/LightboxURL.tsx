import { useState } from 'react';
import { LightboxURLProps } from '../../helpers/types';
import ImageFrame from '../ImageFrame';
import LightboxOverlay from './LightboxOverlay';

export default function LightboxURL({
  imageList,

}: LightboxURLProps) {
  const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null);

  // Initial click on a thumbnail
  function handleOnThumbClick(imageIndex: number) {
    setModalOpenIndex(imageIndex);
  }

  return (
    <>
      {modalOpenIndex !== null && <LightboxOverlay imageList={imageList} openIndex={modalOpenIndex} closeModalCallback={setModalOpenIndex} />}
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
