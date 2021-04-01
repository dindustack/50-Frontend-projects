const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const profileCard = document.getElementById("main");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  profileCard.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    profileCard.hidden = false;
    loader.hidden = true;
  }
}

async function getUser(username) {
  showLoadingSpinner();
  try {
    const { data } = await axios(APIURL + username);
    console.log('data', data)

    createUserCard(data);
    getRepos(username);
    removeLoadingSpinner();
  } catch (error) {
    if (error.response.status === 404) {
      removeLoadingSpinner();

      createErrorCard("No profile with this username");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");

    addReposToCard(data);
  } catch (error) {
    createErrorCard("Problem fetching repos");
  }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
           <div>
               <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
           </div>
           <div class="user-info">
               <h2>${user.name}</h2>
               <p>${user.bio}</p>

               <ul>
                   <li>${user.followers} <strong>Followers</strong></li>
                   <li>${user.following} <strong>Following</strong></li>
                   <li>${user.public_repos} <strong>Repositories</strong></li>
               </ul>

               <div id="repos"></div>
           </div>
       </div>
       `;
  profileCard.innerHTML = cardHTML;
}

function createErrorCard(message) {
  const cardHTML = `
    <div class="card">
        <h2>${message}</h2>
    </div>
    `;
  profileCard.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
