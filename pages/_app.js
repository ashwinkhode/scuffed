/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import NProgress from 'nprogress';
import Router from 'next/router'
import Page from '../components/Page';

import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function AppPage({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default AppPage;
