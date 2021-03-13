const title = document.getElementById("title");
const excerpt = document.getElementById("excerpt");
const profileImage = document.getElementById("profile_image");
const user = document.getElementById("name");
const date = document.getElementById("date");
const animatedBackground = document.querySelectorAll(".animated-bg");
const animatedBackgroundText = document.querySelectorAll(".animated-bg-text");

setTimeout(getData, 2500)

function getData() {
  header.innerHTML = '<img src="https://images.unsplash.com/photo-1513595207829-9f414c0665f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="">';
  title.innerHTML = "Lorem ipsum dolor sit amet";
  excerpt.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  profileImage.innerHTML = '<img src="https://randomuser.me/api/portraits/women/45.jpg" alt="">';
  user.innerHTML = 'Bill Steven';
  date.innerHTML = 'Aug 27, 2008';

  animatedBackground.forEach((bg) => { bg.classList.remove("animated-bg")});
  animatedBackgroundText.forEach((bg) => bg.classList.remove("animated-bg-text"));
};


