import React from "react";
import {Provider} from 'react-redux'
import store from './store'
import Home from './components/Home'

function App() {
  return (
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
