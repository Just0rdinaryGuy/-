                                                                                                                                                                                    document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Scroll Spy (Active Nav Link)
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Project Modals
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const closeModal = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.btn-view');

    // Project Data
    const projects = {
        1: {
            title: "Website Travel",
            img: "./assets/img/kelas_full_stack_web_javascript_developer_buildwith_angga.png",
            desc: "A comprehensive travel booking platform featuring destination browsing, booking management, and user authentication. Built with modern JavaScript practices and a responsive design.",
            tags: ["HTML", "CSS", "JavaScript", "Express"]
        },
        2: {
            title: "Consultation App",
            img: "./assets/img/kelas_full_stack_react_native_developer_buildwith_angga.png",
            desc: "A mobile application connecting users with expert consultants. Features real-time chat, appointment scheduling, and secure payment gateway integration.",
            tags: ["React Native", "Firebase", "Redux"]
        }
    };

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const id = card.getAttribute('data-id');
            const data = projects[id];

            if (data) {
                modalImg.src = data.img;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                
                // Clear and add tags
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });

                modal.classList.add('active');
            }
        });
    });

    // Close Modal Logic
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});
