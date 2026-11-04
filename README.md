# Arabic with Your Name — Website (Version 1)

**Learn Arabic. Connect with the Culture.**

A responsive, single-page website for online Arabic group lessons:

- Modern Standard Arabic (MSA) and Moroccan Darija courses
- Separate groups for children (6–12), teenagers (13–17) and adults (18+)
- Beginner, intermediate and advanced levels
- Teacher profile, FAQ and a registration form

It is plain HTML, CSS and JavaScript, so there is nothing to install or build.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content (all sections) |
| `styles.css` | Design, colours and responsive layout |
| `script.js` | Mobile menu, registration form, scroll effects |
| `README.md` | This setup guide |

## 1. Preview locally

Open `index.html` in any browser. Or run a small local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 2. Personalise before publishing

Search the files for `PERSONALISE` and `Your Name`:

1. **Your name**: replace every `Your Name` in `index.html` (title, header, teacher section, footer).
2. **Email**: set `email` in the `CONFIG` object at the top of `script.js`, and the `mailto:` link in `index.html`.
3. **Teacher profile**: update the biography, `[X] years of teaching experience` and `[Degree / teaching qualification]`.
4. **Photo** (optional): add `images/teacher.jpg` and replace the placeholder inside `.teacher-photo` with
   `<img src="images/teacher.jpg" alt="Your Name, Arabic teacher" />`.
5. **Age ranges / FAQ / pricing text**: adjust to match how you run your classes.

## 3. How the registration form works

When a student submits the form, the site checks the required fields and then opens the student's
email app with a pre-filled enquiry addressed to you. **Registrations are not stored automatically yet.**
This is planned for Version 2 (see below).

## 4. Publish for free

**GitHub Pages**
1. Push these files to the repository's default branch.
2. Go to *Settings → Pages*, choose *Deploy from a branch*, select the branch and `/ (root)`.
3. Your site will be available at `https://<username>.github.io/<repository>/`.

**Netlify**
1. Sign in at netlify.com and choose *Add new site → Import an existing project* (or drag and drop the folder).
2. No build command is needed; the publish directory is the project root.

A custom domain (for example `arabicwithyourname.com`) can be connected to either service later.

## Roadmap — Version 2

- Professional teacher profile with photo and credentials
- Course pricing (monthly subscription or per lesson)
- WhatsApp registration / contact button
- Stored registrations (e.g. Netlify Forms, Formspree or Google Sheets)
- Custom domain
