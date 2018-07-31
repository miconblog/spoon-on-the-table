import React from 'react';
import { withRouter } from 'next/router';

const PrefetchLink = ({ children, href = '/', as = null, router }) => (
  <a
    href={as || href}
    onMouseEnter={() => {
      router.prefetch(href);
    }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();

      if (as) {
        router.push(href, as);
      } else {
        router.push(href);
      }
    }}
  >
    {children}
  </a>
);

export default withRouter(PrefetchLink);
