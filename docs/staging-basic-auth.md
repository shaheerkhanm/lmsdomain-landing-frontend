# Staging HTTP Basic Authentication Guide

This document describes how to configure Nginx to password-protect the staging environment (`staging.lmsdomain.online`) using HTTP Basic Authentication, ensuring staging is not accessible to unauthorized visitors or search crawlers.

> [!NOTE]
> **Do NOT commit real credentials.** This is a reference guide only. Keep the `.well-known` ACME challenge location open so SSL certificates (Let's Encrypt / Certbot) renew automatically.

---

## 1. Create the `.htpasswd` File

Run the `htpasswd` command to generate the credentials file with an initial user (replace `<staging_user>` with your desired username):

```bash
sudo htpasswd -c /etc/nginx/.htpasswd-staging <staging_user>
```

You will be prompted to enter and confirm a password. Ensure the file has appropriate read permissions for the Nginx worker process:

```bash
sudo chown www-data:www-data /etc/nginx/.htpasswd-staging
sudo chmod 640 /etc/nginx/.htpasswd-staging
```

---

## 2. Nginx Server Configuration

In your staging server block configuration file (e.g. `/etc/nginx/sites-available/staging.lmsdomain.online`):

```nginx
server {
    listen 443 ssl http2;
    server_name staging.lmsdomain.online;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/staging.lmsdomain.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/staging.lmsdomain.online/privkey.pem;

    # Protect the entire staging site with HTTP Basic Auth
    auth_basic "Staging";
    auth_basic_user_file /etc/nginx/.htpasswd-staging;

    # Exception 1: Allow Let's Encrypt ACME challenges without basic auth for certificate renewals
    location ^~ /.well-known/acme-challenge/ {
        auth_basic off;
        default_type "text/plain";
        root /var/www/certbot;
    }

    # Exception 2: Allow search engine robots to read robots.txt (which serves disallow all)
    location = /robots.txt {
        auth_basic off;
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Proxy all traffic to the Next.js production server
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 3. Verify and Reload

Verify the Nginx configuration syntax before reloading:

```bash
sudo nginx -t
```

If the test is successful, reload Nginx:

```bash
sudo systemctl reload nginx
```
