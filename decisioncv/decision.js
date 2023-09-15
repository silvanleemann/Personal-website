window.addEventListener('load', function() {
    const content = document.querySelectorAll('.hidden');
    setTimeout(function() {
      for (let i = 0; i < content.length; i++) {
        content[i].classList.add('show');
      }
    }, 100); // delay of 1 second
  });