// projects.js - Vertical list with Load More / Show Less

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');
    const sliderWrapper = document.querySelector('.projects-slider-wrapper');

    let currentFilter = 'all';
    let filteredProjects = [];
    let visibleCount = 3; // Show 3 projects initially
    const initialCount = 3;
    const loadMoreCount = 3; // Load 3 more each time
    let isExpanded = false;

    // Card background colors - varied gradients for each project
    const cardColors = {
        peach: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        teal: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        amber: 'linear-gradient(135deg, #ffeaa7 0%, #dfe6e9 100%)',
        purple: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        blue: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        green: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)'
    };

    function createTechTag(tech) {
        const bgColor = tech.color ? `${tech.color}18` : 'rgba(0,0,0,0.05)';
        // For DagsHub (#000 or very dark) use a neutral theme-aware color instead
        const isDark = tech.color && (tech.color === '#000000' || tech.color === '#000');
        const textColor = isDark ? 'var(--text-primary, #1a1a1a)' : (tech.color || '#666');
        const border = isDark ? 'rgba(120,120,120,0.35)' : `${tech.color}30`;
        const bg = isDark ? 'rgba(120,120,120,0.12)' : bgColor;
        const iconHTML = tech.icon ? `<i class="${tech.icon}"></i> ` : '';
        return `<span class="tech-tag" style="background:${bg}; color:${textColor}; border-color:${border}">${iconHTML}${tech.name}</span>`;
    }

    function createMetric(metric) {
        const colorClass = metric.positive ? 'metric-green' : 'metric-red';
        return `
            <div class="metric-item ${colorClass}">
                <span class="metric-value">${metric.value}</span>
                <span class="metric-label">${metric.label}</span>
            </div>
        `;
    }

    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);

        const techTags = (project.techStack || []).map(createTechTag).join('');
        const bullets = (project.bullets || []).map(b => `<li>${b}</li>`).join('');

        // Metrics
        let metricsHTML = '';
        if (project.metrics && project.metrics.length > 0) {
            metricsHTML = `<div class="metrics-row">${project.metrics.map(createMetric).join('')}</div>`;
        }

        // Role display
        let roleHTML = project.role;
        if (project.roleCheck) {
            roleHTML += ` <span class="role-check"><i class="fas fa-check-circle"></i></span>`;
        }
        if (project.roleSuffix) {
            roleHTML += ` <span class="role-suffix">${project.roleSuffix}</span>`;
        }

        // Date/Timeline section
        let timelineHTML = '';
        if (project.hasProblem) {
            timelineHTML = `
                <div class="problem-row-wrapper">
                    <div class="problem-header">
                        <span class="problem-label">${project.problemLabel}</span>
                        <span class="timeline-date" style="margin-left:auto; font-size:0.8em">${project.problemDate}</span>
                    </div>
                    <p class="problem-text">${project.problemText}</p>
                </div>
            `;
        } else if (project.dateRange) {
            timelineHTML = `
                <div class="timeline-row">
                    <span class="timeline-icon"><i class="fas fa-calendar-alt"></i></span>
                    <span class="timeline-date">${project.dateRange}</span>
                </div>
            `;
        }

        // Icons based on project
        const icons = ['fas fa-mobile-alt', 'fas fa-project-diagram', 'fas fa-database', 'fas fa-cogs', 'fas fa-comments', 'fas fa-chart-line'];
        const iconClass = icons[index % icons.length];

        // Card background color
        const bgGradient = cardColors[project.cardColor] || cardColors.peach;

        // Flagship badge
        const flagshipBadge = project.flagship ? '<span class="flagship-badge"><i class="fas fa-star"></i> Flagship</span>' : '';

        // Footer content
        let footerHTML = '';
        if (project.hasExtraContent) {
            footerHTML = `
                <div class="card-footer card-footer-expand">
                    <div class="expand-icon-footer" title="View Full Details">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
            `;
        } else {
            const demoBtn = (project.viewCodeLink && project.viewCodeLink !== '#')
                ? `<a href="${project.viewCodeLink}" class="viewcode-link" target="_blank">Demo <i class="fas fa-chevron-right"></i></a>`
                : '';
            footerHTML = `
                <div class="card-footer">
                    <a href="${project.githubLink || '#'}" class="github-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${project.dagshubLink ? `
                    <a href="${project.dagshubLink}" class="dagshub-link" target="_blank">
                        <i class="fas fa-chart-line"></i> DagsHub
                    </a>` : ''}
                    ${demoBtn}
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-image-area" style="background: ${bgGradient}">
                ${flagshipBadge}
                <div class="card-icon-placeholder">
                    <i class="${iconClass}"></i>
                </div>
            </div>

            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                
                <div class="card-meta">
                    <div class="meta-line">
                        <span class="meta-label">Type:</span>
                        <span class="meta-value">${project.type}</span>
                    </div>
                    <div class="meta-line">
                        <span class="meta-label">Role:</span>
                        <span class="meta-value">${roleHTML}</span>
                    </div>
                </div>

                <div class="tech-tags">${techTags}</div>

                ${timelineHTML}

                <ul class="bullet-list">${bullets}</ul>

                ${project.architectureSummary ? `<button class="architecture-btn" data-arch="${encodeURIComponent(project.architectureSummary)}" data-title="${encodeURIComponent(project.title)}">
                    <i class="fas fa-sitemap"></i> System Architecture <i class="fas fa-chevron-right arrow"></i>
                </button>` : ''}

                ${metricsHTML}

                ${footerHTML}
            </div>
        `;

        // Store data for expansion
        card.projectData = project;

        // Add expand functionality for cards with extra content
        if (project.hasExtraContent) {
            const expandBtn = card.querySelector('.expand-icon-footer');
            if (expandBtn) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openCardModal(card, project, index);
                });
            }
        }

        // Architecture button → architecture modal
        const archBtn = card.querySelector('.architecture-btn[data-arch]');
        if (archBtn) {
            archBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openArchModal(
                    decodeURIComponent(archBtn.dataset.title),
                    decodeURIComponent(archBtn.dataset.arch)
                );
            });
        }

        return card;
    }

    // ── Architecture Info Modal ─────────────────────────────────────────────
    function openArchModal(title, archText) {
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';

        const modal = document.createElement('div');
        modal.className = 'arch-modal';

        // Convert "→" separated steps into visual flow chips
        const steps = archText.split(/→|->/).map(s => s.trim()).filter(Boolean);
        const stepsHTML = steps.map((step, i) => `
            <div class="arch-step">
                <span class="arch-step-num">${i + 1}</span>
                <span class="arch-step-text">${step}</span>
            </div>
            ${i < steps.length - 1 ? '<div class="arch-step-arrow"><i class="fas fa-arrow-down"></i></div>' : ''}
        `).join('');

        modal.innerHTML = `
            <button class="modal-close-btn" title="Close"><i class="fas fa-times"></i></button>
            <div class="arch-modal-header">
                <i class="fas fa-sitemap arch-modal-icon"></i>
                <div>
                    <h3 class="arch-modal-title">System Architecture</h3>
                    <p class="arch-modal-subtitle">${title}</p>
                </div>
            </div>
            <div class="arch-steps-container">
                ${stepsHTML}
            </div>
        `;

        const close = () => { overlay.remove(); modal.remove(); document.body.style.overflow = ''; };
        overlay.addEventListener('click', close);
        modal.querySelector('.modal-close-btn').addEventListener('click', close);
        modal.addEventListener('click', e => e.stopPropagation());

        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => { overlay.classList.add('active'); modal.classList.add('active'); });
    }

    // Open card as modal popup
    function openCardModal(originalCard, project, index) {
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';

        const modalCard = document.createElement('div');
        modalCard.className = 'project-card-modal';

        const techTags = (project.techStack || []).map(createTechTag).join('');
        const bullets = (project.bullets || []).map(b => `<li>${b}</li>`).join('');

        let roleHTML = project.role;
        if (project.roleCheck) {
            roleHTML += ` <span class="role-check"><i class="fas fa-check-circle"></i></span>`;
        }
        if (project.roleSuffix) {
            roleHTML += ` <span class="role-suffix">${project.roleSuffix}</span>`;
        }

        let timelineHTML = '';
        if (project.hasProblem) {
            timelineHTML = `
                <div class="problem-row-wrapper">
                    <div class="problem-header">
                        <span class="problem-label">${project.problemLabel}</span>
                        <span class="timeline-date" style="margin-left:auto; font-size:0.8em">${project.problemDate}</span>
                    </div>
                    <p class="problem-text-full">${project.problemText}</p>
                </div>
            `;
        } else if (project.dateRange) {
            timelineHTML = `
                <div class="timeline-row">
                    <span class="timeline-icon"><i class="fas fa-calendar-alt"></i></span>
                    <span class="timeline-date">${project.dateRange}</span>
                </div>
            `;
        }

        const icons = ['fas fa-mobile-alt', 'fas fa-project-diagram', 'fas fa-database', 'fas fa-cogs', 'fas fa-comments', 'fas fa-chart-line'];
        const iconClass = icons[index % icons.length];
        const bgGradient = cardColors[project.cardColor] || cardColors.peach;

        modalCard.innerHTML = `
            <button class="modal-close-btn" title="Close">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="card-image-area" style="background: ${bgGradient}">
                <div class="card-icon-placeholder">
                    <i class="${iconClass}"></i>
                </div>
            </div>

            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                
                <div class="card-meta">
                    <div class="meta-line">
                        <span class="meta-label">Type:</span>
                        <span class="meta-value">${project.type}</span>
                    </div>
                    <div class="meta-line">
                        <span class="meta-label">Role:</span>
                        <span class="meta-value">${roleHTML}</span>
                    </div>
                </div>

                <div class="tech-tags">${techTags}</div>

                ${timelineHTML}

                <ul class="bullet-list-full">${bullets}</ul>

                <button class="architecture-btn">
                    <i class="fas fa-sitemap"></i> System Architecture <i class="fas fa-chevron-right arrow"></i>
                </button>

                <div class="card-footer">
                    <a href="${project.githubLink || '#'}" class="github-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${project.dagshubLink ? `
                    <a href="${project.dagshubLink}" class="dagshub-link" target="_blank">
                        <i class="fas fa-chart-line"></i> DagsHub
                    </a>` : ''}
                    <a href="${project.viewCodeLink || '#'}" class="viewcode-link" target="_blank">
                        Demo <i class="fas fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        `;

        const closeModal = () => {
            overlay.remove();
            modalCard.remove();
            document.body.style.overflow = '';
        };

        overlay.addEventListener('click', closeModal);
        modalCard.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modalCard.addEventListener('click', (e) => e.stopPropagation());

        document.body.appendChild(overlay);
        document.body.appendChild(modalCard);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            modalCard.classList.add('active');
        });
    }

    // Create or update Load More / Show Less buttons
    function updateButtons() {
        let buttonWrapper = sliderWrapper.querySelector('.load-more-wrapper');

        if (!buttonWrapper) {
            buttonWrapper = document.createElement('div');
            buttonWrapper.className = 'load-more-wrapper';
            buttonWrapper.innerHTML = `
                <button class="load-more-btn">
                    Load More Projects <i class="fas fa-chevron-down"></i>
                </button>
                <button class="show-less-btn hidden">
                    Show Less <i class="fas fa-chevron-up"></i>
                </button>
            `;
            sliderWrapper.appendChild(buttonWrapper);

            buttonWrapper.querySelector('.load-more-btn').addEventListener('click', loadMore);
            buttonWrapper.querySelector('.show-less-btn').addEventListener('click', showLess);
        }

        const loadMoreBtn = buttonWrapper.querySelector('.load-more-btn');
        const showLessBtn = buttonWrapper.querySelector('.show-less-btn');
        const remaining = filteredProjects.length - visibleCount;

        // Load More button
        if (remaining > 0) {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.innerHTML = `Load More Projects (${remaining} remaining) <i class="fas fa-chevron-down"></i>`;
        } else {
            loadMoreBtn.classList.add('hidden');
        }

        // Show Less button - only show if more than initial count is visible
        if (visibleCount > initialCount) {
            showLessBtn.classList.remove('hidden');
        } else {
            showLessBtn.classList.add('hidden');
        }

        // Update count indicator
        updateProjectsCount();
    }

    // Update projects count indicator
    function updateProjectsCount() {
        let countEl = sliderWrapper.querySelector('.projects-count');

        if (!countEl) {
            countEl = document.createElement('div');
            countEl.className = 'projects-count';
            sliderWrapper.appendChild(countEl);
        }

        const showing = Math.min(visibleCount, filteredProjects.length);
        countEl.textContent = `Showing ${showing} of ${filteredProjects.length} projects`;
    }

    // Load more projects
    function loadMore() {
        visibleCount += loadMoreCount;
        renderProjects(false);
    }

    // Show less - collapse back to initial 3
    function showLess() {
        visibleCount = initialCount;
        renderProjects(false);
        // Scroll to projects section
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderProjects(resetCount = true) {
        projectsContainer.innerHTML = '';

        if (resetCount) {
            visibleCount = initialCount;
        }

        if (filteredProjects.length === 0) {
            projectsContainer.innerHTML = `<div class="no-projects">No projects found.</div>`;
            updateButtons();
            return;
        }

        // Only render visible projects
        const projectsToShow = filteredProjects.slice(0, visibleCount);

        projectsToShow.forEach((project, index) => {
            const card = createProjectCard(project, index);
            projectsContainer.appendChild(card);
        });

        updateButtons();
    }

    function applyFilter(filter) {
        currentFilter = filter || 'all';
        filteredProjects = projectsData.filter(p => {
            if (currentFilter === 'all') return true;
            // Support space-separated multi-categories (e.g. 'ml genai')
            const cats = (p.category || '').split(' ');
            return cats.includes(currentFilter);
        });
        renderProjects(true);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            filteredProjects = projectsData.filter(p => {
                if (currentFilter !== 'all') {
                    const cats = (p.category || '').split(' ');
                    if (!cats.includes(currentFilter)) return false;
                }
                return p.title.toLowerCase().includes(query);
            });
            renderProjects(true);
        });
    }

    applyFilter('all');
});
