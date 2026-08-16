/**
 * Header Component for Fahm (فَهم)
 */

function renderHeader(title, subtitle, backButtonHref = null) {
  const todayDate = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full' }).format(new Date());

  return `
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-2">
      <div class="flex items-center gap-3">
        ${backButtonHref ? `
          <a href="${backButtonHref}" class="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-[#e2e8f0] text-[#434654] hover:text-[#0052cc] hover:bg-[#eff4ff] transition-colors shadow-xs">
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
        ` : ''}
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-[#0b1c30] tracking-tight">${title}</h1>
          ${subtitle ? `<p class="text-sm text-[#737685] mt-0.5">${subtitle}</p>` : ''}
        </div>
      </div>

      <div class="flex items-center gap-3 self-end md:self-auto">
        <div class="hidden sm:flex items-center bg-white px-3.5 py-1.5 rounded-full border border-[#e2e8f0] text-xs font-medium text-[#434654] shadow-xs">
          <span class="material-symbols-outlined text-[#737685] ml-2 text-[16px]">calendar_today</span>
          <span>${todayDate}</span>
        </div>

        <div class="flex items-center gap-2 bg-[#eff4ff] border border-[#d3e4fe] text-[#0052cc] px-3 py-1.5 rounded-full text-xs font-bold">
          <span class="material-symbols-outlined text-[16px] sparkle-icon">verified_user</span>
          <span>نظام المساعد الذكي</span>
        </div>
      </div>
    </header>
  `;
}
