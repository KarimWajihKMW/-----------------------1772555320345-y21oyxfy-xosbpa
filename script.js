console.log('Akwadra Super Builder Initialized');

document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('click', () => {
            console.log('تم النقر على البطاقة!');
            alert('أهلاً بك في عالم البناء بدون كود!');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const targetValue = Number(counter.dataset.target || 0);
                    const duration = 2000;
                    const start = performance.now();

                    const updateCounter = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const value = Math.floor(progress * targetValue);
                        counter.textContent = value.toLocaleString('ar-SA');
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    obs.unobserve(counter);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(counter => observer.observe(counter));
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const button = signupForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = 'جارٍ جدولة جلستك...';
            button.classList.add('opacity-80');

            setTimeout(() => {
                alert('شكراً لتسجيلك! سيتواصل معك فريق أكوادرا خلال ساعات.');
                signupForm.reset();
                button.disabled = false;
                button.textContent = originalText;
                button.classList.remove('opacity-80');
            }, 1500);
        });
    }
});
