import { Endpoints } from 'features/router/endpoints';
import { Link } from 'react-router-dom';

export const ErrorPage = (): React.ReactElement => {
  return (
    <div style={{ marginTop: '200px' }}>
    <center>
      <p>Something went wrong!</p>
      <Link to={Endpoints.SIGN_IN}>
        <button>Go back to home</button>
      </Link>
    </center>
    </div>
  );
};
