import { useEffect, useState } from "react"
import { Kanit } from "next/font/google"
import Image from "next/image"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const RepositoryList = ({ accessToken }) => {
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const languageLogos = {
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    TypeScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "C++":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    Swift:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    Kotlin:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    SASS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    SCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    Shell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    PowerShell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
    SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    MySQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    GraphQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  }

  const fetchRepositories = async () => {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = `/api/githubRepos?page=${page}&searchTerm=${encodeURIComponent(
        searchTerm
      )}`
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      })

      const data = await response.json()
      if (response.ok) {
        setRepos(data)
      } else {
        setError(data.error || "Failed to load repositories")
      }
    } catch (err) {
      setError("Something went wrong")
    }

    setLoading(false)
  }

  useEffect(() => {
    if (accessToken !== undefined) {
      fetchRepositories()
    }
  }, [page, accessToken]) // Re-fetch when page changes
  console.log(repos)
  return (
    <div
      className={` flex flex-col ${kanit.className} items-center  w-max  mx-auto my-10 px-10  py-5 bg-gray-950 `}>
      <h2 className="font-semibold text-[20px] mb-5">User's Repositories</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {repos.length > 0 && (
        <table border="1" cellPadding="10" cellSpacing="1" className="px-5 ">
          {/* <thead>
            <tr>
              <th>#</th>
              <th>Repository Name</th>
              <th>Visibility</th>s
              <th>Stars</th>
              <th>Link</th>
            </tr>
          </thead> */}
          <tbody className="px-5">
            {repos.map((repo, index) => (
              <tr key={repo.id} className="border border-gray-500 space-x-5">
                {/* <td>{(page - 1) * 20 + index + 1}</td> */}
                <td className="pl-5">{repo.name}</td>
                <td className="pl-5">
                  {repo.language ? (
                    <Image
                      src={languageLogos[repo.language]}
                      alt={repo.language}
                      width={25}
                      height={25}
                    />
                  ) : (
                    `${repo.language === null ? "" : repo.language}`
                  )}
                </td>
                <td className="pr-20">
                  {repo.private ? (
                    <svg
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15">
                      <path
                        d="M4.5 6.5v-3a3 3 0 016 0v3m-8 0h10a1 1 0 011 1v6a1 1 0 01-1 1h-10a1 1 0 01-1-1v-6a1 1 0 011-1z"
                        stroke="currentColor"></path>
                    </svg>
                  ) : (
                    ""
                  )}
                </td>
                {/* <td>{repo.stargazers_count}</td> */}
                <td className=" px-5">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 px-3 py-1 text-black">
                    Test
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center w-full px-2 mt-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="disabled:cursor-not-allowed underline">
          Previous
        </button>
        <span> Page {page} </span>
        <button
          disabled={repos.length < 20}
          onClick={() => setPage(page + 1)}
          className="disabled:cursor-not-allowed underline">
          Next
        </button>
      </div>
    </div>
  )
}

export default RepositoryList
