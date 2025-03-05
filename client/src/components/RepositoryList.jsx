import { useEffect, useState } from "react"
import { Kanit } from "next/font/google"
import Image from "next/image"
import { useRouter } from "next/router"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const RepositoryList = ({ accessToken }) => {
  const router = useRouter()
  const [allRepos, setAllRepos] = useState([])
  const [displayedRepos, setDisplayedRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const languageLogos = {
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "c++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "c#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    swift: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    scss: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    shell: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    powershell: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
    sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  }

  const changeCurrentRepo = (settingrepo) => {
    localStorage.setItem("selectedRepoUrl", settingrepo)
    router.push("/dashboard")
  }

  const getLanguageLogo = (language) => {
    if (!language) return null
    
    const normalizedLanguage = language.toLowerCase().trim()
    
    // Check for exact match
    if (languageLogos[normalizedLanguage]) {
      return languageLogos[normalizedLanguage]
    }
    
    // Check for partial matches
    const matchedKey = Object.keys(languageLogos).find(key => 
      normalizedLanguage.includes(key)
    )
    
    return matchedKey ? languageLogos[matchedKey] : null
  }

  const fetchAllRepositories = async () => {
    setLoading(true)
    setError(null)
    try {
      const allReposData = []
      let page = 1
      let hasMoreRepos = true

      while (hasMoreRepos) {
        const apiUrl = `/api/githubRepos?page=${page}`
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const data = await response.json()
        
        if (response.ok) {
          if (data.length === 0) {
            hasMoreRepos = false
          } else {
            allReposData.push(...data)
            page++
          }
        } else {
          setError(data.error || "Failed to load repositories")
          hasMoreRepos = false
        }
      }

      // Log languages to help debug
      console.log('Repositories Languages:', allReposData.map(repo => repo.language))

      setAllRepos(allReposData)
      setDisplayedRepos(allReposData)
    } catch (err) {
      setError("Something went wrong while fetching repositories")
    } finally {
      setLoading(false)
    }
  }

  // Filter repositories based on search term
  const filterRepositories = (searchTerm) => {
    if (!searchTerm) {
      setDisplayedRepos(allRepos)
    } else {
      const filteredRepos = allRepos.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setDisplayedRepos(filteredRepos)
    }
  }

  // Fetch all repositories on component mount
  useEffect(() => {
    if (accessToken !== undefined) {
      fetchAllRepositories()
    }
  }, [accessToken])

  // Filter repositories when search term changes
  useEffect(() => {
    filterRepositories(searchTerm)
  }, [searchTerm, allRepos])

  return (
    <div
      className={`flex flex-col ${kanit.className} items-center w-max mx-auto my-10 px-10 py-5 bg-gray-950`}>
      <h2 className="font-semibold text-[20px] mb-5">User's Repositories</h2>

      {/* Search Input */}
      <div className="mb-5 w-full max-w-md">
        <input
          type="text"
          placeholder="Search repositories by name, language, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-white">Loading repositories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && displayedRepos.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Language</th>
                <th className="p-2 text-left">Private</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedRepos.map((repo) => {
                const languageLogo = getLanguageLogo(repo.language)
                return (
                  <tr key={repo.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-2">
                      <div className="flex items-center">
                        <span className="mr-2">{repo.name}</span>
                        {repo.description && (
                          <span className="text-gray-400 text-sm truncate max-w-xs">
                            {repo.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      {repo.language ? (
                        <div className="flex items-center">
                          {languageLogo && (
                            <Image
                              src={languageLogo}
                              alt={repo.language}
                              width={25}
                              height={25}
                              className="mr-2"
                            />
                          )}
                          <span>{repo.language}</span>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-2">
                      {repo.private ? (
                        <svg
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          className="text-red-500">
                          <path
                            d="M4.5 6.5v-3a3 3 0 016 0v3m-8 0h10a1 1 0 011 1v6a1 1 0 01-1 1h-10a1 1 0 01-1-1v-6a1 1 0 011-1z"
                            stroke="currentColor"></path>
                        </svg>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-2 space-x-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600">
                        View
                      </a>
                      <button
                        onClick={() => changeCurrentRepo(repo.html_url)}
                        className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Test
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="mt-4 text-white">
            Total Repositories: {displayedRepos.length} / {allRepos.length}
          </div>
        </div>
      ) : (
        !loading && <p className="text-white">No repositories found.</p>
      )}
    </div>
  )
}

export default RepositoryList