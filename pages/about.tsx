import { FaGithub, FaRegEnvelope, FaInstagram } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../helpers/fonts';
import AboutImageCanvas from '../components/Canvas';
import { motion } from 'framer-motion';
import { galleryVariant } from '../helpers/galleryVariants';

export default function About() {
  return (
    <>
      <motion.div
        initial={galleryVariant.galleryStart}
        animate={galleryVariant.galleryEnter}
        exit={galleryVariant.galleryExit}
        variants={galleryVariant}
        className="about--container"
      >
        <h1 className={`about--title ${RobotoSerif.className}`}>About me</h1>
        <div className='about--portrait'>
          <AboutImageCanvas darkMode={false} />
        </div>
        <div className='about--dotted_line' />
        <div className='about--text_block'>
          <p className={`about--sub_text ${RobotoSerif.className}`}>Instinctually, I am a designer. In practice this means giving form to the structureless, visually, computationally, or otherwise.</p>
          <p className={`about--body_text ${roboto.className}`}>I love to dive deep and understand the scaffolding that underpins my task; when the scope of the task outstrips my expertise, I quickly expand the footprint of my knowledge. This impulse also drives me to think simply about problems—to not needlessly introduce abstraction, and ultimately, to write clean, well-formed code.</p>
        </div>
        <div className='about--dotted_line' />
        <nav className='about--links'>
          <h2 className={`about--links-cta ${RobotoSerif.className}`}>Let&apos;s Connect!</h2>
          <ul className='about--link_holder'>
            <li>
              <a href='https://github.com/MisterPea' target='_blank' rel="noreferrer" ><FaGithub size={25} /></a>
            </li>
            <li>
              <a href='https://github.com/MisterPea' target='_blank' rel="noreferrer" ><FaRegEnvelope size={25} /></a>
            </li>
            <li>
              <a href='https://www.instagram.com/_mister_pea/' target='_blank' rel="noreferrer" ><FaInstagram size={25} /></a>
            </li>
          </ul>
        </nav>

      </motion.div>

    </>
  );
}