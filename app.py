"""
Fahm (فَهم) Web Application & API Server
Built with Python standard library HTTP Server + SQLite.
"""
import http.server
import socketserver
import json
import urllib.parse
import os
import mimetypes
import sys
from datetime import datetime

# Import database and seed functions
from database import (
    init_db,
    get_all_complaints,
    get_complaint_by_id,
    approve_complaint_resolution,
    edit_complaint_resolution,
    escalate_complaint,
    get_knowledge_base,
    get_analytics_and_stats
)
from seed_data import seed_database

PORT = 8080
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend")

class FahmRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def _set_json_headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_json_headers(200)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)

        # Handle API Routes
        if path.startswith("/api/"):
            try:
                if path == "/api/stats":
                    stats = get_analytics_and_stats()
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "data": stats}, ensure_ascii=False).encode('utf-8'))
                    return

                elif path == "/api/complaints":
                    search = query_params.get("search", [None])[0]
                    status = query_params.get("status", [None])[0]
                    category = query_params.get("category", [None])[0]
                    complaints = get_all_complaints(search=search, status=status, category=category)
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "data": complaints}, ensure_ascii=False).encode('utf-8'))
                    return

                elif path.startswith("/api/complaints/"):
                    parts = path.strip("/").split("/")
                    if len(parts) == 3: # /api/complaints/<id>
                        complaint_id = parts[2]
                        complaint = get_complaint_by_id(complaint_id)
                        if complaint:
                            self._set_json_headers(200)
                            self.wfile.write(json.dumps({"success": True, "data": complaint}, ensure_ascii=False).encode('utf-8'))
                        else:
                            self._set_json_headers(404)
                            self.wfile.write(json.dumps({"success": False, "error": "الشكوى غير موجودة"}, ensure_ascii=False).encode('utf-8'))
                        return

                elif path == "/api/knowledge-base":
                    search = query_params.get("search", [None])[0]
                    category = query_params.get("category", [None])[0]
                    items = get_knowledge_base(search=search, category=category)
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "data": items}, ensure_ascii=False).encode('utf-8'))
                    return

                elif path == "/api/analytics":
                    analytics = get_analytics_and_stats()
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "data": analytics}, ensure_ascii=False).encode('utf-8'))
                    return

                else:
                    self._set_json_headers(404)
                    self.wfile.write(json.dumps({"success": False, "error": "المسار غير موجود"}, ensure_ascii=False).encode('utf-8'))
                    return

            except Exception as e:
                self._set_json_headers(500)
                self.wfile.write(json.dumps({"success": False, "error": str(e)}, ensure_ascii=False).encode('utf-8'))
                return

        # Serve SPA Index for frontend routes
        if path == "/" or not os.path.exists(os.path.join(FRONTEND_DIR, path.lstrip("/"))):
            if "." not in path:
                self.path = "/index.html"

        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else "{}"
        try:
            data = json.loads(body) if body else {}
        except Exception:
            data = {}

        if path.startswith("/api/"):
            try:
                # 1. Approve Resolution
                if path.endswith("/approve") and "/api/complaints/" in path:
                    parts = path.strip("/").split("/")
                    complaint_id = int(parts[2])
                    updated = approve_complaint_resolution(complaint_id)
                    if updated:
                        self._set_json_headers(200)
                        self.wfile.write(json.dumps({"success": True, "data": updated, "message": "تم اعتماد الحل بنجاح"}, ensure_ascii=False).encode('utf-8'))
                    else:
                        self._set_json_headers(404)
                        self.wfile.write(json.dumps({"success": False, "error": "الشكوى غير موجودة"}, ensure_ascii=False).encode('utf-8'))
                    return

                # 2. Edit Resolution
                elif path.endswith("/edit") and "/api/complaints/" in path:
                    parts = path.strip("/").split("/")
                    complaint_id = int(parts[2])
                    resolution = data.get("resolution", "")
                    if not resolution:
                        self._set_json_headers(400)
                        self.wfile.write(json.dumps({"success": False, "error": "نص الحل مطلوب للتعديل"}, ensure_ascii=False).encode('utf-8'))
                        return
                    updated = edit_complaint_resolution(complaint_id, resolution)
                    if updated:
                        self._set_json_headers(200)
                        self.wfile.write(json.dumps({"success": True, "data": updated, "message": "تم تعديل الحل واعتماده بنجاح"}, ensure_ascii=False).encode('utf-8'))
                    else:
                        self._set_json_headers(404)
                        self.wfile.write(json.dumps({"success": False, "error": "الشكوى غير موجودة"}, ensure_ascii=False).encode('utf-8'))
                    return

                # 3. Escalate
                elif path.endswith("/escalate") and "/api/complaints/" in path:
                    parts = path.strip("/").split("/")
                    complaint_id = int(parts[2])
                    reason = data.get("reason", "يحتاج إلى مراجعة إشرافية خاصة")
                    updated = escalate_complaint(complaint_id, reason)
                    if updated:
                        self._set_json_headers(200)
                        self.wfile.write(json.dumps({"success": True, "data": updated, "message": "تم تصعيد الشكوى بنجاح"}, ensure_ascii=False).encode('utf-8'))
                    else:
                        self._set_json_headers(404)
                        self.wfile.write(json.dumps({"success": False, "error": "الشكوى غير موجودة"}, ensure_ascii=False).encode('utf-8'))
                    return

                # 4. Reset Demo Data
                elif path == "/api/reset-demo":
                    seed_database()
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "message": "تمت إعادة ضبط البيانات بنجاح"}, ensure_ascii=False).encode('utf-8'))
                    return

                else:
                    self._set_json_headers(404)
                    self.wfile.write(json.dumps({"success": False, "error": "المسار غير صالح"}, ensure_ascii=False).encode('utf-8'))
                    return

            except Exception as e:
                self._set_json_headers(500)
                self.wfile.write(json.dumps({"success": False, "error": str(e)}, ensure_ascii=False).encode('utf-8'))
                return


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

def start_server(port=PORT):
    # Ensure database is seeded if not exists
    db_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fahm.db")
    if not os.path.exists(db_file):
        print("Database not found. Seeding initial data...")
        seed_database()

    server_address = ('', port)
    httpd = ThreadingHTTPServer(server_address, FahmRequestHandler)
    print(f"==================================================")
    print(f"  منصة فَهم (Fahm) - خادم التطبيق يعمل بنجاح")
    print(f"  الرابط المحلي: http://localhost:{port}")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nإيقاف الخادم...")
        httpd.server_close()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    start_server(port)
