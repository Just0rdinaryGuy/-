document.addEventListener("DOMContentLoaded", () => {
  
  const anchors = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  function getShouldActiveNav(section_id) {
    const nav = Object.values(anchors).find((a, i) => {
      const target = a.querySelector('a').href.split('#')[1]; 
      return target == section_id;
    })
    return nav
  }

  function handleScroll() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // const isVisible = rect.top < window.innerHeight && rect.bottom  >= 0;
      const isVisible = parseInt(rect.bottom) <= parseInt(rect.height + 80) && rect.bottom >= 0
      const navItem = getShouldActiveNav(section.id);
      if (isVisible) {
          navItem.classList.add('visited');
      } else {
        navItem.classList.remove('visited')
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll();
});

