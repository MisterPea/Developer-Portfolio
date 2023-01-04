import ProjectCard from '../components/ProjectCard';
import { roboto, RobotoSerif } from '../helpers/fonts';
import iPhones from '../public/images/iPhone_combined.png';
import s3Combo from '../public/images/s3_combo.png';
import nytCombo from '../public/images/nyt_combo.png';
import fineArtCombo from '../public/images/fine_art_combo.png';
import { motion } from 'framer-motion';
import { galleryVariant } from '../helpers/galleryVariants';

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
          <motion.li variants={item} className="works--card-item">
            <ProjectCard
              title='Unsequenced'
              topDesc="A Pomodoro Technique-inspired task/timer app for the iPhone, developed to help you stay on track and effectively manage your time."
              image={iPhones}
              link='works/unsequenced'
            />
          </motion.li>
          <motion.li variants={item} className="works--card-item">
            <ProjectCard
              title='S3-UI'
              topDesc="A full-stack UI for AWS&apos;s Simple Storage Service that streamlines essential actions and simplifies the process of file uploads and downloads."
              image={s3Combo}
              link='works/simple-storage-service-ui'
            />
          </motion.li>
          <motion.li variants={item} className="works--card-item">
            <ProjectCard
              title='News Aggregator & Daily Email Subscription'
              topDesc="A portal to view Top Stories from the NY Times, and subscribe to a daily email of user-selected story topics."
              image={nytCombo}
              link='works/top-stories'
            />
          </motion.li>
          <motion.li variants={item} className="works--card-item">
            <ProjectCard
              title='Fine Art Portfolio & CMS'
              topDesc="Image portfolio coupled with a CMS, allowing images uploads, semi-autonomous thumbnail creation, image labeling and organization."
              image={fineArtCombo}
              link='works/fine-art-portfolio'
            />
          </motion.li>
        </motion.ul>
      </div>
    </motion.div>
  );
}