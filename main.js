const navWrapper = document.querySelector(".wrapper");
const nav = document.querySelector(".sticky-nav");
const btnScrollTo = document.querySelector(".scroll");
const sectionAbout = document.querySelector("#about");
const allSections = document.querySelectorAll("section");
const lists = document.querySelectorAll(".nav-item");
const navBtn = document.querySelector(".navbar-toggler");
const links = document.querySelectorAll(".nav-link");
const collapsedNav = document.querySelector(".navbar-collapse");

//============================== Sticky nav ===========================

const navHeight = nav.getBoundingClientRect().top;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("stickyNav");
  else nav.classList.remove("stickyNav");

  //Adding rules for the mobile queries
  if (window.innerWidth <= 544) {
    //removing the desktop class
    nav.classList.remove("stickyNav");
  }
};

//Adding function to the mobile nav button to toggle the color of the background
navBtn.addEventListener("click", () => {
  nav.classList.toggle("toggleBg");
});

//Looping through the links to add a navbar closing functionality
links.forEach((l) => {
  l.addEventListener("click", () => {
    collapsedNav.classList.remove("show");
    nav.classList.remove("toggleBg");
  });
});

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(navWrapper);

//========================== Btn scroll to ===========================
btnScrollTo.addEventListener("click", function (e) {
  sectionAbout.scrollIntoView();
  console.log("It worked");
});

// ============================Reveal sections=============

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//=================================== Active nav buttons on click ================================//

function activeLink(li) {
  lists.forEach((item) => item.classList.remove("active"));
  li.classList.add("active");
}
lists.forEach((item) =>
  item.addEventListener("click", function () {
    activeLink(this);
  })
);

window.onscroll = () => {
  allSections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      const target = document.querySelector(`[href='#${id}']`).parentElement;
      activeLink(target);
    }
  });
};

// Adding zoom effect on pictures
const ids = [
  "imageBox1",
  "imageBox2",
  "imageBox3",
  "imageBox4",
  "imageBox5",
  "imageBox6",
  "imageBox7",
  "imageBox8",
];

//Maping over the ids array to get all of the IDs
const boxes = document.querySelectorAll(ids.map((id) => `#${id}`).join(", "));

// console.log(boxes);

// Get the modal image tag
const modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const modalImage = document.getElementById("modal-image");

function galleryFunction1(smallImg) {
  boxes.src = smallImg.src;
}

// When the user clicks the big picture, set the image and open the modal
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function (e) {
    let src = e.srcElement.src;
    modal.style.display = "block";
    modalImage.src = src;
  });
}

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
