function initFaq(section) {
  const questions = section.querySelectorAll('.faq__question');

  questions.forEach((button) => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    if (!answer) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('is-open', !isOpen);
    });
  });
}

document.querySelectorAll('.faq').forEach(initFaq);