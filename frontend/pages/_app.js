import { AuthProvider } from '../context/auth';
import { JobProvider } from '../context/job';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
        </JobProvider>
    </AuthProvider>
  );
}

export default MyApp
