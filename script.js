
let currentLanguage = localStorage.getItem('language') || 'pt';

const translations = {
    pt: {
        theme_light: 'Claro',
        theme_dark: 'Escuro'
    },
    en: {
        theme_light: 'Light',
        theme_dark: 'Dark'
    }
};

function toggleLanguage() {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            if (element.innerHTML.includes('&copy;')) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    document.getElementById('current-lang').textContent = currentLanguage.toUpperCase() === 'PT' ? 'EN' : 'PT';
    
    
    const themeText = document.querySelector('.theme-toggle span');
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const themeKey = isDark ? 'theme_light' : 'theme_dark';
    themeText.textContent = translations[currentLanguage][themeKey];
}


function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.querySelector('.theme-toggle span');
    
    if (newTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = translations[currentLanguage]['theme_light'];
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = translations[currentLanguage]['theme_dark'];
    }
}


function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.querySelector('.theme-toggle span');
    
    if (savedTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = translations[currentLanguage]['theme_light'];
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = translations[currentLanguage]['theme_dark'];
    }
}


function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}


function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function highlightMenu() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const menuLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            menuLink?.classList.add('active');
        } else {
            menuLink?.classList.remove('active');
        }
    });
}


function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition - 100) {
            element.classList.add('visible');
        }
    });
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleScrollTopButton() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
}


function validateForm() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    let isValid = true;

    
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

   
    const nome = formData.get('nome').trim();
    if (nome.length < 2) {
        document.querySelector('#nome').closest('.form-group').classList.add('error');
        isValid = false;
    }

    
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector('#email').closest('.form-group').classList.add('error');
        isValid = false;
    }

    const mensagem = formData.get('mensagem').trim();
    if (mensagem.length < 10) {
        document.querySelector('#mensagem').closest('.form-group').classList.add('error');
        isValid = false;
    }

    
    const telefone = formData.get('telefone').trim();
    if (telefone && telefone.length < 10) {
        document.querySelector('#telefone').closest('.form-group').classList.add('error');
        isValid = false;
    }

    return isValid;
}

function submitForm(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('span');
    const loading = submitBtn.querySelector('.loading');
    
  
    btnText.style.display = 'none';
    loading.style.display = 'inline-block';
    submitBtn.disabled = true;

    
    setTimeout(() => {
        const nome = document.getElementById('nome').value;
        const successMessage = currentLanguage === 'pt' 
            ? `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`
            : `Thank you, ${nome}! Your message was sent successfully. We will contact you soon.`;
        
        alert(successMessage);
        
        
        event.target.reset();
        
       
        btnText.style.display = 'inline';
        loading.style.display = 'none';
        submitBtn.disabled = false;
    }, 2000);
}


function openAdoptionModal(animalName) {
    const modal = document.getElementById('adoptionModal');
    const title = document.getElementById('adoptionTitle');
    const text = document.getElementById('adoptionText');
    
    if (currentLanguage === 'pt') {
        title.textContent = `Adotar ${animalName}`;
        text.textContent = `Que ótimo que você tem interesse em adotar o ${animalName}! Entre em contato conosco pelo WhatsApp para iniciar o processo de adoção.`;
    } else {
        title.textContent = `Adopt ${animalName}`;
        text.textContent = `Great that you're interested in adopting ${animalName}! Contact us on WhatsApp to start the adoption process.`;
    }
    
    modal.style.display = 'block';
}

function openVolunteerModal() {
    document.getElementById('volunteerModal').style.display = 'block';
}

function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    updateLanguage();
    smoothScroll();
    
    
    const statsSection = document.getElementById('stats');
    let counterAnimated = false;
    
    function checkCounterAnimation() {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        highlightMenu();
        animateOnScroll();
        toggleScrollTopButton();
        checkCounterAnimation();
    });
    
  
    highlightMenu();
    animateOnScroll();
    toggleScrollTopButton();
    checkCounterAnimation();
    
   
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
});


document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.3;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const actualCursor = document.querySelector('.cursor');
    actualCursor.style.left = e.clientX - 10 + 'px';
    actualCursor.style.top = e.clientY - 10 + 'px';
});