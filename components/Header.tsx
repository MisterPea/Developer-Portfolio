/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { roboto, RobotoSerif } from '../helpers/fonts';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
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
    // not intersecting. We're really looking that the text is within the bounds of the screen.
    // But it works: if we remove the bigger title from the DOM the
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

  // This preemptively sets the header for the work page when coming from somewhere else
  function handleWorkClick() {
    if (route.asPath !== '/works') {
      deployRetractHeader('large');
    }
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
              <li
                onClick={handleWorkClick}
              >
                <Link href='/works'>Work</Link>
                <div className={`header--site_nav-bar ${route.asPath === '/works' ? 'active' : ''}`} />
              </li>
              <li>
                <Link href='/about'>About</Link>
                <div className={`header--site_nav-bar ${route.asPath === '/about' ? 'active' : ''}`} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div ref={titleBody} className={`header--title large ${RobotoSerif.className}`}>
        <h1 className={`header--title-name ${route.asPath === '/works' ? '' : 'minimize'}`} ref={titleText} >Hi, I&apos;m Perry.</h1>
        <h1 className={`header--title-sub_title ${route.asPath === '/works' ? '' : 'minimize'}`} >Design Technologist/Jack of Many Trades...</h1>
      </div>
    </header>
  );
}