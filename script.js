// Accordion Functionality (for pricing and FAQs)
document.addEventListener('DOMContentLoaded', function() {
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.accordion-icon');
      const isExpanded = content.classList.contains('expanded');

      // Close all other accordions on the page
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.classList.remove('expanded');
        const siblingIcon = c.previousElementSibling.querySelector('.accordion-icon');
        if (siblingIcon) siblingIcon.classList.remove('rotated');
      });

      // Toggle current
      if (!isExpanded) {
        content.classList.add('expanded');
        if (icon) icon.classList.add('rotated');
      }
    });
  });

  // Multi-Step Form Logic
  const steps = document.querySelectorAll('.step');
  const indicators = document.querySelectorAll('.step-indicator');
  const form = document.getElementById('merchantForm');
  if (form) {  // Only if on application page
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const submitBtn = document.querySelector('.btn-submit');
    let currentStep = 0;

    // Show step
    function showStep(stepIndex) {
      steps.forEach((step, i) => {
        step.classList.toggle('active', i === stepIndex);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === stepIndex);
      });
      currentStep = stepIndex;

      // Update buttons
      document.querySelectorAll('.btn-prev').forEach(btn => btn.style.display = stepIndex > 0 ? 'inline-flex' : 'none');
      document.querySelectorAll('.btn-next').forEach(btn => btn.style.display = stepIndex < steps.length - 1 ? 'inline-flex' : 'none');
      if (submitBtn) submitBtn.style.display = stepIndex === steps.length - 1 ? 'inline-flex' : 'none';

      // Generate summary on last step
      if (stepIndex === 3) {
        generateSummary();
      }
    }

    // Validate current step
    function validateStep(stepIndex) {
      const currentFields = steps[stepIndex].querySelectorAll('input[required], select[required]');
      let isValid = true;
      currentFields.forEach(field => {
        if (!field.checkValidity()) {
          field.reportValidity();
          isValid = false;
        }
      });
      return isValid;
    }

    // Next step
    nextBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
          showStep(currentStep + 1);
        }
      });
    });

    // Previous step
    prevBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        showStep(currentStep - 1);
      });
    });

    // Submit
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateStep(currentStep) && form.checkValidity()) {
          // TODO: Integrate with backend (e.g., EmailJS, Netlify)
          alert('Application submitted! We\'ll review and contact you within 24-48 hours.'); // Placeholder
          form.reset();
          showStep(0);
        } else {
          // Full form validation
          form.reportValidity();
        }
      });
    }

    // Generate summary for Step 4
    function generateSummary() {
      const summary = document.getElementById('formSummary');
      if (!summary) return;
      let summaryText = '<h4 class="font-semibold mb-2">Application Preview:</h4><ul class="space-y-1 text-sm">';
      // Business Info
      const businessName = form.querySelector('input[placeholder="Business Legal Name"]').value || 'N/A';
      summaryText += `<li><strong>Business:</strong> ${businessName}</li>`;
      // Contact
      const email = form.querySelector('input[type="email"]').value || 'N/A';
      summaryText += `<li><strong>Email:</strong> ${email}</li>`;
      // Banking
      const bankName = form.querySelector('input[placeholder="Bank Name"]').value || 'N/A';
      summaryText += `<li><strong>Bank:</strong> ${bankName}</li>`;
      // Files
      const files = form.querySelectorAll('input[type="file"]');
      let fileCount = 0;
      files.forEach(file => { if (file.files.length > 0) fileCount++; });
      summaryText += `<li><strong>Documents:</strong> ${fileCount} uploaded</li>`;
      summaryText += '</ul>';
      summary.innerHTML = summaryText;
    }

    // Initialize
    showStep(0);
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});