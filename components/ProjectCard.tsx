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
  projectSlug: string;
}

export default function ProjectCard({ title, topDesc, projectSlug, image }: CardProps) {
  return (
    <Link href={{
      pathname: '/works/[slug]',
      query: {slug: projectSlug}
    }}>
      <div className="project_card">
        <div className="project_card--text">
          <h2 className={RobotoSerif.className}>{title}</h2>
          <p className={roboto.className}>{topDesc}</p>
        </div>
        <div className="project_card--image">
          <Image src={require(`../public/images/${image}`)} alt={`${title} project image.`} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }} />
        </div>
      </div>
    </Link>
  );
}