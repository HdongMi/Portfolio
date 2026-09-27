/* ==========================================================
   Portfolio — shared script
   목차(TOC)는 여기 SECTIONS 배열 한 곳에서만 관리합니다.
   섹션을 추가·삭제·순서 변경하려면 이 배열만 수정하세요.
   ========================================================== */
const SITE = {
  brand: 'dongmin.',                  // 왼쪽 상단 로고
  email: 'h990309@naver.com',     // 목차 아래 Email 링크
};

const SECTIONS = [
  { no:'01', label:'Intro',      ko:'인트로',        href:'intro.html',     desc:'이름, 직무, 한 문장 슬로건과 연락처' },
  { no:'02', label:'About Me',   ko:'요약 프로필',    href:'about.html',     desc:'핵심 역량과 숙련도별 기술 스택' },
  { no:'03', label:'Projects',   ko:'핵심 프로젝트',  href:'projects.html',  desc:'대표 프로젝트 3개와 문제 해결 경험' },
  { no:'04', label:'Career',     ko:'경력 · 활동',    href:'career.html',    desc:'실무 경력, 오픈소스와 커뮤니티 활동' },
  { no:'05', label:'Education',  ko:'교육 · 자격',    href:'education.html', desc:'학력, 교육 과정, 자격증과 어학' },
  { no:'06', label:'Outro',      ko:'마무리',         href:'outro.html',     desc:'감사 인사와 앞으로의 비전' },
];

(function () {
  const current = document.body.dataset.page;          // 각 페이지 <body data-page="intro.html">
  const toc = document.getElementById('toc');

  /* ── 목차 렌더링 ── */
  if (toc) {
    toc.className = 'toc';
    toc.setAttribute('aria-label', '목차');
    toc.innerHTML = `
      <a class="brand" href="index.html">${SITE.brand.replace(/\.$/, '')}<span class="grad">.</span></a>
      <ol>
        ${SECTIONS.map(s => `
          <li><a class="item${s.href === current ? ' active' : ''}" href="${s.href}" data-no="${s.no}"
                 ${s.href === current ? 'aria-current="page"' : ''}>
            <span class="idx">${s.no}</span>
            <span class="line"></span>
            <span class="label"><span class="txt" data-text="${s.label}">${s.label}</span></span>
            <span class="ko">${s.ko}</span>
          </a></li>`).join('')}
      </ol>
      <div class="foot">
        <a href="mailto:${SITE.email}">Email</a>
        <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
      </div>`;
  }

  /* ── 홈: 목차 hover 시 오른쪽 미리보기 문구 교체 ── */
  const preview = document.getElementById('preview');
  if (preview && toc) {
    const defaultHTML = preview.innerHTML;
    const show = html => {
      preview.classList.remove('swap');
      void preview.offsetWidth;                            // 애니메이션 재시작
      preview.innerHTML = html;
      preview.classList.add('swap');
    };
    toc.querySelectorAll('a.item').forEach(a => {
      const s = SECTIONS.find(x => x.href === a.getAttribute('href'));
      const enter = () => show(`<span class="pv-no">${s.no} — ${s.label}</span>${s.desc}`);
      a.addEventListener('mouseenter', enter);
      a.addEventListener('focus', enter);
    });
    toc.querySelector('ol').addEventListener('mouseleave', () => show(defaultHTML));
  }

  /* ── 섹션 페이지 하단: 이전 / 다음 ── */
  const pager = document.getElementById('pager');
  const i = SECTIONS.findIndex(s => s.href === current);
  if (pager && i > -1) {
    const prev = SECTIONS[i - 1], next = SECTIONS[i + 1];
    pager.className = 'pager';
    pager.innerHTML =
      (prev ? `<a class="prev" href="${prev.href}"><small>← ${prev.no}</small><b>${prev.label}</b></a>` : '') +
      (next ? `<a class="next" href="${next.href}"><small>${next.no} →</small><b>${next.label}</b></a>`
            : `<a class="next" href="index.html"><small>처음으로 ↺</small><b>Home</b></a>`);
  }

  /* ── 페이지 전환: 내부 링크 클릭 시 페이드아웃 후 이동 ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const href = a.getAttribute('href') || '';
    if (!/\.html(#.*)?$/.test(href) || href === current) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = href; }, 120);
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('leaving'));
})();
