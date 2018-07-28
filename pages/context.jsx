import React from 'react';
import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';

function Toolbar(props) {
  return (
    <div>
      <ThemedButton>
        Change Theme
      </ThemedButton>
    </div>
  );
}

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {(store) => {
        
        const state = store.getState();
        
        console.log( state, store );
        //const { state, toggleTheme } = store;
        //console.log(state, toggleTheme)

        return (<button
          onClick={(e)=>store.toggleTheme(state.currentTheme)}
          style={{
            backgroundColor: state.themes[state.currentTheme].background,
            color: state.themes[state.currentTheme].foreground
          }}
        >
          {props.children}
        </button>
        )
      }}
    </ThemeContext.Consumer>
  )
}


const Store = function (){

  const state = {
    currentTheme: 'dark',
    themes: {
      light: {
        foreground: '#000000',
        background: '#eeeeee',
      },
      dark: {
        foreground: '#ffffff',
        background: '#222222',
      },
    },
  }

  const listers = [];


  this.addListener = (callback) =>{
    listers.push(callback);
  }

  this.getState = () =>{
    return state;
  }

  this.changeTheme = (value) => {
    state.currentTheme = value;
  }

  this.toggleTheme = (current) => {


    if (current === 'dark') {
      this.changeTheme('light')
    } else {
      this.changeTheme('dark')
    }

    listers.forEach(f=>f());
  }

}

const store =  new Store();

const ThemeContext = React.createContext();

class ContextAPI extends React.Component {


  constructor(props) {

    super(props);

    store.addListener(this.notify);
  }

  notify = () =>{ 

    console.log('notify....')
    this.forceUpdate();
  }

  render() {

    console.log(this.props, this.state)

    return (
      <div style={{ padding: 20 }}>
        <h1>New ContextAPI</h1>

        <ThemeContext.Provider value={store}>
          <Toolbar />
        </ThemeContext.Provider>
      </div >
    )
  }
};

ContextAPI.getInitialProps = async function ({ isServer, query, req, loginUser }) {

  return {
    isServer,
    loginUser
  };
};

export default withRedux(initStore)(ContextAPI);
