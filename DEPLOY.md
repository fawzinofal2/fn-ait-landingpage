# دليل النشر — fn-ait على السيرفر (46.224.56.254:1502)

هذا الموقع يُنشر كحاوية Docker على نفس السيرفر والـ IP المستخدم لـ `ai.fn-ait.com`، لكن على المنفذ **1502** (بدل 1500)، عبر GitHub Actions تلقائيًا مع كل push على فرع `main`.

## 1) تجهيز السيرفر (مرة واحدة فقط)

على السيرفر (عبر SSH):

```bash
# تأكد من تثبيت Docker + Docker Compose plugin
docker --version
docker compose version

# اختر مجلد للنشر (يمكنك اختيار مسار آخر، لكن يجب أن يطابق سر DEPLOY_PATH لاحقًا)
sudo mkdir -p /opt/fn-ait-web
sudo chown $USER:$USER /opt/fn-ait-web
git clone <رابط-مستودع-GitHub> /opt/fn-ait-web
cd /opt/fn-ait-web

# أول تشغيل يدوي (يطبّق المايغريشن + يزرع بيانات Puzzloop تلقائيًا، ثم يشغّل الموقع)
docker compose up -d --build
```

بعد نجاح هذا الأمر يكون الموقع يعمل محليًا على السيرفر على `http://127.0.0.1:1502`.

**افتح المنفذ 1502** في جدار الحماية إذا لزم:

```bash
sudo ufw allow 1502/tcp
```

## 2) ربط دومين (اختياري، لكن موصى به — تمامًا متل ai.fn-ait.com على 1500)

إذا كان السيرفر يستخدم Nginx كـ reverse proxy (كما هو مفترض من إعداد `ai.fn-ait.com`)، أضف ملف إعداد مشابه:

```nginx
server {
    listen 80;
    server_name fn-ait.com www.fn-ait.com;

    location / {
        proxy_pass http://127.0.0.1:1502;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

ثم فعّل شهادة TLS (مثلًا عبر `certbot --nginx -d fn-ait.com -d www.fn-ait.com`).

> ملاحظة: هذا مثال عام لأني لا أملك إمكانية الاطلاع فعليًا على إعداد Nginx الحالي لـ `ai.fn-ait.com` على سيرفرك — عدّل أسماء السيرفر والمسارات حسب إعدادك الفعلي.

## 3) إعداد GitHub Actions للنشر التلقائي

أضف الأسرار التالية في المستودع (Settings → Secrets and variables → Actions):

| اسم السر | القيمة |
|---|---|
| `SSH_HOST` | `46.224.56.254` |
| `SSH_USERNAME` | اسم مستخدم SSH على السيرفر |
| `SSH_PRIVATE_KEY` | المفتاح الخاص (private key) الذي يقابل مفتاحًا عامًا مضافًا إلى `~/.ssh/authorized_keys` لهذا المستخدم على السيرفر، وله صلاحية تشغيل Docker |
| `SSH_PORT` | منفذ SSH إن لم يكن 22 (اختياري) |
| `DEPLOY_PATH` | مسار المشروع على السيرفر، مثلًا `/opt/fn-ait-web` |

بعد إضافة الأسرار، أي `push` على `main` سينفّذ `.github/workflows/deploy.yml` تلقائيًا:

1. **build-check**: يتأكد أن المشروع يُبنى بنجاح (`npm run build`) قبل أي نشر.
2. **deploy**: يتصل بالسيرفر عبر SSH وينفّذ `git pull` ثم `docker compose up -d --build` في `DEPLOY_PATH`، ثم يتحقق أن `http://localhost:1502` يستجيب.

## 4) قاعدة البيانات وبياناتها

- قاعدة بيانات SQLite تُخزَّن في مجلد `./data` على السيرفر (مربوط كـ volume في `docker-compose.yml`)، وتبقى محفوظة بين عمليات النشر المتتالية.
- عند إضافة تطبيق جديد: عدّل `prisma/seed.ts` وادفع (`push`) إلى `main` — سيُعاد تشغيل خطوة `migrate` تلقائيًا وتُدرَج بيانات التطبيق الجديد (باستخدام `upsert`، فلن تتكرر البيانات ولن تُفقد التعديلات السابقة).
- لعمل نسخة احتياطية: انسخ ملف `./data/prod.db` من السيرفر بشكل دوري.

## 5) أوامر مفيدة على السيرفر

```bash
cd /opt/fn-ait-web

docker compose logs -f web        # متابعة سجلات الموقع
docker compose logs migrate       # التأكد من نجاح آخر مايغريشن/seed
docker compose ps                 # حالة الحاويات
docker compose restart web        # إعادة تشغيل الموقع فقط
docker compose down && docker compose up -d --build   # إعادة بناء كاملة
```
