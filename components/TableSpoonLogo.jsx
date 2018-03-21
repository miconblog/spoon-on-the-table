import Router from 'next/router';
import Link from 'next/link';

const TableSpoonLogo = () => (
  <a
    onMouseEnter={() => Router.prefetch('/')}
    onClick={() => Router.push('/')}
  ><h1>TableSpoon</h1></a>
);

export default TableSpoonLogo;