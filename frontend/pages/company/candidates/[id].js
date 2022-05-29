import Layout from "../../../component/layout/Layout";
import { isAuthenticatedUser } from "../../../utils/isAuthenticated";
import axios from "axios";
import Link from "next/link";
import DataTable from "react-data-table-component";

export default function JobCandidatesPage({ candidatesApplied, error }) {

  const columns = [
    {
      name: "Job Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "User ID",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Candidate Resume",
      sortable: true,
      selector: (row) => row.resume,
    },
    {
      name: "Applied At",
      sortable: true,
      selector: (row) => row.appliedAt,
    },
  ];

  const data = [];

  candidatesApplied &&
    candidatesApplied.forEach((item) => {
      data.push({
        title: item.job.title,
        id: item.user,
        salary: item.salary,
        resume: (
          <Link href={`${process.env.RESUME_URL}/${item.resume}`}>
            <a
              className="text-success text-center ml-4"
              rel="noreferrer"
              target="_blank"
            >
              <b>
                <i aria-hidden className="fas fa-download"></i> View Resume
              </b>
            </a>
          </Link>
        ),
        appliedAt: item.appliedAt.substring(0, 10),
      });
    });

  return (
    <Layout>
        <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">
          {candidatesApplied &&
            `${candidatesApplied.length} Candidates applied to this job`}
        </h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className="col-2"></div>
    </div>
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
      `${process.env.API}/api/job/${params.id}/candidates/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const candidatesApplied = res.data;

    return {
      props: {
        candidatesApplied,
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