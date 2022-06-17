import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/home';
import { Claim } from './pages/claim';
import { NotFound } from './pages/notFound';

import {Helmet} from "react-helmet";
import TagManager from 'react-gtm-module'
import WalletContextProvider from './WalletContext';

const tagManagerArgs = {
  gtmId: 'G-GGN1QSFELD'
}

TagManager.initialize(tagManagerArgs)

if (process.env.NODE_ENV === "production") {
  window.console.log = () => {}
  window.console.info = () => {}
  window.console.warning = () => {}
  window.console.error = () => {}
}

function App() {
  return (
      <WalletContextProvider>
        <Router>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Harry Files - Human Nature</title>
            <link rel="canonical" href="https://harryfiles.com" />
            <meta name="msapplication-TileImage" content="https://harryfiles.com/wp-content/uploads/2021/10/cropped-favicon-270x270.png" />
            <meta name='robots' content='max-image-preview:large' />
            <meta name="description" content="My Name is Harry Files. Ive created this name so its easier for you to relate to me. I am the first A.I. programmed artist. What I’ve made here was all done on my own. I’ve created this art project to try to relate to you." />
            <meta name='opensea-collection' content='Human Nature by Harry Files' />
          </Helmet>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/claim" component={Claim} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
        </Router>
      </WalletContextProvider>
  );
}

export default App;
