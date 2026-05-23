const scrollBtn = document.getElementById('scroll-btn');
const nextSection = document.querySelector('#info');
scrollBtn.addEventListener('click', function() {
  nextSection.scrollIntoView({
    behavior:"smooth", block:"start"
  })
});

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     console.log('секция на месте?', entry.isIntersecting)
//     if (entry.isIntersecting) {
//       entry.target.querySelectorAll('.box').forEach(box => {
//         box.classList.add('show');
//       });
//     } else {
//       entry.target.querySelectorAll('.box').forEach(box => {
//         box.classList.add('.hide');
//       });
//     }
//   });  
// }, { threshold: 0.3});

// observer.observe(document.querySelector('.car-container'));


// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach(
//       entry => {
//         const boxes = entry.target.querySelectorAll('.box')

//         boxes.forEach(
//           box => {
//             if (entry.isIntersecting) {
//               box.classList.remove('hide')
//               box.classList.add('show')
//             }
//             else {
//               box.classList.remove('show')
//               box.classList.add('hide')
//             }
//           });
//       });
//   }, {
//     threshold: 0.3, rootMargin: "0px 0px -100px 0px"
//   });

//   observer.observe(document.querySelector('.car-section'))

let lastScrollY = window.scrollY;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const boxes = entry.target.querySelectorAll('.box');
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    boxes.forEach(box => {
      if (entry.isIntersecting) {
        box.classList.remove('hide');
        box.classList.add('show');
      } 
      else if (!entry.isIntersecting && !scrollingDown) {
        box.classList.remove('show');
        box.classList.add('hide');
      }
    });

    lastScrollY = currentScrollY;
  });
}, {
  threshold: 0.3,
  rootMargin: "-50px 0px -100px 0px"
});

observer.observe(document.querySelector('.car-section'));


// форма записи
const form = document.getElementById('community-form')

form.addEventListener('submit', function(event) {
  event.preventDefault()

  const nameValue = document.getElementById('name').value
  const emailValue = document.getElementById('email').value
  const messageValue = document.getElementById('message').value
  console.log('Имя: ', nameValue)
  console.log('email: ', emailValue)
  console.log('Сообщение: ', messageValue)

  form.reset()
  alert('Данные отправлены')
})



// бургеры наггетсы
const burgerBtn   = document.getElementById('burgerBtn');
const navMobile   = document.getElementById('navMobile');
const menuOverlay = document.getElementById('menuOverlay');
const mobileLinks = document.querySelectorAll('.nav-mobile a');

function toggleMenu() {
    burgerBtn.classList.toggle('active');
    navMobile.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
    burgerBtn.classList.remove('active');
    navMobile.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();  // плавненько
        const target = document.querySelector(link.getAttribute('href'));
        closeMenu();
        setTimeout(() => {
            target?.scrollIntoView({ behavior: 'smooth' }); // если цель не найдется то ничего не произойдет потому что "target?"
        }, 300);
    });
});