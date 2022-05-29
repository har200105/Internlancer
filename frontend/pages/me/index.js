import Layout from "../../component/layout/Layout";
import EditProfile from "../../component/user/EditProfile";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function UpdateProfilePage({ token }) {
  return (
    <Layout>
      <EditProfile token={token} />
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