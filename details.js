/**
 * Screen 3: Complaint Details Page (تفاصيل الشكوى - الشاشة الجوهرية)
 * Exact match to Stitch _4/code.html with full AI Analysis, Similar Cases, and Sticky Action Bar
 */

const DetailsPage = {
  similarCasesOpen: true,

  async render(complaintId) {
    const complaint = await FahmDataService.getComplaintById(complaintId);

    if (!complaint) {
      return `
        <div class="bg-white rounded-2xl p-12 text-center shadow-level-1">
          <h2 class="text-xl font-bold text-[#ba1a1a]">الشكوى غير موجودة</h2>
          <p class="text-sm text-[#737685] mt-2">يرجى العودة إلى صندوق الشكاوى.</p>
          <a href="#inbox" class="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#0052cc] text-white text-sm font-bold">العودة للصندوق</a>
        </div>
      `;
    }

    const statusBadge = complaint.status === 'new'
      ? '<span class="px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold pulse-badge">جديدة بانتظار الحل</span>'
      : complaint.status === 'in_progress'
      ? '<span class="px-3 py-1 rounded-full bg-[#fff7ed] text-[#ea580c] text-xs font-bold">قيد المعالجة</span>'
      : complaint.status === 'resolved'
      ? '<span class="px-3 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">check_circle</span> تم الحل والاعتماد</span>'
      : '<span class="px-3 py-1 rounded-full bg-[#f1f5f9] text-[#737685] text-xs font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">flag</span> تم التصعيد</span>';

    const priorityBadgeClass = complaint.priority === 'مرتفعة' 
      ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/30' 
      : complaint.priority === 'متوسطة' 
      ? 'bg-[#fff7ed] text-[#ea580c] border-[#ea580c]/30' 
      : 'bg-[#eff4ff] text-[#0052cc] border-[#0052cc]/30';

    return `
      <div class="space-y-6 pb-28 animate-fade-in-up">
        <!-- Top App Bar & Header -->
        ${renderHeader(
          `شكوى ${complaint.ticket_number}`,
          `تم الاستلام: ${complaint.time_ago || 'الآن'} • قناة الاستقبال: ${complaint.channel || 'البريد الإلكتروني'}`,
          '#inbox'
        )}

        <!-- Status & Ticket Alert Bar if already handled -->
        ${complaint.status === 'resolved' ? `
          <div class="bg-[#e6f4ea] border border-[#a8dab5] rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#137333] text-2xl">task_alt</span>
              <div>
                <h4 class="text-sm font-bold text-[#137333]">تم اعتماد وإغلاق هذه الشكوى بنجاح</h4>
                <p class="text-xs text-[#2e7d32] mt-0.5">الحل المعتمد: ${complaint.final_resolution || complaint.suggested_resolution}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-[#137333] bg-white px-3 py-1 rounded-lg border border-[#a8dab5]">مغلقة</span>
          </div>
        ` : complaint.status === 'escalated' ? `
          <div class="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#ba1a1a] text-2xl">flag</span>
              <div>
                <h4 class="text-sm font-bold text-[#ba1a1a]">تم تصعيد هذه الشكوى للإدارة</h4>
                <p class="text-xs text-[#991b1b] mt-0.5">السبب: ${complaint.escalation_reason || 'حالة خاصة'}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-[#ba1a1a] bg-white px-3 py-1 rounded-lg border border-[#fecaca]">مصعدة</span>
          </div>
        ` : ''}

        <!-- 12-Column Grid matching Stitch Prototype -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Right Column: Customer Info & Message (5 cols in RTL) -->
          <div class="lg:col-span-5 space-y-6">
            <!-- 1. Customer Details Card -->
            <div class="bg-white rounded-2xl border border-[#e2e8f0] shadow-level-1 p-5 card-hover">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-[#f1f5f9]">
                <h3 class="text-xs font-bold text-[#737685] uppercase tracking-wider">تفاصيل العميل والطلب</h3>
                ${statusBadge}
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-1.5 border-b border-[#f1f5f9]">
                  <span class="text-xs text-[#737685]">اسم العميل</span>
                  <span class="font-bold text-[#0b1c30]">${complaint.customer_name}</span>
                </div>
                <div class="flex justify-between items-center py-1.5 border-b border-[#f1f5f9]">
                  <span class="text-xs text-[#737685]">البريد الإلكتروني</span>
                  <span class="font-medium text-[#0b1c30]" dir="ltr">${complaint.customer_email}</span>
                </div>
                <div class="flex justify-between items-center py-1.5 border-b border-[#f1f5f9]">
                  <span class="text-xs text-[#737685]">رقم الطلب</span>
                  <span class="font-bold text-[#0052cc] bg-[#eff4ff] px-2.5 py-0.5 rounded-md">${complaint.order_number}</span>
                </div>
                <div class="flex justify-between items-center py-1.5">
                  <span class="text-xs text-[#737685]">تاريخ الطلب</span>
                  <span class="font-medium text-[#0b1c30]">${complaint.order_date}</span>
                </div>
              </div>
            </div>

            <!-- 2. Customer Original Message Card -->
            <div class="bg-white rounded-2xl border border-[#e2e8f0] shadow-level-1 p-5 card-hover">
              <div class="flex items-center gap-2 mb-3 pb-3 border-b border-[#f1f5f9]">
                <span class="material-symbols-outlined text-[#737685] text-[20px]">forum</span>
                <h3 class="text-xs font-bold text-[#737685] uppercase tracking-wider">رسالة العميل الأصلية</h3>
              </div>
              <div class="bg-[#f8f9ff] p-4 rounded-xl border border-[#e2e8f0]/60">
                <p class="text-sm text-[#0b1c30] leading-relaxed whitespace-pre-wrap font-medium">
                  "${complaint.original_message}"
                </p>
              </div>
            </div>
          </div>

          <!-- Left Column: Fahm AI Engine (7 cols in RTL) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- 1. AI Analysis Card (تحليل فَهم) -->
            <div class="bg-white rounded-2xl border border-[#d0bcff] shadow-level-1 p-6 relative overflow-hidden ai-shimmer card-hover">
              <div class="flex justify-between items-center mb-5 pb-3 border-b border-[#e2e8f0]/40">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-[#6a36d3] text-white flex items-center justify-center shadow-xs">
                    <span class="material-symbols-outlined text-[18px] sparkle-icon">auto_awesome</span>
                  </div>
                  <h3 class="text-lg font-bold text-[#510ebb]">تحليل فَهم الذكي</h3>
                </div>
                <div class="flex items-center gap-1 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#d3e4fe] pulse-badge">
                  <span class="material-symbols-outlined text-[16px] text-[#0052cc]">verified</span>
                  <span class="text-xs font-bold text-[#0052cc]">نسبة الثقة: ${complaint.ai_confidence}%</span>
                </div>
              </div>

              <!-- Classification & Priority Badges -->
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span class="text-xs text-[#737685] block mb-1.5 font-medium">التصنيف المستنتج</span>
                  <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#0052cc] text-xs font-bold border border-[#d3e4fe]">
                    <span class="material-symbols-outlined text-[16px]">local_shipping</span>
                    ${complaint.category}
                  </div>
                </div>
                <div>
                  <span class="text-xs text-[#737685] block mb-1.5 font-medium">مستوى الأولوية</span>
                  <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${priorityBadgeClass}">
                    <span class="material-symbols-outlined text-[16px]">warning</span>
                    ${complaint.priority}
                  </div>
                </div>
              </div>

              <!-- Smart Summary -->
              <div>
                <span class="text-xs text-[#737685] block mb-1.5 font-medium">الملخص الذكي للشكوى</span>
                <p class="text-sm text-[#0b1c30] bg-[#f8f9ff] p-3.5 rounded-xl border border-[#e2e8f0] leading-relaxed">
                  ${complaint.ai_summary}
                </p>
              </div>
            </div>

            <!-- 2. Suggested Resolution Card (الحل المقترح) -->
            <div class="bg-white rounded-2xl border border-[#d0bcff]/60 shadow-level-1 p-6 card-hover">
              <div class="flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined text-[#6a36d3] text-[22px]">lightbulb</span>
                <h3 class="text-base font-bold text-[#0b1c30]">الحل الموصى به</h3>
              </div>

              <div class="bg-[#f8f9ff] border border-[#e2e8f0] p-4 rounded-xl mb-4">
                <p class="text-sm text-[#0b1c30] leading-relaxed font-semibold">
                  ${complaint.final_resolution || complaint.suggested_resolution}
                </p>
              </div>

              <!-- Evidence and Reasoning Box -->
              <div class="flex items-start gap-3 bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe] text-xs text-[#434654]">
                <span class="material-symbols-outlined text-[#0052cc] text-[20px] shrink-0 mt-0.5">insights</span>
                <p class="leading-relaxed font-medium">
                  ${complaint.ai_reasoning}
                </p>
              </div>
            </div>

            <!-- 3. Similar Historical Cases Card (حالات مشابهة) -->
            <div class="bg-white rounded-2xl border border-[#e2e8f0] shadow-level-1 overflow-hidden card-hover">
              <div class="p-4 bg-[#f8f9ff] flex justify-between items-center border-b border-[#e2e8f0] cursor-pointer"
                   onclick="DetailsPage.toggleSimilarCases()">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#737685] text-[20px]">history</span>
                  <h3 class="text-sm font-bold text-[#0b1c30]">
                    حالات سابقة مشابهة تم حلها (${complaint.similar_cases ? complaint.similar_cases.length : 0})
                  </h3>
                </div>
                <button class="text-[#737685] hover:text-[#0052cc] p-1 rounded-full">
                  <span class="material-symbols-outlined text-[20px] transition-transform ${this.similarCasesOpen ? 'rotate-180' : ''}">
                    expand_more
                  </span>
                </button>
              </div>

              <div id="similar-cases-list" class="${this.similarCasesOpen ? 'block' : 'hidden'} divide-y divide-[#f1f5f9]">
                ${(!complaint.similar_cases || complaint.similar_cases.length === 0) ? `
                  <p class="p-4 text-xs text-[#737685] text-center">لا توجد حالات سابقة مسجلة لهذا النوع.</p>
                ` : complaint.similar_cases.map(sc => `
                  <div class="p-4 hover:bg-[#eff4ff]/30 transition-colors">
                    <div class="flex justify-between items-center mb-1.5">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-xs text-[#0052cc]">${sc.historical_ticket_number}</span>
                        <span class="text-[11px] text-[#737685]">• ${sc.resolved_ago}</span>
                      </div>
                      <span class="px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-[11px] font-bold">
                        تطابق: ${sc.similarity_score}%
                      </span>
                    </div>
                    <p class="text-xs text-[#434654] mb-2 font-medium">${sc.historical_summary}</p>
                    <div class="bg-[#f8f9ff] p-2.5 rounded-lg border border-[#e2e8f0]/60 text-xs">
                      <span class="font-bold text-[#0b1c30]">الإجراء المنفذ:</span>
                      <span class="text-[#434654] mr-1">${sc.applied_solution}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>

        <!-- Sticky Action Bar (Fixed at bottom) -->
        <div class="fixed bottom-0 left-0 md:mr-64 right-0 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] shadow-modal p-4 z-40">
          <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <span class="text-xs text-[#737685] hidden md:inline">القرار النهائي للموظف:</span>
              <span class="text-xs font-bold text-[#0b1c30]">${complaint.customer_name} (${complaint.ticket_number})</span>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              <!-- Escalate Button -->
              <button onclick="ModalManager.showEscalateModal('${complaint.id}')" 
                      class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#cbd5e1] text-[#737685] hover:text-[#ba1a1a] hover:border-[#ba1a1a] hover:bg-[#ffdad6]/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5 btn-interactive">
                <span class="material-symbols-outlined text-[18px]">flag</span>
                <span>تصعيد</span>
              </button>

              <!-- Edit Resolution Button -->
              <button onclick="ModalManager.showEditModal('${complaint.id}', \`${complaint.final_resolution || complaint.suggested_resolution}\`)" 
                      class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white border border-[#0052cc] text-[#0052cc] hover:bg-[#eff4ff] text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 btn-interactive">
                <span class="material-symbols-outlined text-[18px]">edit</span>
                <span>تعديل الحل</span>
              </button>

              <!-- Approve Resolution Button -->
              <button onclick="FahmApp.handleApprove('${complaint.id}')" 
                      class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 btn-interactive">
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
                <span>اعتماد الحل</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  toggleSimilarCases() {
    this.similarCasesOpen = !this.similarCasesOpen;
    const list = document.getElementById('similar-cases-list');
    if (list) {
      list.classList.toggle('hidden');
    }
  }
};
