# 🚀 **Backend Deployment**

## **1️⃣ System Preparation**

### 1.1. Masuk ke VPS dengan Putty

### 1.2. Update system

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.3. Install Apache, Git, Node.js, PM2

#### Install Apache & Git

```bash
sudo apt install apache2 git -y
```

#### Install Node.js & npm

Cek apakah node js terinstall

```bash
node -v && npm -v
```

Seharusnya akan tampil versi nodejs dan npm yang sedang digunakan, jika ada error install dulu dengan perintah berikut

```bash
sudo apt install nodejs npm -y
```

#### Install PM2 (global)

```bash
sudo npm install -g pm2
```

## **2️⃣ Clone & Setup Backend App**

### 2.1. Buat direktori backend

```bash
sudo mkdir -p /backend-apps/
cd /backend-apps/
```

### 2.2. Clone repo

```bash
sudo git clone https://github.com/agustinrahmawati03/nutrify-server.git nutrisiku-be
```

> (Ganti `https://github.com/username/repo.git` dengan repo kamu)

### 2.3. Install dependencies

```bash
cd nutrisiku-be
sudo npm install
```

### 2.4. Jalankan dengan PM2

Misal server kamu pakai `server.js`:

```bash
pm2 start server.js --name "nutrisiku-be"
```

### 2.5. Set PM2 agar auto start saat reboot

```bash
pm2 startup
pm2 save
```

---

## **3️⃣ Apache Reverse Proxy Config**

### 3.1. Enable Apache proxy modules

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod rewrite
```

### 3.2. Buat VirtualHost config

Buat file baru:

```bash
sudo nano /etc/apache2/sites-available/api.nutrisiku.my.id.conf
```

Isi:

```apache
<VirtualHost *:80>
    ServerName api.nutrisiku.my.id
    ServerAlias www.api.nutrisiku.my.id

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:10000/
    ProxyPassReverse / http://127.0.0.1:10000/

    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://127.0.0.1:10000/$1" [P,L]

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

#### **Catatan keluar dari nano**

##### Metode 1: Save then exit

`Ctrl + O`, kemudian klik `Enter` ketika memastikan nama file. Terakhir, untuk keluar gunakan perintah `Ctrl + X`

##### Metode 2: Exit, sistem konfirmasi keluar

`Ctrl + X` , kemudian sistem memastikan apakah mau simpan perubahan atau tidak. Maka klik `y`, kemudian klik `Enter`, terakhir sistem juga memastikan nama file tinggal klik `Enter` sekali lagi

---

3.3. Enable site & reload Apache

```bash
sudo a2ensite api.nutrisiku.my.id.conf
sudo systemctl reload apache2
```

---

## **4️⃣ Install SSL dengan Certbot**

### 4.1. Install Certbot Apache plugin

```bash
sudo apt install certbot python3-certbot-apache -y
```

### 4.2. Jalankan Certbot untuk domain backend

```bash
sudo certbot --apache -d api.nutrisiku.my.id -d www.api.nutrisiku.my.id
```

### 4.3. Test SSL renewal

```bash
sudo certbot renew --dry-run
```

---

## ✅ **SELESAI**

Sekarang API kamu live di `https://api.nutrisiku.my.id` via Apache Reverse Proxy + SSL.

---

## 🔧 **Optional Tips:**

- Pastikan Express listen di port 10000:

```javascript
app.listen(10000, () => console.log('Server running on port 10000'));
```

- Jika perlu log PM2:

```bash
pm2 logs nutrisiku-be
```

---
