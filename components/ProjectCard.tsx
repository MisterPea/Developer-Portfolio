import Link from 'next/link';
import { roboto, RobotoSerif } from '../helpers/fonts';
import Image from 'next/image';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

interface CardProps {
  title: string;
  topDesc: string;
  image: any;
  link: `works/${string}`;
}

export default function ProjectCard({ title, topDesc, link, image }: CardProps) {
  return (
    <Link href={link}>
      <div className="project_card">
        <div className="project_card--text">
          <h2 className={RobotoSerif.className}>{title}</h2>
          <p className={roboto.className}>{topDesc}</p>
        </div>
        <div className="project_card--image">
          <Image src={image} alt={`${title} project image.`} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }} />
        </div>
      </div>

    </Link>
  );
}