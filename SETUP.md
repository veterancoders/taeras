# Local Setup — Taeras

## What was broken

`package.json` had:
```json
"proxy": "http://localhost:3001"
```
Your React dev server runs **on** port 3001, so it was proxying every unmatched request (`/api/waitlist.php`, `/api/contact.php`, `/api/survey.php`) **to itself**. Each hop stacked more headers onto the request until it blew past the header size limit — that's the `431 Request Header Fields Too Large`. This has been fixed to:
```json
"proxy": "http://localhost"
```
which points at Apache (XAMPP) on the default port 80 instead.

This is a **dev-only** problem. On a live server there's no separate dev server/proxy at all — Apache serves the built React files and executes the PHP files from the exact same origin, so this class of error can't happen in production. It only exists because `npm start` and PHP are two different processes locally.

## 1. Database setup (run once)

1. In the XAMPP control panel, start **Apache** and **MySQL**.
2. Open `http://localhost/phpmyadmin`.
3. Create a database named `taeras`.
4. Run this SQL inside it (also documented in `public/api/connect.php`):

```sql
CREATE TABLE waitlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(128),
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_us (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  type VARCHAR(128),
  country VARCHAR(128),
  message TEXT,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE survey_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  full_name VARCHAR(255),
  founders_circle VARCHAR(64),
  responses JSON NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

`connect.php` uses `root` with no password (XAMPP's default) against the `taeras` database — update `public/api/connect.php` if your MySQL credentials differ.

## 2. Serving the PHP files locally

The frontend calls relative paths like `fetch('api/waitlist.php')`. The React dev server (`npm start`) can't execute PHP itself — only Apache can — so the PHP files need to actually exist somewhere Apache serves, and the `proxy` setting forwards to that.

Copy (or keep in sync) the `public/api/` folder into XAMPP's web root:

```
C:\xampp\htdocs\api\connect.php
C:\xampp\htdocs\api\contact.php
C:\xampp\htdocs\api\waitlist.php
C:\xampp\htdocs\api\survey.php
```

So that `http://localhost/api/waitlist.php` responds directly from Apache. Since `package.json`'s proxy is `http://localhost`, any request the dev server doesn't recognize as a frontend route gets forwarded there automatically.

**Re-copy this folder any time you edit a `.php` file** — there's no symlink in place (creating one requires an elevated/admin PowerShell session: `New-Item -ItemType SymbolicLink -Path "C:\xampp\htdocs\api" -Target "<repo>\public\api"`, run that once from an admin prompt if you'd rather not re-copy manually).

## 3. Running it

1. XAMPP Control Panel → start **Apache** + **MySQL**.
2. Confirm `C:\xampp\htdocs\api\*.php` exists (step 2 above).
3. In the project folder: `npm start`
4. Open whatever port CRA prints (e.g. `http://localhost:3001`) — the waitlist/contact/survey forms will now proxy through to Apache/MySQL correctly.

## 4. Deploying to a live server

Run:
```
npm run build
```
Upload the entire contents of `build/` (this includes `build/api/*.php`, since CRA copies everything under `public/` verbatim) to your server's document root. No `proxy` setting is needed or used in production — the built `index.html`/JS and the PHP files are served by the same web server on the same origin, so `fetch('api/waitlist.php')` just works. Just make sure the production database credentials in `connect.php` are updated before upload, and that the same three tables exist on the live MySQL database.
