import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

const TableSpoonLogo = () => (
  <a
    href="/"
    onMouseEnter={() => Router.prefetch('/')}
    onClick={() => Router.push('/')}
  >
    <h1 className="logo-title">TableSpoon</h1>
  </a>
);

export default TableSpoonLogo;
