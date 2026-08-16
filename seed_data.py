"""
Realistic Arabic Seed Data for Fahm (فَهم) MVP
"""
from database import get_connection, init_db

SEED_COMPLAINTS = [
    {
        "ticket_number": "#4829",
        "customer_name": "سارة أحمد",
        "customer_email": "sara@email.com",
        "order_number": "#55432",
        "order_date": "15 أكتوبر 2023",
        "channel": "البريد الإلكتروني",
        "original_message": "السلام عليكم، طلبت المنتج قبل أسبوع، وإلى الآن لم يصلني. حاولت التواصل أكثر من مرة ولكن لم أحصل على تحديث واضح عن حالة الطلب. أتمنى مساعدتي في معرفة مكان طلبي وموعد وصوله.",
        "status": "new",
        "category": "تأخر الطلب",
        "priority": "متوسطة",
        "ai_summary": "العميل لم يستلم طلبه بعد مرور أسبوع ويرغب في معرفة حالة الشحنة وموعد وصولها.",
        "ai_confidence": 94,
        "suggested_resolution": "التحقق من حالة الشحنة باستخدام رقم الطلب، ثم إرسال آخر تحديث للعميل وموعد التسليم المتوقع.",
        "ai_reasoning": "تم اقتراح هذا الحل بناءً على 23 حالة مشابهة تم حلها سابقاً، واستخدم هذا الإجراء بنجاح في 19 حالة.",
        "time_ago": "منذ ساعتين",
        "similar_cases": [
            {
                "historical_ticket_number": "#1023",
                "similarity_score": 92,
                "historical_summary": "العميل لم يستلم الطلب منذ 6 أيام.",
                "applied_solution": "التحقق من الشحنة وإرسال موعد التسليم مع اعتذار لطيف.",
                "resolved_ago": "قبل شهر"
            },
            {
                "historical_ticket_number": "#0892",
                "similarity_score": 88,
                "historical_summary": "تأخر وصول الشحنة مع عدم وجود تحديث لرقم التتبع.",
                "applied_solution": "متابعة شركة الشحن وإرسال رابط التتبع المحدث للعميل.",
                "resolved_ago": "قبل شهرين"
            }
        ]
    },
    {
        "ticket_number": "#4830",
        "customer_name": "أحمد محمود",
        "customer_email": "ahmed.m@example.com",
        "order_number": "#55390",
        "order_date": "16 أكتوبر 2023",
        "channel": "البريد الإلكتروني",
        "original_message": "قمت بإجراء عملية شراء وتم خصم المبلغ من حسابي البنكي مرتين. أرجو المساعدة في استرداد المبلغ الإضافي بأسرع وقت ممكن حيث أن الرصيد مخصوم بالفعل من كشف الحساب.",
        "status": "in_progress",
        "category": "مشاكل الدفع",
        "priority": "مرتفعة",
        "ai_summary": "خصم المبلغ مرتين من الحساب البنكي للعميل عند إتمام الطلب ومطالبة باسترداد فوري للمبلغ الزائد.",
        "ai_confidence": 96,
        "suggested_resolution": "التحقق من بوابة الدفع وتأكيد العملية المكررة، ثم إلغاء العملية الإضافية وإصدار استرداد فوري إلى حساب العميل البنكي.",
        "ai_reasoning": "تم اقتراح هذا الحل بناءً على 31 حالة دفع مكرر سابقة، وتمت المعالجة بنجاح خلال 24 ساعة في 97% من الحالات.",
        "time_ago": "منذ 5 ساعات",
        "similar_cases": [
            {
                "historical_ticket_number": "#2104",
                "similarity_score": 96,
                "historical_summary": "سحب مالي مزدوج لنفس الفاتورة من البطاقة الائتمانية.",
                "applied_solution": "رفع طلب عكس عملية عبر بوابة الدفع وإرسال الإيصال للعميل.",
                "resolved_ago": "قبل 3 أسابيع"
            },
            {
                "historical_ticket_number": "#1845",
                "similarity_score": 91,
                "historical_summary": "خصم القيمة مرتين بسبب تعليق في صفحة الدفع.",
                "applied_solution": "تأكيد السحب المكرر وإعادة الرصيد للمحفظة مع إشعار بنكي.",
                "resolved_ago": "قبل شهر ونصف"
            }
        ]
    },
    {
        "ticket_number": "#4831",
        "customer_name": "نورة العتيبي",
        "customer_email": "noura.otb@example.com",
        "order_number": "#55210",
        "order_date": "14 أكتوبر 2023",
        "channel": "البريد الإلكتروني",
        "original_message": "مرحباً، استلمت طلبي اليوم ولكن المقاس طلع صغير جداً مقارنة بجدول المقاسات. هل بالإمكان استبداله بالمقاس الأكبر (L) دون دفع رسوم شحن إضافية؟",
        "status": "new",
        "category": "الاسترجاع والتبديل",
        "priority": "منخفضة",
        "ai_summary": "العميلة ترغب في استبدال مقاس المنتج بآخر أكبر مجاناً بسبب عدم ملائمة المقاس.",
        "ai_confidence": 91,
        "suggested_resolution": "إنشاء بوليصة استبدال مجانية وإرسالها للعميلة مع توجيه مندوب الاستلام، وحجز المقاس الجديد فوراً.",
        "ai_reasoning": "الحالة تقع ضمن سياسة الاستبدال المجاني خلال 14 يوماً. استُخدم هذا الإجراء في 45 حالة استبدال مطابقة.",
        "time_ago": "منذ 6 ساعات",
        "similar_cases": [
            {
                "historical_ticket_number": "#3042",
                "similarity_score": 94,
                "historical_summary": "طلب استبدال قطعة ملابس بمقاس أكبر بعد الاستلام بيوم.",
                "applied_solution": "إصدار بوليصة إرجاع مجانية وحجز المنتج البديل للشحن.",
                "resolved_ago": "قبل أسبوعين"
            }
        ]
    },
    {
        "ticket_number": "#4832",
        "customer_name": "خالد الغامدي",
        "customer_email": "khalid.gh@example.com",
        "order_number": "#55104",
        "order_date": "13 أكتوبر 2023",
        "channel": "البريد الإلكتروني",
        "original_message": "وصلتني الشحنة اليوم وعند فتح الصندوق وجدت المنتج الزجاجي مكسوراً بالكامل والتغليف الخارجي ممزق. مرفق لكم صور الكسر، أطالب بمنتج بديل سليم بأسرع وقت.",
        "status": "new",
        "category": "تلف المنتج",
        "priority": "مرتفعة",
        "ai_summary": "استلام منتج مكسور مع تلف في التغليف الخارجي للطلب وطلب شحن بديل سليم عاجل.",
        "ai_confidence": 98,
        "suggested_resolution": "اعتماد تعويض فوري وشحن منتج بديل مجاناً بدون انتظار استرجاع التالف، مع فتح بلاغ سوء مناولة لدى شركة الشحن.",
        "ai_reasoning": "بناءً على 18 حالة تلف أثناء الشحن، شحن البديل الفوري يرفع رضا العملاء بنسبة 98% ويقلل خسائر التقييمات.",
        "time_ago": "منذ يوم",
        "similar_cases": [
            {
                "historical_ticket_number": "#1950",
                "similarity_score": 97,
                "historical_summary": "استلام فازة زجاجية مهشمة داخل التغليف.",
                "applied_solution": "شحن قطعة بديلة فوراً وتقديم مطالبة تأمين ضد شركة الشحن.",
                "resolved_ago": "قبل شهر"
            }
        ]
    },
    {
        "ticket_number": "#4833",
        "customer_name": "فيصل الشمري",
        "customer_email": "faisal.sh@example.com",
        "order_number": "#55088",
        "order_date": "12 أكتوبر 2023",
        "channel": "البريد الإلكتروني",
        "original_message": "حاولت استخدام كود الخصم المعلن عنه في اليوم الوطني ولكن تظهر لي رسالة 'الكود غير صالح' على الرغم من أن قيمة السلة تتجاوز الحد الأدنى المطلوب.",
        "status": "resolved",
        "category": "العروض والخصومات",
        "priority": "منخفضة",
        "ai_summary": "كوبون الخصم الترويجي لا يطبق في صفحة الدفع رغم استيفاء الشروط.",
        "ai_confidence": 89,
        "suggested_resolution": "تفعيل الكوبون يدوياً على سلة العميل أو إنشاء كود خصم مخصص بنسبة 20% وإرساله للعميل عبر البريد.",
        "ai_reasoning": "تم حل 29 حالة مماثلة بنجاح عبر إصدار كود بديل فوري للمستخدم.",
        "time_ago": "منذ يومين",
        "similar_cases": [
            {
                "historical_ticket_number": "#2211",
                "similarity_score": 90,
                "historical_summary": "عطل في تطبيق كود خصم الحملة الإعلانية.",
                "applied_solution": "إصدار قسيمة تعويضية بقيمة الخصم مباشرة في الحساب.",
                "resolved_ago": "قبل شهر"
            }
        ]
    },
    {
        "ticket_number": "#4834",
        "customer_name": "ريهام الدوسري",
        "customer_email": "reham.d@example.com",
        "order_number": "#54992",
        "order_date": "11 أكتوبر 2023",
        "channel": "البريد الإلكتروني",
        "original_message": "أرغب في تعديل عنوان التوصيل لأنني انتقلت إلى منزل جديد في حي آخر قبل خروج الشحنة للتوزيع، يرجى التعديل سريعاً قبل التسليم.",
        "status": "in_progress",
        "category": "تأخر الطلب",
        "priority": "متوسطة",
        "ai_summary": "طلب تعديل عنوان التسليم قبل بدء المندوب في جولة التوزيع.",
        "ai_confidence": 93,
        "suggested_resolution": "تحديث العنوان على نظام الشحن والتواصل مع السائق المسؤول لتحويل مسار الشحنة وتأكيد العنوان الجديد مع العميل.",
        "ai_reasoning": "تم تطبيق هذا الحل في 52 حالة مماثلة بنجاح دون أي تأخير في موعد التسليم النهائي.",
        "time_ago": "منذ 3 أيام",
        "similar_cases": [
            {
                "historical_ticket_number": "#1188",
                "similarity_score": 93,
                "historical_summary": "تغيير موقع الاستلام للطلب قبل التوصيل بساعات.",
                "applied_solution": "تعديل إحداثيات الموقع في نظام التوصيل وإشعار المندوب.",
                "resolved_ago": "قبل أسبوعين"
            }
        ]
    }
]

SEED_KNOWLEDGE_ITEMS = [
    {
        "category": "تأخر الطلب",
        "title": "معالجة تأخر الشحنات وتحديث التتبع",
        "approved_solution": "التحقق من حالة الشحنة باستخدام رقم التتبع، ومتابعة شركة النقل ثم إرسال آخر موعد تسليم متوقع مع اعتذار رسمي.",
        "total_cases": 320,
        "usage_count": 287,
        "icon": "local_shipping",
        "icon_bg": "bg-primary-container text-on-primary-container"
    },
    {
        "category": "مشاكل الدفع",
        "title": "حل عمليات السحب المكررة والمعلقة",
        "approved_solution": "التحقق من بوابة الدفع وتأكيد العملية، ثم إلغاء العملية المكررة وإعادة المبلغ للبطاقة خلال 24-48 ساعة عمل.",
        "total_cases": 150,
        "usage_count": 142,
        "icon": "payment",
        "icon_bg": "bg-secondary-container text-on-secondary-container"
    },
    {
        "category": "الاسترجاع والتبديل",
        "title": "إجراءات استبدال المقاس والمنتجات السليمة",
        "approved_solution": "إصدار بوليصة استرجاع أو استبدال مجانية عبر شركة الشحن، وحجز القطعة البديلة للشحن فور تسليم المرتجع.",
        "total_cases": 210,
        "usage_count": 198,
        "icon": "published_with_changes",
        "icon_bg": "bg-tertiary-container text-on-tertiary-container"
    },
    {
        "category": "تلف المنتج",
        "title": "التعامل مع التلف والكسر أثناء الشحن",
        "approved_solution": "مراجعة صور التلف وشحن منتج بديل فوراً دون تأخير، مع فتح مطالبة تعويضية ضد شركة الشحن لسوء المناولة.",
        "total_cases": 95,
        "usage_count": 91,
        "icon": "broken_image",
        "icon_bg": "bg-error-container text-error"
    },
    {
        "category": "العروض والخصومات",
        "title": "أعطال أكواد وكوبونات الخصم",
        "approved_solution": "التحقق من صلاحية الحملة وإنشاء كود خصم ترويجي بديل مساوٍ في القيمة وإرساله عبر البريد الإلكتروني.",
        "total_cases": 80,
        "usage_count": 76,
        "icon": "loyalty",
        "icon_bg": "bg-surface-variant text-primary"
    }
]

def seed_database():
    """Populate database with initial realistic demo data"""
    init_db(force_recreate=True)
    conn = get_connection()
    cursor = conn.cursor()

    # Insert Knowledge Base Items
    for item in SEED_KNOWLEDGE_ITEMS:
        cursor.execute("""
            INSERT INTO knowledge_items (category, title, approved_solution, total_cases, usage_count, icon, icon_bg)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            item["category"],
            item["title"],
            item["approved_solution"],
            item["total_cases"],
            item["usage_count"],
            item["icon"],
            item["icon_bg"]
        ))

    # Insert Complaints & Similar Cases
    for comp in SEED_COMPLAINTS:
        cursor.execute("""
            INSERT INTO complaints (
                ticket_number, customer_name, customer_email, order_number, order_date,
                channel, original_message, status, category, priority,
                ai_summary, ai_confidence, suggested_resolution, ai_reasoning,
                final_resolution, action_taken, time_ago
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            comp["ticket_number"],
            comp["customer_name"],
            comp["customer_email"],
            comp["order_number"],
            comp["order_date"],
            comp["channel"],
            comp["original_message"],
            comp["status"],
            comp["category"],
            comp["priority"],
            comp["ai_summary"],
            comp["ai_confidence"],
            comp["suggested_resolution"],
            comp["ai_reasoning"],
            comp["suggested_resolution"] if comp["status"] == "resolved" else None,
            "approved" if comp["status"] == "resolved" else "pending",
            comp["time_ago"]
        ))
        complaint_id = cursor.lastrowid

        # Insert similar cases for this complaint
        for sc in comp.get("similar_cases", []):
            cursor.execute("""
                INSERT INTO similar_cases (complaint_id, historical_ticket_number, similarity_score, historical_summary, applied_solution, resolved_ago)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                complaint_id,
                sc["historical_ticket_number"],
                sc["similarity_score"],
                sc["historical_summary"],
                sc["applied_solution"],
                sc["resolved_ago"]
            ))

    conn.commit()
    conn.close()
    print("Database seeded successfully with realistic Arabic demo data!")

if __name__ == "__main__":
    seed_database()
