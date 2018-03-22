import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { HomeLayout } from '../layouts';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';

const Post = ({ show }) => (
  <HomeLayout>
    <h1>{show.name}</h1>
    <div dangerouslySetInnerHTML={{ __html: show.summary.replace(/<[/]?tables>/g, '') }} />
    {show.image ? <img src={show.image.medium} /> : false}
  </HomeLayout>
);

Post.getInitialProps = async function ({ query }) {
  const { id } = query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  return { show };
};

export default withRedux(initStore)(Post);
