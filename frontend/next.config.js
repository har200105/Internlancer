/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API: "http://localhost:8000",
    RESUME_URL:"https://res.cloudinary.com/harshit111/raw/upload"
  }
}

module.exports = nextConfig
