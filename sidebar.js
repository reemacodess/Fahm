/**
 * Sidebar Component for Fahm (فَهم)
 * Exact match to Stitch DESIGN.md with active navigation states and RTL layout
 */

function renderSidebar(activeRoute) {
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard', route: '#dashboard' },
    { id: 'inbox', label: 'صندوق الشكاوى', icon: 'inbox', route: '#inbox' },
    { id: 'knowledge-base', label: 'قاعدة المعرفة', icon: 'menu_book', route: '#knowledge-base' },
    { id: 'analytics', label: 'التحليلات', icon: 'analytics', route: '#analytics' },
  ];

  return `
    <aside class="hidden md:flex flex-col h-screen w-64 bg-white border-l border-[#e2e8f0] shadow-sm fixed right-0 top-0 z-30 select-none">
      <!-- Logo Header -->
      <div class="p-6 flex items-center justify-start gap-3 border-b border-[#f1f5f9]">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003d9b] to-[#0052cc] flex items-center justify-center text-white shadow-md">
          <span class="font-bold text-xl tracking-tight">فَ</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-2xl text-[#003d9b] tracking-tight">فَهم</span>
          <span class="text-[11px] text-[#737685] -mt-1 font-medium">مساعد الشكاوى الذكي</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col flex-grow px-3 py-4 space-y-1.5 overflow-y-auto">
        ${navItems.map(item => {
          const isActive = activeRoute === item.id || (item.id === 'inbox' && activeRoute.startsWith('details'));
          return `
            <a href="${item.route}" 
               class="flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                 isActive 
                   ? 'bg-[#e5eeff] text-[#0052cc] font-bold shadow-xs' 
                   : 'text-[#434654] hover:bg-[#eff4ff] hover:text-[#0052cc]'
               }">
              <span class="material-symbols-outlined ml-3 text-[22px] ${isActive ? 'font-variation-settings: fill 1' : ''}" 
                    style="${isActive ? "font-variation-settings: 'FILL' 1;" : ''}">${item.icon}</span>
              <span class="text-sm">${item.label}</span>
              ${item.id === 'inbox' ? '<span id="sidebar-new-count" class="mr-auto px-2 py-0.5 text-xs font-bold rounded-full bg-[#ffdad6] text-[#ba1a1a]">جديد</span>' : ''}
            </a>
          `;
        }).join('')}
      </nav>

      <!-- AI Assistant Status Pill -->
      <div class="p-4 mx-3 mb-3 bg-gradient-to-r from-[#f5f3ff] to-[#eff6ff] border border-[#d3e4fe] rounded-2xl">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="material-symbols-outlined text-[#6a36d3] text-sm sparkle-icon">auto_awesome</span>
          <span class="text-xs font-bold text-[#510ebb]">محرك فَهم الذكي</span>
          <span class="w-2 h-2 rounded-full bg-[#137333] inline-block mr-auto animate-pulse"></span>
        </div>
        <p class="text-[11px] text-[#434654] leading-relaxed">
          جاهز لتحليل الشكاوى ومطابقة الحالات السابقة.
        </p>
      </div>

      <!-- User Profile Footer -->
      <div class="p-4 border-t border-[#f1f5f9] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#0052cc] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            أع
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-bold text-[#0b1c30]">أحمد عبدالله</span>
            <span class="text-[11px] text-[#737685]">وكيل دعم أول</span>
          </div>
        </div>
        <button onclick="FahmApp.resetDemoData()" title="إعادة ضبط البيانات التوضيحية" 
                class="text-[#737685] hover:text-[#0052cc] p-1.5 rounded-lg hover:bg-[#eff4ff] transition-colors">
          <span class="material-symbols-outlined text-[18px]">refresh</span>
        </button>
      </div>
    </aside>
  `;
}
