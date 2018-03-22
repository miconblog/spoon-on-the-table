import Router from 'next/router';
import Link from 'next/link';

const PrefetchLink = ({ children, style={}, href = '/', as = null }) => (
  <a className='rm' href={as || href} style={style}
    onMouseEnter={() => {
      Router.prefetch(href);
    }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      as ? Router.push(href, as) : Router.push(href);
    }}
  >{children}</a>
);

export default PrefetchLink;