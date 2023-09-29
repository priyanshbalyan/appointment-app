import { Link } from 'react-router-dom';

export const ErrorPage = (): React.ReactElement => {
  return (
    <div style={{ marginTop: '200px' }}>
      <p>Something went wrong!</p>
      <Link to="/">
        <button>Go back to home</button>
      </Link>
    </div>
  );
};
