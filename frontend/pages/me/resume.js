import UploadResume from "../../component/user/UploadResume";
import Layout from "../../component/layout/Layout";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function UploadResumePage({ token }) {
  return (
    <Layout>
     <UploadResume token={token}/>
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