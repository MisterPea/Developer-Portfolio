import ProjectCard from '../components/ProjectCard';
import { roboto } from '../helpers/fonts';
import { motion } from 'framer-motion';
import { galleryVariant } from '../helpers/galleryVariants';
import ProjectData from '../public/workPagesContent.json';

const container = {
  hidden: { opacity: 0 },
  show: {
    ease: [.14, .66, .48, .98],
    opacity: 1,
    transition: {
      staggerChildren: 0.125,
    },
  }
};

const item = {
  hidden: {
    transition: {
      duration: 0.5,
      type: 'tween',
    },
    opacity: 0,
  },
  show: {
    transition: {
      duration: 0.5,
      type: 'tween',
    },
    opacity: 1,
  },
};

export default function Works() {

  return (
    <motion.div
      initial={galleryVariant.galleryStart}
      animate={galleryVariant.galleryEnter}
      exit={galleryVariant.galleryExit}
      variants={galleryVariant}
      className="works--container"
    >
      <p className={`works--header ${roboto.className}`}>Here&apos;s a selection of some recent projects.</p>
      <div className="works--dotted_line" />
      <div className='works--cards-container'>
        <motion.ul
          variants={container}
          initial='hidden'
          animate='show'
          className="works--cards-list">
          {ProjectData.map(({ title, mainPageDescription, projectSlug, mainImage }, index) => (
            <motion.li
              variants={item}
              className="works--card-item"
              key={`project-${index}`}
            >
              <ProjectCard
                title={title}
                topDesc={mainPageDescription}
                image={mainImage}
                projectSlug={projectSlug}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}