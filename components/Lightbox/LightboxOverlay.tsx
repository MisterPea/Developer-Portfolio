/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { ImageURLObject } from '../../helpers/types';
import ImageFrame from '../ImageFrame';

export default function LightboxOverlay({ imageList, openIndex }: { imageList: ImageURLObject[], openIndex: number; }) {
  const [currentIndex, setCurrentIndex] = useState<number>(openIndex);

  return (
    <div className='lightbox'>
      <ul>
        {imageList.map(({ alt, url_1x, url_2x, imageDesc, dimensions, blurDataURL }, index) => (
          <li key={`main-image-${index}`}>
            
            <ImageFrame
              key={url_1x}
              imageURL_1x={`/images/product_images/${url_1x}`}
              imageURL_2x={`/images/product_images/${url_2x}`}
              imgAlt={alt}
              imgSize={{ h: dimensions.h, w: dimensions.w }}
              blurDataUrl={blurDataURL}
              loading='eager'
            />
          </li>
        ))}
      </ul>

    </div>
  );
}