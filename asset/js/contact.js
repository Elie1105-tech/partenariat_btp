// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animation de soumission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    // Simulation d'envoi (remplacer par vraie requête AJAX)
    setTimeout(() => {
        // Afficher le message de succès
        successMessage.classList.add('show');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Restaurer le bouton
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Masquer le message après 5 secondes
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Scroll vers le message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
});

// Gestion des FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fermer tous les autres items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle l'item actuel
        item.classList.toggle('active');
    });
});

// Validation en temps réel
const emailInput = document.getElementById('email');
const telInput = document.getElementById('telephone');

emailInput.addEventListener('blur', function() {
    if (this.value && !this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '';
    }
});

telInput.addEventListener('blur', function() {
    if (this.value && !this.value.match(/^[\d\s\+\-\(\)]+$/)) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '';
    }
});

// Compteur de caractères pour le message
const messageTextarea = document.getElementById('message');
const maxLength = 1000;

messageTextarea.addEventListener('input', function() {
    const remaining = maxLength - this.value.length;
    
    if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('char-counter')) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: var(--gris-beton); margin-top: 0.3rem;';
        this.parentNode.appendChild(counter);
    }
    
    const counter = this.parentNode.querySelector('.char-counter');
    counter.textContent = `${this.value.length} / ${maxLength} caractères`;
    
    if (remaining < 50) {
        counter.style.color = '#e74c3c';
    } else {
        counter.style.color = 'var(--gris-beton)';
    }
});

messageTextarea.setAttribute('maxlength', maxLength);