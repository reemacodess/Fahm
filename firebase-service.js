/**
 * Firebase Firestore Data Service for Fahm (فَهم)
 * Manages Cloud Firestore syncing, live queries, and seed data.
 */

const SEED_DATA_COMPLAINTS = [
  {
    id: "4829",
    ticket_number: "#4829",
    customer_name: "سارة أحمد",
    customer_email: "sara@email.com",
    order_number: "#55432",
    order_date: "15 أكتوبر 2023",
    channel: "البريد الإلكتروني",
    original_message: "السلام عليكم، طلبت المنتج قبل أسبوع، وإلى الآن لم يصلني. حاولت التواصل أكثر من مرة ولكن لم أحصل على تحديث واضح عن حالة الطلب. أتمنى مساعدتي في معرفة مكان طلبي وموعد وصوله.",
    status: "new",
    category: "تأخر الطلب",
    priority: "متوسطة",
    ai_summary: "العميل لم يستلم طلبه بعد مرور أسبوع ويرغب في معرفة حالة الشحنة وموعد وصولها.",
    ai_confidence: 94,
    suggested_resolution: "التحقق من حالة الشحنة باستخدام رقم الطلب، ثم إرسال آخر تحديث للعميل وموعد التسليم المتوقع.",
    ai_reasoning: "تم اقتراح هذا الحل بناءً على 23 حالة مشابهة تم حلها سابقاً، واستخدم هذا الإجراء بنجاح في 19 حالة.",
    time_ago: "منذ ساعتين",
    similar_cases: [
      {
        historical_ticket_number: "#1023",
        similarity_score: 92,
        historical_summary: "العميل لم يستلم الطلب منذ 6 أيام.",
        applied_solution: "التحقق من الشحنة وإرسال موعد التسليم مع اعتذار لطيف.",
        resolved_ago: "قبل شهر"
      },
      {
        historical_ticket_number: "#0892",
        similarity_score: 88,
        historical_summary: "تأخر وصول الشحنة مع عدم وجود تحديث لرقم التتبع.",
        applied_solution: "متابعة شركة الشحن وإرسال رابط التتبع المحدث للعميل.",
        resolved_ago: "قبل شهرين"
      }
    ]
  },
  {
    id: "4830",
    ticket_number: "#4830",
    customer_name: "أحمد محمود",
    customer_email: "ahmed.m@example.com",
    order_number: "#55390",
    order_date: "16 أكتوبر 2023",
    channel: "البريد الإلكتروني",
    original_message: "قمت بإجراء عملية شراء وتم خصم المبلغ من حسابي البنكي مرتين. أرجو المساعدة في استرداد المبلغ الإضافي بأسرع وقت ممكن حيث أن الرصيد مخصوم بالفعل من كشف الحساب.",
    status: "in_progress",
    category: "مشاكل الدفع",
    priority: "مرتفعة",
    ai_summary: "خصم المبلغ مرتين من الحساب البنكي للعميل عند إتمام الطلب ومطالبة باسترداد فوري للمبلغ الزائد.",
    ai_confidence: 96,
    suggested_resolution: "التحقق من بوابة الدفع وتأكيد العملية المكررة، ثم إلغاء العملية الإضافية وإصدار استرداد فوري إلى حساب العميل البنكي.",
    ai_reasoning: "تم اقتراح هذا الحل بناءً على 31 حالة دفع مكرر سابقة، وتمت المعالجة بنجاح خلال 24 ساعة في 97% من الحالات.",
    time_ago: "منذ 5 ساعات",
    similar_cases: [
      {
        historical_ticket_number: "#2104",
        similarity_score: 96,
        historical_summary: "سحب مالي مزدوج لنفس الفاتورة من البطاقة الائتمانية.",
        applied_solution: "رفع طلب عكس عملية عبر بوابة الدفع وإرسال الإيصال للعميل.",
        resolved_ago: "قبل 3 أسابيع"
      },
      {
        historical_ticket_number: "#1845",
        similarity_score: 91,
        historical_summary: "خصم القيمة مرتين بسبب تعليق في صفحة الدفع.",
        applied_solution: "تأكيد السحب المكرر وإعادة الرصيد للمحفظة مع إشعار بنكي.",
        resolved_ago: "قبل شهر ونصف"
      }
    ]
  },
  {
    id: "4831",
    ticket_number: "#4831",
    customer_name: "نورة العتيبي",
    customer_email: "noura.otb@example.com",
    order_number: "#55210",
    order_date: "14 أكتوبر 2023",
    channel: "البريد الإلكتروني",
    original_message: "مرحباً، استلمت طلبي اليوم ولكن المقاس طلع صغير جداً مقارنة بجدول المقاسات. هل بالإمكان استبداله بالمقاس الأكبر (L) دون دفع رسوم شحن إضافية؟",
    status: "new",
    category: "الاسترجاع والتبديل",
    priority: "منخفضة",
    ai_summary: "العميلة ترغب في استبدال مقاس المنتج بآخر أكبر مجاناً بسبب عدم ملائمة المقاس.",
    ai_confidence: 91,
    suggested_resolution: "إنشاء بوليصة استبدال مجانية وإرسالها للعميلة مع توجيه مندوب الاستلام، وحجز المقاس الجديد فوراً.",
    ai_reasoning: "الحالة تقع ضمن سياسة الاستبدال المجاني خلال 14 يوماً. استُخدم هذا الإجراء في 45 حالة استبدال مطابقة.",
    time_ago: "منذ 6 ساعات",
    similar_cases: [
      {
        historical_ticket_number: "#3042",
        similarity_score: 94,
        historical_summary: "طلب استبدال قطعة ملابس بمقاس أكبر بعد الاستلام بيوم.",
        applied_solution: "إصدار بوليصة إرجاع مجانية وحجز المنتج البديل للشحن.",
        resolved_ago: "قبل أسبوعين"
      }
    ]
  },
  {
    id: "4832",
    ticket_number: "#4832",
    customer_name: "خالد الغامدي",
    customer_email: "khalid.gh@example.com",
    order_number: "#55104",
    order_date: "13 أكتوبر 2023",
    channel: "البريد الإلكتروني",
    original_message: "وصلتني الشحنة اليوم وعند فتح الصندوق وجدت المنتج الزجاجي مكسوراً بالكامل والتغليف الخارجي ممزق. مرفق لكم صور الكسر، أطالب بمنتج بديل سليم بأسرع وقت.",
    status: "new",
    category: "تلف المنتج",
    priority: "مرتفعة",
    ai_summary: "استلام منتج مكسور مع تلف في التغليف الخارجي للطلب وطلب شحن بديل سليم عاجل.",
    ai_confidence: 98,
    suggested_resolution: "اعتماد تعويض فوري وشحن منتج بديل مجاناً بدون انتظار استرجاع التالف، مع فتح بلاغ سوء مناولة لدى شركة الشحن.",
    ai_reasoning: "بناءً على 18 حالة تلف أثناء الشحن، شحن البديل الفوري يرفع رضا العملاء بنسبة 98% ويقلل خسائر التقييمات.",
    time_ago: "منذ يوم",
    similar_cases: [
      {
        historical_ticket_number: "#1950",
        similarity_score: 97,
        historical_summary: "استلام فازة زجاجية مهشمة داخل التغليف.",
        applied_solution: "شحن قطعة بديلة فوراً وتقديم مطالبة تأمين ضد شركة الشحن.",
        resolved_ago: "قبل شهر"
      }
    ]
  },
  {
    id: "4833",
    ticket_number: "#4833",
    customer_name: "فيصل الشمري",
    customer_email: "faisal.sh@example.com",
    order_number: "#55088",
    order_date: "12 أكتوبر 2023",
    channel: "البريد الإلكتروني",
    original_message: "حاولت استخدام كود الخصم المعلن عنه في اليوم الوطني ولكن تظهر لي رسالة 'الكود غير صالح' على الرغم من أن قيمة السلة تتجاوز الحد الأدنى المطلوب.",
    status: "resolved",
    category: "العروض والخصومات",
    priority: "منخفضة",
    ai_summary: "كوبون الخصم الترويجي لا يطبق في صفحة الدفع رغم استيفاء الشروط.",
    ai_confidence: 89,
    suggested_resolution: "تفعيل الكوبون يدوياً على سلة العميل أو إنشاء كود خصم مخصص بنسبة 20% وإرساله للعميل عبر البريد.",
    ai_reasoning: "تم حل 29 حالة مماثلة بنجاح عبر إصدار كود بديل فوري للمستخدم.",
    time_ago: "منذ يومين",
    similar_cases: [
      {
        historical_ticket_number: "#2211",
        similarity_score: 90,
        historical_summary: "عطل في تطبيق كود خصم الحملة الإعلانية.",
        applied_solution: "إصدار قسيمة تعويضية بقيمة الخصم مباشرة في الحساب.",
        resolved_ago: "قبل شهر"
      }
    ]
  },
  {
    id: "4834",
    ticket_number: "#4834",
    customer_name: "ريهام الدوسري",
    customer_email: "reham.d@example.com",
    order_number: "#54992",
    order_date: "11 أكتوبر 2023",
    channel: "البريد الإلكتروني",
    original_message: "أرغب في تعديل عنوان التوصيل لأنني انتقلت إلى منزل جديد في حي آخر قبل خروج الشحنة للتوزيع، يرجى التعديل سريعاً قبل التسليم.",
    status: "in_progress",
    category: "تأخر الطلب",
    priority: "متوسطة",
    ai_summary: "طلب تعديل عنوان التسليم قبل بدء المندوب في جولة التوزيع.",
    ai_confidence: 93,
    suggested_resolution: "تحديث العنوان على نظام الشحن والتواصل مع السائق المسؤول لتحويل مسار الشحنة وتأكيد العنوان الجديد مع العميل.",
    ai_reasoning: "تم تطبيق هذا الحل في 52 حالة مماثلة بنجاح دون أي تأخير في موعد التسليم النهائي.",
    time_ago: "منذ 3 أيام",
    similar_cases: [
      {
        historical_ticket_number: "#1188",
        similarity_score: 93,
        historical_summary: "تغيير موقع الاستلام للطلب قبل التوصيل بساعات.",
        applied_solution: "تعديل إحداثيات الموقع في نظام التوصيل وإشعار المندوب.",
        resolved_ago: "قبل أسبوعين"
      }
    ]
  }
];

const SEED_DATA_KNOWLEDGE = [
  {
    id: "kb-1",
    category: "تأخر الطلب",
    title: "معالجة تأخر الشحنات وتحديث التتبع",
    approved_solution: "التحقق من حالة الشحنة باستخدام رقم التتبع، ومتابعة شركة النقل ثم إرسال آخر موعد تسليم متوقع مع اعتذار رسمي.",
    total_cases: 320,
    usage_count: 287,
    icon: "local_shipping"
  },
  {
    id: "kb-2",
    category: "مشاكل الدفع",
    title: "حل عمليات السحب المكررة والمعلقة",
    approved_solution: "التحقق من بوابة الدفع وتأكيد العملية، ثم إلغاء العملية المكررة وإعادة المبلغ للبطاقة خلال 24-48 ساعة عمل.",
    total_cases: 150,
    usage_count: 142,
    icon: "payment"
  },
  {
    id: "kb-3",
    category: "الاسترجاع والتبديل",
    title: "إجراءات استبدال المقاس والمنتجات السليمة",
    approved_solution: "إصدار بوليصة استرجاع أو استبدال مجانية عبر شركة الشحن، وحجز القطعة البديلة للشحن فور تسليم المرتجع.",
    total_cases: 210,
    usage_count: 198,
    icon: "published_with_changes"
  },
  {
    id: "kb-4",
    category: "تلف المنتج",
    title: "التعامل مع التلف والكسر أثناء الشحن",
    approved_solution: "مراجعة صور التلف وشحن منتج بديل فوراً دون تأخير، مع فتح مطالبة تعويضية ضد شركة الشحن لسوء المناولة.",
    total_cases: 95,
    usage_count: 91,
    icon: "broken_image"
  },
  {
    id: "kb-5",
    category: "العروض والخصومات",
    title: "أعطال أكواد وكوبونات الخصم",
    approved_solution: "التحقق من صلاحية الحملة وإنشاء كود خصم ترويجي بديل مساوٍ في القيمة وإرساله عبر البريد الإلكتروني.",
    total_cases: 80,
    usage_count: 76,
    icon: "loyalty"
  }
];

const FahmDataService = {
  db: null,
  isFirestoreReady: false,

  async init() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      try {
        this.db = firebase.firestore();
        this.isFirestoreReady = true;
        await this.ensureSeedData();
        console.log("Firebase Firestore Service Ready!");
        return;
      } catch (e) {
        console.warn("Firestore init warning, falling back to local API/storage:", e);
      }
    }
    this.isFirestoreReady = false;
  },

  async ensureSeedData() {
    if (!this.isFirestoreReady) return;
    try {
      const snap = await this.db.collection('complaints').limit(1).get();
      if (snap.empty) {
        console.log("Seeding Firestore with initial Arabic complaints & knowledge base...");
        const batch = this.db.batch();

        for (const c of SEED_DATA_COMPLAINTS) {
          const ref = this.db.collection('complaints').doc(c.id);
          batch.set(ref, c);
        }

        for (const k of SEED_DATA_KNOWLEDGE) {
          const ref = this.db.collection('knowledge_items').doc(k.id);
          batch.set(ref, k);
        }

        await batch.commit();
        console.log("Firestore Seed Complete!");
      }
    } catch (e) {
      console.warn("Could not check/seed Firestore (may be offline or need security rules enabled):", e.message);
    }
  },

  // 1. Get Complaints
  async getComplaints(search = '', status = 'all', category = 'all') {
    if (this.isFirestoreReady) {
      try {
        let snap = await this.db.collection('complaints').get();
        let items = [];
        snap.forEach(doc => items.push({ ...doc.data(), id: doc.id }));

        // Client filtering
        if (status && status !== 'all' && status !== 'الكل') {
          if (status === 'needs_review' || status === 'تحتاج مراجعة') {
            items = items.filter(i => i.status === 'new' || i.status === 'in_progress');
          } else {
            items = items.filter(i => i.status === status);
          }
        }

        if (category && category !== 'all' && category !== 'الكل') {
          items = items.filter(i => i.category === category);
        }

        if (search && search.trim()) {
          const q = search.trim().toLowerCase();
          items = items.filter(i =>
            (i.ticket_number && i.ticket_number.toLowerCase().includes(q)) ||
            (i.customer_name && i.customer_name.toLowerCase().includes(q)) ||
            (i.original_message && i.original_message.toLowerCase().includes(q)) ||
            (i.ai_summary && i.ai_summary.toLowerCase().includes(q)) ||
            (i.category && i.category.toLowerCase().includes(q))
          );
        }

        return items;
      } catch (e) {
        console.warn("Firestore fetch error, using API fallback:", e);
      }
    }

    // Fallback to local server API
    let url = '/api/complaints?';
    if (status && status !== 'all') url += `status=${encodeURIComponent(status)}&`;
    if (category && category !== 'all') url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data || [];
  },

  // 2. Get Complaint By ID
  async getComplaintById(complaintId) {
    const idStr = String(complaintId);
    if (this.isFirestoreReady) {
      try {
        const doc = await this.db.collection('complaints').doc(idStr).get();
        if (doc.exists) {
          return { ...doc.data(), id: doc.id };
        }
      } catch (e) {
        console.warn("Firestore get error:", e);
      }
    }

    // Fallback to API
    const res = await fetch(`/api/complaints/${complaintId}`);
    const data = await res.json();
    return data.data;
  },

  // 3. Approve Complaint
  async approveComplaint(complaintId) {
    const idStr = String(complaintId);
    if (this.isFirestoreReady) {
      try {
        const ref = this.db.collection('complaints').doc(idStr);
        const doc = await ref.get();
        if (doc.exists) {
          const comp = doc.data();
          await ref.update({
            status: 'resolved',
            action_taken: 'approved',
            final_resolution: comp.suggested_resolution,
            resolved_at: new Date().toISOString()
          });

          // Update KB usage count if category matches
          const kbSnap = await this.db.collection('knowledge_items').where('category', '==', comp.category).get();
          kbSnap.forEach(async (kbDoc) => {
            await kbDoc.ref.update({
              usage_count: (kbDoc.data().usage_count || 0) + 1
            });
          });

          return { success: true };
        }
      } catch (e) {
        console.warn("Firestore update error:", e);
      }
    }

    // Fallback to API
    const res = await fetch(`/api/complaints/${complaintId}/approve`, { method: 'POST' });
    return await res.json();
  },

  // 4. Edit Complaint
  async editComplaint(complaintId, resolution) {
    const idStr = String(complaintId);
    if (this.isFirestoreReady) {
      try {
        const ref = this.db.collection('complaints').doc(idStr);
        const doc = await ref.get();
        if (doc.exists) {
          const comp = doc.data();
          await ref.update({
            status: 'resolved',
            action_taken: 'edited',
            final_resolution: resolution,
            resolved_at: new Date().toISOString()
          });

          const kbSnap = await this.db.collection('knowledge_items').where('category', '==', comp.category).get();
          kbSnap.forEach(async (kbDoc) => {
            await kbDoc.ref.update({
              usage_count: (kbDoc.data().usage_count || 0) + 1
            });
          });

          return { success: true };
        }
      } catch (e) {
        console.warn("Firestore edit error:", e);
      }
    }

    const res = await fetch(`/api/complaints/${complaintId}/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resolution })
    });
    return await res.json();
  },

  // 5. Escalate Complaint
  async escalateComplaint(complaintId, reason) {
    const idStr = String(complaintId);
    if (this.isFirestoreReady) {
      try {
        const ref = this.db.collection('complaints').doc(idStr);
        await ref.update({
          status: 'escalated',
          action_taken: 'escalated',
          escalation_reason: reason
        });
        return { success: true };
      } catch (e) {
        console.warn("Firestore escalate error:", e);
      }
    }

    const res = await fetch(`/api/complaints/${complaintId}/escalate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    return await res.json();
  },

  // 6. Get Knowledge Base
  async getKnowledgeBase(search = '', category = 'all') {
    if (this.isFirestoreReady) {
      try {
        const snap = await this.db.collection('knowledge_items').get();
        let items = [];
        snap.forEach(doc => items.push({ ...doc.data(), id: doc.id }));

        if (category && category !== 'all' && category !== 'الكل') {
          items = items.filter(k => k.category === category);
        }

        if (search && search.trim()) {
          const q = search.trim().toLowerCase();
          items = items.filter(k =>
            (k.title && k.title.toLowerCase().includes(q)) ||
            (k.category && k.category.toLowerCase().includes(q)) ||
            (k.approved_solution && k.approved_solution.toLowerCase().includes(q))
          );
        }

        items.sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0));
        return items;
      } catch (e) {
        console.warn("Firestore KB error:", e);
      }
    }

    let url = '/api/knowledge-base?';
    if (category && category !== 'all') url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data || [];
  },

  // 7. Get Analytics & Stats
  async getStats() {
    if (this.isFirestoreReady) {
      try {
        const snap = await this.db.collection('complaints').get();
        const complaints = [];
        snap.forEach(doc => complaints.push(doc.data()));

        const total = complaints.length;
        const newC = complaints.filter(c => c.status === 'new').length;
        const inProg = complaints.filter(c => c.status === 'in_progress').length;
        const resolved = complaints.filter(c => c.status === 'resolved').length;
        const escalated = complaints.filter(c => c.status === 'escalated').length;

        const assisted = complaints.filter(c => c.action_taken === 'approved' || c.action_taken === 'edited').length;
        const aiAssistedRate = total > 0 ? Math.round((assisted / total) * 100) : 92;
        const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 95;

        return {
          total_complaints: 1240 + total,
          new_complaints: newC,
          in_progress_complaints: inProg,
          resolved_complaints: 1180 + resolved,
          escalated_complaints: escalated,
          resolution_rate: resolutionRate,
          repeated_complaints_rate: 68,
          ai_assisted_rate: aiAssistedRate,
          avg_processing_time: "3.8 دقيقة",
          time_saved: "64%",
          top_categories: [
            { name: "تأخر الطلب", percentage: 42, color: "bg-primary" },
            { name: "مشاكل الدفع", percentage: 28, color: "bg-secondary" },
            { name: "الاسترجاع والتبديل", percentage: 18, color: "bg-tertiary" },
            { name: "تلف المنتج", percentage: 12, color: "bg-outline" }
          ]
        };
      } catch (e) {
        console.warn("Firestore stats error:", e);
      }
    }

    const res = await fetch('/api/stats');
    const data = await res.json();
    return data.data || {};
  },

  // 8. Reset Demo Data
  async resetDemoData() {
    if (this.isFirestoreReady) {
      try {
        // Clear & Re-seed
        const compSnap = await this.db.collection('complaints').get();
        const batch = this.db.batch();
        compSnap.forEach(d => batch.delete(d.ref));
        const kbSnap = await this.db.collection('knowledge_items').get();
        kbSnap.forEach(d => batch.delete(d.ref));
        await batch.commit();

        await this.ensureSeedData();
        return { success: true };
      } catch (e) {
        console.warn("Firestore reset error:", e);
      }
    }

    const res = await fetch('/api/reset-demo', { method: 'POST' });
    return await res.json();
  }
};

window.FahmDataService = FahmDataService;
