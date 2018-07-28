import React from 'react';
import Router from 'next/router';

const PrefetchLink = ({ children, href = '/', as = null }) => (
  <a
    href={as || href}
    onMouseEnter={() => {
      Router.prefetch(href);
    }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();

      if (as) {
        Router.push(href, as);
      } else {
        Router.push(href);
      }
    }}
  >
    {children}
  </a>
);

export default PrefetchLink;
