import PropTypes from 'prop-types';
import RequestReset from '../components/RequetReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </>
    );
  }
  return (
    <div>
      <p>Reset Your Password</p>
      <Reset token={query.token} />
    </div>
  );
}

ResetPage.propTypes = {
  query: PropTypes.string,
};
