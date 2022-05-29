import Layout from "../../component/layout/Layout";
import UpdateJob from "../../component/UpdateJob";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";
import axios from "axios";

export default function UpdateJobPage({ job, token, error }) {

  return (
    <Layout>
      <UpdateJob job={job} token={token} />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
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

  try {
    const res = await axios.get(
      `${process.env.API}/api/job/${params.id}`
    );

    console.log(res.data);

    const job = res.data.job;

    return {
      props: {
        job,
        token,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}