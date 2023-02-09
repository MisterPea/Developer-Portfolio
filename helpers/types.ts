export type Params = {
  params: {
    project: string;
  };
};

type Links = {
  title: string;
  url: string;
  icon: string;
};

export interface ImageURLObject {
  imageDesc?: string;
  alt: string;
  dimensions: ImageDimensions;
  thumbDimensions: ImageDimensions;
  blurDataURL: string;
  thumb_1x: string;
  thumb_2x: string;
  url_1x: string;
  url_2x: string;
}

export interface ProjectDataProps {
  title: string;
  subTitle: string;
  links: Links[];
  tools: string;
  ideaFeatures: string;
  featuresInclude: string[];
  challenges: string[];
  productImages: ImageURLObject[];
  projectSlug: string;
}

import { NextFont } from '@next/font/dist/types';
import * as CSS from 'csstype';
import { StaticImageData } from 'next/image';

export interface ImageObject {
  mainImage: StaticImageData;
  imageDesc?: string;
  alt: string;
}

export interface SyntheticBaseEvent extends React.SyntheticEvent {
  code: string;
}

type RGB = `rgb(${number},${number},${number})`;
type RGBA = `rgba(${number},${number},${number},${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${number},${number},${number})`;
type ColorTypes = RGB | RGBA | HEX | HSL;

type EM = `${number}em`;
type PX = `${number}px`;
type REM = `${number}rem`;
type CssSizes = EM | REM | PX;

type ImageDimensions = {
  h: number,
  w: number,
};


export interface LightboxProps {
  imageList: ImageObject[];
  thumbnailSize: ImageDimensions;
  backgroundColor?: ColorTypes | 'string';
  controlsColor?: ColorTypes | 'string';
  imageBoxPadding?: CssSizes;
  thumbnailStyle?: CSS.Properties;
  textDescriptionStyle?: CSS.Properties;
  nextFontAccess?: NextFont;
}

export interface LightboxURLProps {
  imageList: ImageURLObject[];
  backgroundColor?: ColorTypes | 'string';
  controlsColor?: ColorTypes | 'string';
  imageBoxPadding?: CssSizes;
  thumbnailStyle?: CSS.Properties;
  textDescriptionStyle?: CSS.Properties;
  nextFontAccess?: string;
}
