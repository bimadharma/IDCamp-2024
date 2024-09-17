const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });


// // Form contact
//   const form = document.querySelector('.contact-form form');

//   form.addEventListener('submit', function(event) {
//     event.preventDefault();

    
//     alert('Pesan berhasil dikirim!');

  
//     form.reset();
//   });
