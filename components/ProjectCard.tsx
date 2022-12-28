import Link from "next/link";
import { roboto, RobotoSerif } from '../helpers/fonts';
import Image from "next/image";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

interface CardProps {
  title: string;
  topDesc: string;
  btmDesc: string;
  image: any;
  link: `works/${string}`;
}

export default function ProjectCard({ title, topDesc, btmDesc, link, image }: CardProps) {
  return (
    <Link href={link}>
      <div className="project_card--container">
        <div className="project_card--text_top">
          <h2 className={RobotoSerif.className}>{title}</h2>
          <p className={roboto.className}>{topDesc}</p>
        </div>
        <div className="project_card--text_image_bottom">
          <p className={roboto.className}>{btmDesc}</p>
          <div className="project_card--image">
            <Image src={image} alt={`${title} project image.`} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </Link>
  );
}