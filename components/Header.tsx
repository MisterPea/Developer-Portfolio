/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { roboto } from '../helpers/fonts';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const route = useRouter();
  // const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
  const currentHeader = useRef<'large' | 'small'>('large');
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  // const prevRoute = useRef(route.asPath)
  const smallTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    bodyRef.current = document.querySelector('body');
    if (route.asPath === '/works/') {
      document.addEventListener('scroll', handleScroll);
    } else {
      document.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [route.asPath]);

  useEffect(() => {
    if (route.asPath !== '/works/') {
      smallTitle.current?.classList.remove('large');
      smallTitle.current?.classList.add('small');
      currentHeader.current = 'small';
    } else {
      smallTitle.current?.classList.remove('small');
      smallTitle.current?.classList.add('large');
      currentHeader.current = 'large';
    }
  }, [route.asPath]);

  const handleScroll = useCallback(() => {
    if (route.asPath === '/works/') {
      isScrolling();
    }
  }, [route.asPath, isScrolling]);

  function isScrolling() {
    window.requestAnimationFrame(() => {
      const yPos = window.scrollY;
      if (yPos > 150 && currentHeader.current === 'large') {
        smallTitle.current?.classList.remove('large');
        smallTitle.current?.classList.add('small');
        currentHeader.current = 'small';
      }
      if (yPos <= 150 && currentHeader.current === 'small') {
        smallTitle.current?.classList.remove('small');
        smallTitle.current?.classList.add('large');
        currentHeader.current = 'large';
      }
    });
  }

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
                <Link href='/works/'>Work</Link>
                <div className={`header--site_nav-bar ${route.asPath === '/works/' ? 'active' : ''}`} />
              </li>
              <li>
                <Link href='/about/'>About</Link>
                <div className={`header--site_nav-bar ${route.asPath === '/about/' ? 'active' : ''}`} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}