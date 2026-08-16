/**
 * Screen 2: Complaint Inbox Page (صندوق الشكاوى)
 * Matches Stitch _2/code.html with interactive filters and search
 */

const InboxPage = {
  currentFilter: 'all',
  searchQuery: '',

  async render() {
    const complaints = await FahmDataService.getComplaints(this.searchQuery, this.currentFilter);

    const filters = [
      { id: 'all', label: 'الكل' },
      { id: 'new', label: 'جديدة' },
      { id: 'in_progress', label: 'قيد المعالجة' },
      { id: 'resolved', label: 'تم حلها' },
      { id: 'needs_review', label: 'تحتاج مراجعة' }
    ];

    return `
      <div class="space-y-6 animate-fade-in-up">
        <!-- Header & Search Bar -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-[#0b1c30] tracking-tight">صندوق الشكاوى</h1>
            <p class="text-sm text-[#737685] mt-0.5">إدارة ومتابعة تذاكر الدعم بذكاء وبدون تكرار الجهد</p>
          </div>
          <div class="relative w-full md:w-80 group">
            <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737685] group-focus-within:text-[#0052cc] transition-colors text-[20px]">search</span>
            <input 
              id="inbox-search-input"
              type="text" 
              value="${this.searchQuery}"
              oninput="InboxPage.handleSearch(this.value)"
              placeholder="ابحث في الشكاوى أو العملاء..."
              class="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#cbd5e1] bg-white focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 outline-none text-sm text-[#0b1c30] placeholder:text-[#737685] transition-all shadow-xs"
            />
          </div>
        </div>

        <!-- Filter Chips Row -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          ${filters.map(f => {
            const isActive = this.currentFilter === f.id;
            return `
              <button 
                onclick="InboxPage.setFilter('${f.id}')"
                class="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-[#0052cc] text-white shadow-sm' 
                    : 'bg-white border border-[#e2e8f0] text-[#434654] hover:bg-[#eff4ff] hover:text-[#0052cc]'
                }">
                ${f.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Complaints Bento Grid -->
        ${complaints.length === 0 ? `
          <div class="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center shadow-level-1">
            <span class="material-symbols-outlined text-[#737685] text-5xl mb-3">inbox</span>
            <h3 class="text-base font-bold text-[#0b1c30]">لا توجد شكاوى مطابقة</h3>
            <p class="text-xs text-[#737685] mt-1">جرب تغيير معايير البحث أو الفلترة الحالية.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${complaints.map(c => {
              const initial = c.customer_name ? c.customer_name.charAt(0) : 'ع';
              
              const statusBadge = c.status === 'new'
                ? '<span class="px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#ba1a1a] inline-block"></span> جديدة</span>'
                : c.status === 'in_progress'
                ? '<span class="px-3 py-1 rounded-full bg-[#fff7ed] text-[#ea580c] text-xs font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#ea580c] inline-block"></span> قيد المعالجة</span>'
                : c.status === 'resolved'
                ? '<span class="px-3 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#137333] inline-block"></span> تم حلها</span>'
                : '<span class="px-3 py-1 rounded-full bg-[#f1f5f9] text-[#737685] text-xs font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#737685] inline-block"></span> مصعدة</span>';

              const priorityColor = c.priority === 'مرتفعة' 
                ? 'text-[#ba1a1a] bg-[#ffdad6]/60 border-[#ba1a1a]/20' 
                : c.priority === 'متوسطة' 
                ? 'text-[#ea580c] bg-[#fff7ed] border-[#ea580c]/20' 
                : 'text-[#0052cc] bg-[#eff4ff] border-[#0052cc]/20';

              return `
                <div onclick="window.location.hash = 'details/${c.id}'" 
                     class="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-level-1 card-hover cursor-pointer flex flex-col justify-between transition-all">
                  <div>
                    <!-- Header with Customer info -->
                    <div class="flex justify-between items-start mb-3 pb-3 border-b border-[#f1f5f9]">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-[#eff4ff] text-[#0052cc] flex items-center justify-center font-bold text-sm">
                          ${initial}
                        </div>
                        <div>
                          <h3 class="text-sm font-bold text-[#0b1c30]">${c.customer_name}</h3>
                          <span class="text-[11px] text-[#737685]">${c.ticket_number} • ${c.time_ago || 'الآن'}</span>
                        </div>
                      </div>
                      ${statusBadge}
                    </div>

                    <!-- Message Preview -->
                    <h4 class="text-sm font-bold text-[#0b1c30] mb-2 line-clamp-1">"${c.ai_summary || c.category}"</h4>
                    <p class="text-xs text-[#434654] leading-relaxed line-clamp-2 mb-4 bg-[#f8f9ff] p-2.5 rounded-xl border border-[#e2e8f0]/50">
                      ${c.original_message}
                    </p>
                  </div>

                  <!-- Footer Tags & AI Confidence -->
                  <div class="pt-3 border-t border-[#f1f5f9] flex flex-wrap items-center gap-2">
                    <span class="px-2.5 py-1 rounded-lg bg-[#f1f5f9] text-[#434654] text-xs font-semibold flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">category</span> ${c.category}
                    </span>
                    <span class="px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 ${priorityColor}">
                      <span class="material-symbols-outlined text-[14px]">flag</span> ${c.priority}
                    </span>
                    <span class="px-2.5 py-1 rounded-lg bg-[#f5f3ff] border border-[#d3e4fe] text-[#510ebb] text-xs font-bold flex items-center gap-1 mr-auto">
                      <span class="material-symbols-outlined text-[13px] sparkle-icon">auto_awesome</span> ${c.ai_confidence}%
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  },

  setFilter(filterId) {
    this.currentFilter = filterId;
    FahmApp.navigate('inbox');
  },

  handleSearch(query) {
    this.searchQuery = query;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      FahmApp.navigate('inbox');
    }, 250);
  }
};
