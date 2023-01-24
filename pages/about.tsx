import { FaGithub, FaRegEnvelope, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../helpers/fonts';
import AboutImageCanvas from '../components/Canvas';
import { motion } from 'framer-motion';
import { aboutVariant } from '../helpers/galleryVariants';
import { KeyboardEvent, useLayoutEffect } from 'react';
import RingedIcon from '../components/RingedIcon';

export default function About(this: any) {

  function renderEmail() {
    const decoded = [];
    const sorted = ' _:!?.@=abceghijJlmnoprstuy';
    const numArray = [
      18, 8, 14, 17, 24, 20, 2, 13, 11, 17, 17, 20,
      1, 24, 13, 11, 22, 11, 6, 18, 14, 23, 24, 11,
      22, 21, 11, 8, 5, 18, 11, 4, 23, 25, 9, 15,
      11, 10, 24, 7, 16, 25, 23, 24, 0, 23, 8, 26,
      14, 19, 12, 0, 13, 11, 17, 17, 20, 3
    ];
    for (let i = 0; i < numArray.length; i += 1) {
      decoded.push(sorted[numArray[i]]);
    } 0;
    return decoded.join('');
  }

  function buttonClick(route: string) {
    window.open(route, '_blank');
  }

  function emailClick() {
    return window.location.href = renderEmail();
  }

  function handleEnterDown({ route }: { route: string | (() => void); }, e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (typeof route === 'string') {
        window.open(route, '_blank');
      } else {
        route();
      }
    }
  }


  return (
    <>
      <motion.div
        initial={aboutVariant.aboutStart}
        animate={aboutVariant.aboutEnter}
        exit={aboutVariant.aboutExit}
        variants={aboutVariant}
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
            <li
              onKeyDown={handleEnterDown.bind(this, { route: 'https://github.com/MisterPea' })}
              onClick={buttonClick.bind(this, 'https://github.com/MisterPea')}
              role='link'
            >
              <RingedIcon icon={<FaGithub size={26} />} />
            </li>
            <li
              onKeyDown={handleEnterDown.bind(this, { route: 'https://www.linkedin.com/in/perry-angelora/' })}
              onClick={buttonClick.bind(this, 'https://www.linkedin.com/in/perry-angelora/')}
              role='link'
            ><RingedIcon icon={<FaLinkedinIn size={26} />} /></li>
            <li
              onKeyDown={handleEnterDown.bind(this, { route: 'https://www.instagram.com/_mister_pea/' })}
              onClick={buttonClick.bind(this, 'https://www.instagram.com/_mister_pea/')}
              role='link'
            ><RingedIcon icon={<FaInstagram size={26} />} /></li>
            <li
              onKeyDown={handleEnterDown.bind(this, { route: emailClick })}
              onClick={emailClick}
              role='link'
            ><RingedIcon icon={<FaRegEnvelope size={26} />} /></li>
          </ul>
        </nav>
      </motion.div>
    </>
  );
}