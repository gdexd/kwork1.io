// Прелоадер
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Анимация счетчиков
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Запуск анимации счетчиков при скролле
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target); // Останавливаем наблюдение после запуска
        }
    });
}, { threshold: 0.5 });

// Наблюдаем за секцией со статистикой
const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Изменение навигации при скролле
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = '';
        navbar.style.boxShadow = '';
    }
});

// Анимация появления элементов при скролле (ГЛАВНОЕ ДОБАВЛЕНИЕ)
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            scrollObserver.unobserve(entry.target); // Останавливаем наблюдение после анимации
        }
    });
}, {
    threshold: 0.1, // Элемент должен быть виден на 10%
    rootMargin: '0px 0px -50px 0px' // Добавляем небольшой отступ снизу
});

// Наблюдаем за элементами для анимации при скролле
document.querySelectorAll('.fade-in').forEach(element => {
    // Добавляем начальные стили для анимации
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Добавляем класс для анимации
    element.classList.add('scroll-animate');
    scrollObserver.observe(element);
});

// Также можно добавить наблюдение для конкретных секций
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    section.classList.add('scroll-animate');
    scrollObserver.observe(section);
});

// Анимация для карточек продуктов с задержкой
const productCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                // Устанавливаем задержку для каждой карточки
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                }, 100);
            });
            productCardsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Наблюдаем за контейнером с карточками продуктов
const productsContainer = document.querySelector('.products-container');
if (productsContainer) {
    // Устанавливаем начальные стили для всех карточек
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    productCardsObserver.observe(productsContainer);
}

// Анимация при наведении на карточки
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const specs = card.querySelector('.product-specs');
        if (specs) {
            specs.querySelectorAll('.spec').forEach((spec, index) => {
                spec.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
});

// Плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем анимацию для элементов навигации
    const logo = document.querySelector('.logo');
    const navItems = document.querySelectorAll('.nav-link, .nav-btn');
    
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            logo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 300);
    }
    
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    // Анимация для hero секции
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 50);
        }, 100);
    }
    
    // Обновляем год в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// Дополнительная анимация для изображений при скролле
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('image-animated');
            imageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Наблюдаем за изображениями
document.querySelectorAll('.fade-in-image').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    imageObserver.observe(img);
});

// Функция для добавления класса анимации
function animateOnScroll(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}