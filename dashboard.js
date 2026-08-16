/**
 * Screen 1: Dashboard Page (لوحة التحكم)
 * Matches Stitch _1/code.html with dynamic data and responsive cards
 */

const DashboardPage = {
  async render() {
    const [stats, complaints] = await Promise.all([
      FahmDataService.getStats(),
      FahmDataService.getComplaints('', 'all')
    ]);

    const recentComplaints = complaints.slice(0, 5);

    return `
      <div class="space-y-6 animate-fade-in-up">
        <!-- Header -->
        ${renderHeader('لوحة التحكم', 'نظرة عامة على حالة الشكاوى وتطور الأداء اليوم')}

        <!-- 4 KPI Summary Cards (Bento Grid) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Card 1: Total -->
          <div class="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-level-1 card-hover flex flex-col justify-between">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-semibold text-[#737685]">إجمالي الشكاوى</span>
              <div class="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0052cc]">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">list_alt</span>
              </div>
            </div>
            <div>
              <span class="text-2xl lg:text-3xl font-bold text-[#0b1c30]">${stats.total_complaints ? stats.total_complaints.toLocaleString('ar-EG') : '1,240'}</span>
              <span class="text-xs text-[#737685] block mt-1">تراكمي النظام</span>
            </div>
          </div>

          <!-- Card 2: New Complaints -->
          <div class="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-level-1 card-hover flex flex-col justify-between">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-semibold text-[#737685]">شكاوى جديدة</span>
              <div class="w-9 h-9 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                <span class="material-symbols-outlined text-[20px]">fiber_new</span>
              </div>
            </div>
            <div>
              <span class="text-2xl lg:text-3xl font-bold text-[#0b1c30]">${stats.new_complaints || 0}</span>
              <span class="text-[#ba1a1a] text-xs font-bold flex items-center mt-1">
                <span class="material-symbols-outlined text-[16px] ml-1">priority_high</span> بانتظار المراجعة
              </span>
            </div>
          </div>

          <!-- Card 3: In Progress -->
          <div class="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-level-1 card-hover flex flex-col justify-between">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-semibold text-[#737685]">قيد المعالجة</span>
              <div class="w-9 h-9 rounded-xl bg-[#fff7ed] flex items-center justify-center text-[#ea580c]">
                <span class="material-symbols-outlined text-[20px]">hourglass_empty</span>
              </div>
            </div>
            <div>
              <span class="text-2xl lg:text-3xl font-bold text-[#0b1c30]">${stats.in_progress_complaints || 0}</span>
              <span class="text-[#ea580c] text-xs font-bold block mt-1">جاري العمل عليها</span>
            </div>
          </div>

          <!-- Card 4: Resolved -->
          <div class="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-level-1 card-hover flex flex-col justify-between">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-semibold text-[#737685]">تم حلها</span>
              <div class="w-9 h-9 rounded-xl bg-[#e6f4ea] flex items-center justify-center text-[#137333]">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              </div>
            </div>
            <div>
              <span class="text-2xl lg:text-3xl font-bold text-[#0b1c30]">${stats.resolved_complaints ? stats.resolved_complaints.toLocaleString('ar-EG') : '1,180'}</span>
              <span class="text-[#137333] text-xs font-bold block mt-1">معدل الإنجاز ${stats.resolution_rate || 95}%</span>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left/Sidebar Card: Most Recurring Problems -->
          <div class="lg:col-span-1 bg-white border border-[#e2e8f0] rounded-2xl shadow-level-1 p-5 flex flex-col">
            <div class="flex justify-between items-center pb-3 mb-4 border-b border-[#f1f5f9]">
              <h2 class="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#0052cc] text-[20px]">donut_small</span>
                أكثر المشاكل تكراراً
              </h2>
              <span class="text-xs text-[#737685]">نسبة الحدوث</span>
            </div>

            <div class="space-y-4 flex-grow flex flex-col justify-around py-1">
              ${(stats.top_categories || []).map(cat => `
                <div>
                  <div class="flex justify-between items-center text-xs mb-1.5 font-medium text-[#434654]">
                    <span>${cat.name}</span>
                    <span class="font-bold text-[#0b1c30]">${cat.percentage}%</span>
                  </div>
                  <div class="w-full bg-[#e5eeff] rounded-full h-2 overflow-hidden">
                    <div class="${cat.color} h-2 rounded-full transition-all duration-500" style="width: ${cat.percentage}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="mt-4 pt-3 border-t border-[#f1f5f9] bg-[#f8f9ff] p-3 rounded-xl">
              <div class="flex items-center gap-2 text-xs text-[#510ebb] font-bold mb-1">
                <span class="material-symbols-outlined text-sm sparkle-icon">auto_awesome</span>
                <span>تحليل فَهم الذكي</span>
              </div>
              <p class="text-[11px] text-[#434654] leading-relaxed">
                68% من الشكاوى هذا الأسبوع تكررت لأكثر من 5 مرات وتم حلها بواسطة اقتراحات فَهم.
              </p>
            </div>
          </div>

          <!-- Right/Main Card: Recent Complaints List -->
          <div class="lg:col-span-2 bg-white border border-[#e2e8f0] rounded-2xl shadow-level-1 p-5 flex flex-col">
            <div class="flex justify-between items-center pb-3 mb-4 border-b border-[#f1f5f9]">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[#0052cc] text-[20px]">inbox</span>
                <h2 class="text-base font-bold text-[#0b1c30]">أحدث الشكاوى الواردة</h2>
              </div>
              <a href="#inbox" class="text-xs font-bold text-[#0052cc] hover:underline flex items-center gap-1">
                <span>عرض الكل</span>
                <span class="material-symbols-outlined text-[14px]">arrow_back</span>
              </a>
            </div>

            <div class="space-y-2.5 overflow-y-auto max-h-[380px]">
              ${recentComplaints.map(c => {
                const statusBadge = c.status === 'new' 
                  ? '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ffdad6] text-[#ba1a1a]">جديدة</span>'
                  : c.status === 'in_progress'
                  ? '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fff7ed] text-[#ea580c]">قيد المعالجة</span>'
                  : c.status === 'resolved'
                  ? '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#137333]">تم حلها</span>'
                  : '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f1f5f9] text-[#737685]">مصعدة</span>';

                return `
                  <a href="#details/${c.id}" class="block p-3.5 rounded-xl border border-[#e2e8f0] hover:border-[#0052cc]/50 hover:bg-[#eff4ff]/40 transition-all card-hover">
                    <div class="flex justify-between items-start mb-1.5">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm text-[#0052cc]">${c.ticket_number}</span>
                        <span class="text-xs font-semibold text-[#0b1c30]">• ${c.customer_name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        ${statusBadge}
                        <span class="text-[11px] text-[#737685]">${c.time_ago || 'الآن'}</span>
                      </div>
                    </div>
                    <p class="text-xs text-[#434654] line-clamp-1 mb-2">"${c.original_message}"</p>
                    <div class="flex items-center gap-2 pt-1">
                      <span class="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[11px] font-medium text-[#434654] flex items-center gap-1">
                        <span class="material-symbols-outlined text-[13px]">category</span> ${c.category}
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[11px] font-bold text-[#510ebb] flex items-center gap-1 mr-auto">
                        <span class="material-symbols-outlined text-[12px] sparkle-icon">auto_awesome</span> دقة التحليل: ${c.ai_confidence}%
                      </span>
                    </div>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
