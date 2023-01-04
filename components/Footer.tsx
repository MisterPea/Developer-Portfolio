import { FaGithub, FaRegEnvelope, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { KeyboardEvent } from 'react';

export default function Footer(this: any) {

  function renderEmail(this: any) {
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
    <div className="footer">
      <nav className='footer--links'>
        <ul className='footer--link_holder'>
          <li
            onKeyDown={handleEnterDown.bind(this, { route: 'https://github.com/MisterPea' })}
            onClick={buttonClick.bind(this, 'https://github.com/MisterPea')}
            role='link'
            tabIndex={0}
          ><FaGithub size={18} />
          </li>
          <li
            onKeyDown={handleEnterDown.bind(this, { route: 'https://www.linkedin.com/in/perry-angelora/' })}
            onClick={buttonClick.bind(this, 'https://www.linkedin.com/in/perry-angelora/')}
            role='link'
            tabIndex={0}
          ><FaLinkedinIn size={18} /></li>
          <li
            onKeyDown={handleEnterDown.bind(this, { route: 'https://www.instagram.com/_mister_pea/' })}
            onClick={buttonClick.bind(this, 'https://www.instagram.com/_mister_pea/')}
            role='link'
            tabIndex={0}
          ><FaInstagram size={18} /></li>
          <li
            onKeyDown={handleEnterDown.bind(this, { route: emailClick })}
            onClick={emailClick}
            role='link'
            tabIndex={0}
          ><FaRegEnvelope size={18} /></li>
        </ul>
      </nav>
    </div>
  );

}