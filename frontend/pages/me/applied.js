import axios from "axios";
import Layout from "../../component/layout/Layout";
import DataTable from "react-data-table-component";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";
import Link from "next/link";

export default function JobsAppliedPage({ jobs }) {

    const columns = [{
      name: "Job name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Salary",
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: "Education",
      sortable: true,
      selector: (row) => row.education,
    },
    {
      name: "Experience",
      sortable: true,
      selector: (row) => row.experience,
    },
    {
      name: "Applied On",
      sortable: true,
      selector: (row) => row.appliedOn,
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => row.action,
    }];

  const data = [];

  jobs &&
    jobs.forEach((item) => {
      data.push({
        title: item.job.title,
        salary: item.job.salary,
        education: item.job.education,
        experience: item.job.experience,
        appliedOn: item.appliedAt,
        action: (
          <Link href={`/job/${item.job.id}`}>
            <a className="btn btn-primary">
              <i aria-hidden className="fa fa-eye"></i>
            </a>
          </Link>
        ),
      });
    });

  return (
      <Layout title="Jobs Applied">
          <div className="row">
              <div className="col-2"></div>
              <div className="col-8 mt-5">
                  <h4 className="my-5">Jobs Applied</h4>
          <DataTable columns={columns} data={data} pagination responsive />
              </div>
              <div className="col-2"></div>
          </div>
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

  const res = await axios.get(`${process.env.API}/api/jobs/applied`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const jobs = res.data;

  return {
    props: {
      jobs,
    },
  };
}