/**
 * PORTFÓLIO DIGITAL PREMIUM - LÓGICA, TRANSIÇÕES E BACKGROUND DINÂMICO
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Configurações Globais
  const WHATSAPP_NUMBER = "5511999999999";
  
  // Elementos de Background
  const ambientBg = document.getElementById('ambientBg');
  const orbBlue = document.getElementById('orbBlue');
  const orbPurple = document.getElementById('orbPurple');
  const orbOrange = document.getElementById('orbOrange');
  const orbCyan = document.getElementById('orbCyan');
  const body = document.body;

  // 2. Sistema de Reação ao Scroll para o Background (Luzes Difusas Dinâmicas)
  let lastScrollY = window.scrollY;
  let ticking = false;

  const sectionsWithTheme = document.querySelectorAll('section[data-section-theme]');

  const updateBackgroundOnScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Atualiza variáveis CSS no root para sincronização visual
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(3));
    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

    // Movimento dinâmico suave de profundidade das fontes de luz (Parallax suave)
    if (window.innerWidth > 768) {
      const moveFactor1 = scrollY * 0.12;
      const moveFactor2 = scrollY * -0.09;
      const moveFactor3 = scrollY * 0.15;
      const moveFactor4 = scrollY * -0.07;

      if (orbBlue) orbBlue.style.transform = `translate3d(0, ${moveFactor1}px, 0)`;
      if (orbPurple) orbPurple.style.transform = `translate3d(0, ${moveFactor2}px, 0)`;
      if (orbOrange) orbOrange.style.transform = `translate3d(0, ${moveFactor3}px, 0)`;
      if (orbCyan) orbCyan.style.transform = `translate3d(0, ${moveFactor4}px, 0)`;
    }

    // Identifica qual seção está ativa para mudar a atmosfera de cor (Azul, Roxo, Laranja)
    let currentTheme = 'hero';
    const windowMiddle = scrollY + (window.innerHeight * 0.35);

    sectionsWithTheme.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (windowMiddle >= top && windowMiddle < top + height) {
        currentTheme = sec.getAttribute('data-section-theme');
      }
    });

    if (body.getAttribute('data-active-theme') !== currentTheme) {
      body.setAttribute('data-active-theme', currentTheme);
    }

    ticking = false;
  };

  const onScroll = () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateBackgroundOnScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateBackgroundOnScroll(); // Execução inicial

  // 3. Navbar Scroll Effect & Active Links
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('ri-menu-4-line');
        icon.classList.toggle('ri-close-line');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('ri-menu-4-line');
          icon.classList.remove('ri-close-line');
        }
      });
    });
  }

  // 5. Scroll Reveal Aprimorado para Elementos
  const revealElements = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Aplica delay escalonado caso estejam no mesmo grupo
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, (index % 4) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Filtro Interativo de Projetos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate3d(0, 0, 0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translate3d(0, 15px, 0) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 7. Dados e Abertura do Modal de Demonstração
  const projectsData = {
    barber: {
      title: "Vintage Blade - Barber Club & Lounge",
      category: "Site Institucional & Agendamento",
      image: "assets/images/project-barber.svg",
      tagline: "Experiência de barbearia clássica com agendamento online rápido.",
      description: "Desenvolvimento de um site elegante e escuro com foco em valorização dos serviços, depoimentos de clientes e integração com agendamento direto pelo WhatsApp.",
      features: [
        "Cardápio visual de cortes e barboterapia",
        "Botão de agendamento em 1 clique",
        "Integração com Google Perfil da Empresa (4.9 estrelas)",
        "Carregamento ultra-rápido em celulares"
      ],
      result: "+180% de agendamentos online no primeiro mês."
    },
    restaurant: {
      title: "Sapore Divino - Ristorante & Cucina",
      category: "Catálogo Digital & Cardápio",
      image: "assets/images/project-restaurant.svg",
      tagline: "Cardápio digital moderno com fotos de alta qualidade e pedidos no WhatsApp.",
      description: "Solução ideal para eliminar cardápios em PDF pesados. Permite ao cliente navegar pelas opções, ver fotos e enviar o pedido estruturado diretamente no WhatsApp do restaurante.",
      features: [
        "Categorias organizadas (Massas, Pizzas, Bebidas)",
        "Carrinho inteligente com cálculo automático",
        "Opção de retirada ou entrega (Delivery)",
        "Zero taxas por pedido"
      ],
      result: "Redução de 45% nas dúvidas de clientes e aumento de 35% no ticket médio."
    },
    clinic: {
      title: "Clínica Lumina - Saúde & Dermatologia",
      category: "Landing Page & Google Perfil",
      image: "assets/images/project-clinic.svg",
      tagline: "Autoridade médica, agendamento de consultas e posicionamento no Google Maps.",
      description: "Landing page desenvolvida para transmitir extrema credibilidade e profissionalismo, com foco em conversão de novos pacientes e destaque no topo das buscas locais da região.",
      features: [
        "Seções de especialidades e tratamentos",
        "Formulário humanizado de pré-agendamento",
        "Otimização completa de SEO e Google Meu Negócio",
        "Conformidade com padrões éticos de saúde"
      ],
      result: "1º lugar nas buscas por dermatologia na cidade e agenda lotada."
    },
    luart: {
      title: "Luart Dream - Moda & Sleepwear Premium",
      category: "Catálogo Digital & E-commerce",
      image: "assets/images/project-luartdream.svg",
      tagline: "Catálogo de moda atraente com tabela de medidas e compra ágil.",
      description: "Plataforma pensada especialmente para a Luart Dream destacar suas coleções exclusivas de pijamas e moda íntima, com alta taxa de conversão pelo WhatsApp sem atrito de cadastro.",
      features: [
        "Vitrine digital com fotos em alta definição",
        "Filtros de tamanho, cores e modelos",
        "Envio de pedido pronto para atendimento",
        "Integração com catálogo do Instagram"
      ],
      result: "+240% de conversões diretas vindas de anúncios e redes sociais."
    }
  };

  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const demoButtons = document.querySelectorAll('.btn-demo-view');

  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalResult = document.getElementById('modalResult');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectsData[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalDesc.textContent = data.description;
      modalResult.textContent = data.result;

      modalFeatures.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: #10b981; margin-right: 8px;"></i> ${feat}`;
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '8px';
        li.style.fontSize = '0.9rem';
        modalFeatures.appendChild(li);
      });

      const msg = encodeURIComponent(`Olá! Gostei muito da demonstração do projeto "${data.title}" e gostaria de criar algo semelhante para o meu negócio.`);
      modalWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 8. Contadores de Estatísticas Animados
  const statNumbers = document.querySelectorAll('.stat-count');
  let animated = false;

  const animateNumbers = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const prefix = stat.getAttribute('data-prefix') || '';
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCount = () => {
        count += step;
        if (count < target) {
          stat.textContent = `${prefix}${count}${suffix}`;
          setTimeout(updateCount, 30);
        } else {
          stat.textContent = `${prefix}${target}${suffix}`;
        }
      };

      updateCount();
    });
  };

  const statsSection = document.querySelector('.hero-stats-row');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateNumbers();
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }
});
