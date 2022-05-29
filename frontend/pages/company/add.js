import Layout from "../../component/layout/Layout";
import NewJob from "../../component/NewJob";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function NewJobPage({ token }) {
  return (
    <Layout title="Post a new Job">
      <NewJob token={token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.access;

  const user = await isAuthenticatedUser(token);

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
}