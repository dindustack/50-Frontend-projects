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

    createUserCard(data);
    removeLoadingSpinner();
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("No profile with this username");
    }
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

               <div id="repos">
                   <a href="" class="repo">Repos 1</a>
                   <a href="" class="repo">Repos 2</a>
                   <a href="" class="repo">Repos 3</a>
               </div>
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
    profileCard.innerHTML = cardHTML
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
