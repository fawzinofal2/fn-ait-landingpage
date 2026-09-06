# دليل النشر — fn-ait على السيرفر (46.224.56.254:14255)

هذا الموقع يُنشر كحاوية Docker على نفس السيرفر والـ IP المستخدم لـ `ai.fn-ait.com`، لكن على المنفذ **14255**، عبر GitHub Actions تلقائيًا مع كل push على فرع `main`، وسيُربط بالدومين **play.fn-ait.com**.

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

بعد نجاح هذا الأمر يكون الموقع يعمل محليًا على السيرفر على `http://127.0.0.1:14255`.

إذا كان لديك جدار حماية (ufw) مفعّل على السيرفر، **لا داعي لفتح المنفذ 14255 للخارج** ما دام Caddy هو من سيستقبل الطلبات من الإنترنت ويوجّهها داخليًا (`reverse_proxy`) — يكفي أن يكون المنفذ متاحًا على `127.0.0.1` فقط، وهذا افتراضي مع Docker.

## 2) ربط الدومين play.fn-ait.com عبر Caddy

بما إنو عندك مشروع منفصل بيتحكم بإعدادات Caddy لكل السبدومينات (متل `ai.fn-ait.com`)، ضيف هالبلوك لملف الـ `Caddyfile` تبعو:

```caddyfile
play.fn-ait.com {
    reverse_proxy 127.0.0.1:14255
}
```

Caddy رح يتكفّل تلقائيًا بشهادة TLS (Let's Encrypt) لدومين `play.fn-ait.com` بمجرد ما تعيد تحميل/تشغيل Caddy:

```bash
caddy reload --config /path/to/Caddyfile
# أو حسب طريقة تشغيله عندك (systemd service, docker container...الخ)
```

> ملاحظة: تأكد إنو DNS تبع `play.fn-ait.com` مشير (A record) لنفس IP السيرفر `46.224.56.254` قبل ما Caddy يقدر يصدر الشهادة.

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
2. **deploy**: يتصل بالسيرفر عبر SSH وينفّذ `git pull` ثم `docker compose up -d --build` في `DEPLOY_PATH`، ثم يتحقق أن `http://localhost:14255` يستجيب.

هالخطوة ما بتلمس ملف Caddy تبع المشروع المتحكم — هيدا لازم تضيفه أنت مرة وحدة يدويًا متل ما هو موضّح فوق (لأنو مو جزء من هالمستودع).

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
