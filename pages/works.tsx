import ProjectCard from '../components/ProjectCard';
import { roboto, RobotoSerif } from '../helpers/fonts';
import image from '../assets/iPadGroup.png';
import { motion } from 'framer-motion';
import { galleryVariant } from '../helpers/galleryVariants';

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
        <ul className="works--cards-list">
          <li className="works--card-item">
            <ProjectCard
              title='Unsequenced'
              topDesc="A Pomodoro Technique-inspired task/timer app for iOS devices."
              btmDesc="Reclaim time and regain focus. This app allows you to take the Pomodoro concept and enumerate it."
              image={image}
              link='works/unsequenced'
            />
          </li>
          <li className="works--card-item">
            <ProjectCard
              title='S3-UI'
              topDesc="A full-stack UI for AWS&apos;s Simple Storage Service."
              btmDesc="Streamlining the process of managing your files when using Simple Storage Service.."
              image={image}
              link='works/simple-storage-service-ui'
            />
          </li>
          <li className="works--card-item">
            <ProjectCard
              title='NY Times Aggregator & Daily Email Subscription'
              topDesc="NY Times Top Stories combined with a daily email of user-selected top stories."
              btmDesc="Reclaim time and regain focus. This app allows you to take the Pomodoro concept and enumerate it."
              image={image}
              link='works/unsequenced'
            />
          </li>
          <li className="works--card-item">
            <ProjectCard
              title='Fine Art Portfolio with CMS'
              topDesc="Image portfolio and a CMS that allows the user to upload an image and crop it for a thumbnail, as well as add a title and specs."
              btmDesc="Reclaim time and regain focus. This app allows you to take the Pomodoro concept and enumerate it."
              image={image}
              link='works/unsequenced'
            />
          </li>
        </ul>
      </div>
    </motion.div>
  );
}