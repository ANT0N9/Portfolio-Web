document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de Elementos del DOM --- //
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalContent = document.getElementById('modal-content');
    const colorSwitcher = document.getElementById('color-switcher');
    const body = document.body;
    const typingElement = document.getElementById('typing-animation');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // --- Animación de Tecleo (Typing Animation) --- //
    const textToType = "Desarrollador Web Full Stack";
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textToType.substring(0, charIndex);
        typingElement.textContent = currentText;

        if (!isDeleting) {
            charIndex++;
            if (charIndex > textToType.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 50);
            }
        } else {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                charIndex = 0;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 100);
            }
        }
    }

    type();

    // --- Funcionalidad del Cambio de Tema (Paleta de Colores) --- //
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'light-mode') {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    colorSwitcher.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', '');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });

    // --- Funcionalidad del Menú Hamburguesa (Móvil) --- //
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    // --- Desplazamiento Suave (Smooth Scrolling) --- //
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                // Cierra el menú lateral si está abierto (en móvil)
                if (!sidebar.classList.contains('hidden')) {
                    sidebar.classList.add('hidden');
                }
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Funcionalidad del Modal de Proyectos --- //
    const projects = {
        1: {
            title: 'Serviamigo Multiservices',
            description: 'Este fue uno de mis primeros proyectos autonomos, se trata de una web estilo blog sobre contabilidad, la clienta queria un diseño moderno y funcional para mostrar sus servicios y especialidades.',
            technologies: ['Wordpress', 'ElementorPro', 'PHP'],
            imageUrl: '/img/serviamigo.jpg',
            liveUrl: 'https://serviamigomultiservices.com/',
            repoUrl: '#'
        },
        2: {
            title: 'Thai Home Women Massages',
            description: 'Una pagina web que ofrece a clientas servicios de masajes tailandeses, me enfoque en un estilo suave y refrescante para hacer florecer los distintos estilos de masajes que ofrecen en este emprendimiento.',
            technologies: ['Wordpress', 'ElementorPro', 'PHP'],
            imageUrl: '/img/masajes.jpg',
            liveUrl: 'https://thaihomewomenmassages.com/',
            repoUrl: '#'
        },
        3: {
            title: 'Pokedex',
            description: 'Esta es una aplicación de Pokédex simple e interactiva basada en la web que muestra información sobre los primeros 151 Pokémon, utilizando datos obtenidos de la PokeAPI.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'PokeAPI'],
            imageUrl: '/img/pokedex.png',
            liveUrl: 'https://pokedev-1.netlify.app/',
            repoUrl: 'https://github.com/ANT0N9/PokeDevs.git'
        },
        4: {
            title: 'API REST con Python',
            description: 'El proyecto implementa una API para gestionar usuarios, con operaciones básicas de Crear, Leer, Actualizar y Eliminar (CRUD).',
            technologies: ['Python', 'FastAPI', 'SQLite'],
            imageUrl: '/img/ApiREST.png',
            liveUrl: '#',
            repoUrl: 'https://github.com/ANT0N9/API-REST-con-Python.git'
        },
        5: {
            title: 'Asistente de IA',
            description: 'Este proyecto es un agente de IA diseñado para asistir en tareas de investigación. Utiliza el modelo de lenguaje Claude 3.5 Sonnet de Anthropic, junto con herramientas de búsqueda y guardado, para recopilar, resumir y almacenar información sobre un tema determinado.',
            technologies: ['Python'],
            imageUrl: '/img/IA.jpg',
            liveUrl: '#',
            repoUrl: 'https://github.com/ANT0N9/Asistente-IA.git'
        },
    };

    const techColorMap = {
        'HTML': 'bg-orange-500',
        'CSS': 'bg-blue-500',
        'JavaScript': 'bg-yellow-400 text-black',
        'PokeAPI': 'bg-red-500',
        'Python': 'bg-blue-700',
        'FastAPI': 'bg-green-600',
        'SQLite': 'bg-sky-500',
        'Wordpress': 'bg-blue-400',
        'ElementorPro': 'bg-pink-500',
        'PHP': 'bg-indigo-500',
        'default': 'bg-zinc-700 text-zinc-100'
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.projectId;
            const project = projects[projectId] || {
                title: `Proyecto ${projectId}`,
                description: `No hay información detallada para este proyecto todavía.`,
                technologies: [],
                imageUrl: 'https://via.placeholder.com/800x600',
                liveUrl: '#',
                repoUrl: '#'
            };

            const techBadges = project.technologies.map(tech => {
                const colorClass = techColorMap[tech] || techColorMap['default'];
                return `<span class="px-2 py-1 rounded ${colorClass}">${tech}</span>`;
            }).join('');

            const liveUrlButton = (project.liveUrl && project.liveUrl !== '#')
                ? `<a href="${project.liveUrl}" target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Ir al sitio</a>`
                : '';

            const repoUrlButton = (project.repoUrl && project.repoUrl !== '#')
                ? `<a href="${project.repoUrl}" target="_blank" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Ver Repositorio</a>`
                : '';

            modalContent.innerHTML = `
                <h2 class="text-3xl font-bold mb-4">${project.title}</h2>
                <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-64 object-cover mb-4">
                <p class="text-white mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${techBadges}
                </div>
                <div class="flex space-x-4 mt-4">
                    ${liveUrlButton}
                    ${repoUrlButton}
                </div>
            `;

            modal.classList.remove('hidden');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});