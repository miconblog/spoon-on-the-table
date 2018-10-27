import React from 'react';
import { connect } from 'react-redux';
import { HomeLayout } from '../layouts';
import { initStore } from '../redux/store';
import About from '../components/About';
import SiteMap from '../components/SiteMap';
import TableList from '../components/TableList';
import withRedux from '../redux/withRedux';
import { loadTables } from '../utils/api';
// import TableEventSearch from '../components/shared/TableEventSearch';
import TableEventSearchOption from '../components/shared/TableEventSearchOption';
import TableEventSearchResult from '../components/shared/TableEventSearchResult';
import MarkerMap from '../components/shared/MarkerMap';

const Index = (props) => {
  const { loginUser, dispatch, showMarkerMap = false } = props;

  console.log(props);

  return (
    <HomeLayout loginUser={loginUser}>
      {/* <TableEventSearch sticky /> */}
      <TableEventSearchOption
        onChangeMapSwitch={(flag) => dispatch({ type: 'SHOW_MARKER_MAP', payload: flag })
        }
      />

      <div className={showMarkerMap ? 'with-map' : ''}>
        <TableEventSearchResult />
        <TableList {...props} />
        <About />
        <SiteMap />
      </div>
      <div className={showMarkerMap ? 'map-container' : 'map-container hide'}>
        <MarkerMap mapCenter={{ lat: -25.363, lng: 131.044 }} />
      </div>
    </HomeLayout>
  );
};

Index.getInitialProps = async function({ isServer, query, store }) {
  let tables = [];
  if (isServer) {
    tables = [...query.tables];
  } else {
    try {
      const res = await loadTables();

      tables = [...res.tables];
    } catch (e) {
      tables = [];
    }
  }

  return {
    tables,
    loginUser: store.getState().loginUser,
  };
};

function mapStateToProps(state) {
  const { showMarkerMap } = state;
  return { showMarkerMap };
}

export default withRedux(initStore)(connect(mapStateToProps)(Index));
