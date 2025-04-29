// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    try {
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again later.');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
  
  // Form validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('invalid');
      } else {
        input.classList.add('invalid');
      }
    });
  });
});
