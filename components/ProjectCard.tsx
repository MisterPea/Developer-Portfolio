import Link from 'next/link';
import { roboto, RobotoSerif } from '../helpers/fonts';
import Image from 'next/image';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type MainImages = {
  mainImage_one_1x: string,
  mainImage_one_2x: string,
  mainImage_two_1x: string,
  mainImage_two_2x: string,
  mainImage_three_1x: string,
  mainImage_three_2x: string;
};

interface CardProps {
  title: string;
  topDesc: string;
  projectSlug: string;
  mainImages: MainImages;
}

export default function ProjectCard({ title, topDesc, projectSlug, mainImages }: CardProps) {
  const { mainImage_one_1x, mainImage_one_2x, mainImage_two_1x, mainImage_two_2x, mainImage_three_1x, mainImage_three_2x } = mainImages;
  return (
    <Link href={{
      pathname: '/works/[slug]',
      query: { slug: projectSlug }
    }}>
      <div className="project_card">
        <div className="project_card--text">
          <h2 className={RobotoSerif.className}>{title}</h2>
          <p className={roboto.className}>{topDesc}</p>
        </div>
        <div className="project_card--image">
          <picture>
            <source media='(max-width: 749px)' srcSet={`/images/works_images/${mainImage_one_1x} 1x, /images/works_images/${mainImage_one_2x} 2x`} />
            <source media='(min-width: 750px)' srcSet={`/images/works_images/${mainImage_two_1x} 1x, /images/works_images/${mainImage_two_2x} 2x`} />
            <source media='(min-width: 1024px)' srcSet={`/images/works_images/${mainImage_three_1x} 1x, /images/works_images/${mainImage_three_2x} 2x`} />
            <img src={`/images/works_images/${mainImage_one_1x}`} loading='eager' alt={`${title} project image.`} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }} />
          </picture>
          {/* <Image priority src={require(`../public/images/${image}`)} alt={`${title} project image.`} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }} /> */}
        </div>
      </div>
    </Link>
  );
}