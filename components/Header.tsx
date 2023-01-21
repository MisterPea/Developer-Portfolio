/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { roboto, RobotoSerif } from '../helpers/fonts';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const [currentPage, setCurrentPage] = useState<string | undefined>(undefined);
  const route = useRouter();
  const titleText = useRef<HTMLHeadingElement>(null);
  const titleBody = useRef<HTMLDivElement>(null);
  const smallTitle = useRef<HTMLHeadingElement>(null);

  /**
   * Convenience method to handle deployment and retraction of the header text
   * @param {'small'|'large'} currentHeader The header change to make.
   * 'small'= deploy small header and retract the large one
   */
  function deployRetractHeader(currentHeader: 'small' | 'large') {
    const previousHeader = currentHeader === 'small' ? 'large' : 'small';
    titleBody.current?.classList.remove(previousHeader);
    smallTitle.current?.classList.remove(previousHeader);
    titleBody.current?.classList.add(currentHeader);
    smallTitle.current?.classList.add(currentHeader);
  }

  // Intersection observer for the title
  const callIntersect = (entry: IntersectionObserverEntryInit[]) => {
    // for some reason isIntersecting: true is actually not intersecting, and visa versa
    // not intersecting. But it works: if we remove the bigger title from the DOM the
    // smaller one auto-magically deploys.
    const displayLargeText = entry[0].isIntersecting;
    if (displayLargeText) {
      deployRetractHeader('large');
    } else {
      deployRetractHeader('small');
    }
  };

  const options: IntersectionObserverInit = {
    root: null,
    threshold: 1,
  };

  useEffect(() => {
    let finalPath;
    const path: string[] = route.pathname.split('/');
    finalPath = path.reverse()[0];
    if (finalPath !== currentPage) {
      setCurrentPage(finalPath);
    }
  }, [route]);

  useEffect(() => {
    if (titleText.current) {
      const observer = new IntersectionObserver(callIntersect, options);
      observer.observe(titleText.current);
    }
  }, [titleText.current]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <header className='header--container'>
      <div className='header--top-fixed'>
        <div className='header--top-flex'>
          <h1
            ref={smallTitle}
            className={`header--small_title large ${roboto.className}`}
            onClick={scrollToTop}
            tabIndex={0}
            role='button'
          >
            mister<span>pea</span>.me
          </h1>
          <nav className='header--site_nav'>
            <ul className={roboto.className}>
              <li>
                <Link href='/works'>Work</Link>
                <div className={`header--site_nav-bar ${currentPage === 'works' ? 'active' : ''}`} />
              </li>
              <li>
                <Link href='/about'>About</Link>
                <div className={`header--site_nav-bar ${currentPage === 'about' ? 'active' : ''}`} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div ref={titleBody} className={`header--title large ${RobotoSerif.className}`}>
        <h1 className={`header--title-name ${currentPage !== 'works' ? 'minimize' : ''}`} ref={titleText} >Hi, I&apos;m Perry.</h1>
        <h1 className={`header--title-sub_title ${currentPage !== 'works' ? 'minimize' : ''}`} >Design Technologist/Jack of Many Trades...</h1>
        {/* <h1 style={{ display: currentPage !== 'works' ? 'none' : 'block' }} ref={titleText} className='header--title-name'>Hi, I&apos;m Perry.</h1>
        <h1 style={{ display: currentPage !== 'works' ? 'none' : 'block' }} className='header--title-sub_title'>Design Technologist/Jack of Many Trades...</h1> */}
      </div>
    </header>
  );
}