# Arabic with Your Name — Website (Version 2)

**Learn Arabic. Connect with the Culture.**

A responsive, single-page website for online Arabic group lessons:

- Modern Standard Arabic (MSA) and Moroccan Darija courses
- Separate groups for children (6–12), teenagers (13–17) and adults (18+)
- Beginner, intermediate and advanced levels
- Pricing with a monthly / pay-per-lesson switch
- WhatsApp registration and a floating WhatsApp chat button
- Teacher profile, FAQ and a registration form

It is plain HTML, CSS and JavaScript, so there is nothing to install or build.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content (all sections) |
| `styles.css` | Design, colours and responsive layout |
| `script.js` | **Settings (`CONFIG`)**, pricing, WhatsApp, registration form, mobile menu |
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
2. **Settings in `script.js`**: the `CONFIG` block at the top holds everything below:
   - `email`: where email enquiries go (also update the `mailto:` link in `index.html`).
   - `whatsappNumber`: your WhatsApp number in international format, **digits only**
     (no `+`, spaces or leading `0`), e.g. `"212612345678"` for a Moroccan number.
     Until it is set, the WhatsApp buttons ask visitors to use email instead.
   - `pricing`: currency, lessons per month, and the monthly and per-lesson price and lesson length
     for each age group. **The prices shipped are examples only.** The "per lesson" and "save %"
     figures under the monthly prices are calculated automatically.
3. **Teacher profile**: update the biography, `[X] years of teaching experience` and `[Degree / teaching qualification]`.
4. **Photo** (optional): add `images/teacher.jpg` and replace the placeholder inside `.teacher-photo` with
   `<img src="images/teacher.jpg" alt="Your Name, Arabic teacher" />`.
5. **Age ranges / FAQ / pricing text**: adjust to match how you run your classes.

## 3. How registration works

The form has two buttons:

- **Register via WhatsApp** opens WhatsApp (app or WhatsApp Web) with a ready-written message to your
  number containing the student's name, email, course, age group, level, payment option and notes.
  The student only has to press send.
- **Send by email** opens the student's email app with the same details addressed to you.

"Choose this plan" on a pricing card fills in the age group and payment option on the form.
The round green button in the bottom-right corner opens a general WhatsApp chat with you.

Registrations are not stored on a server yet; they arrive in your WhatsApp or inbox.

### Offering only one pricing model

If you decide on just monthly or just per-lesson pricing, delete the `<div class="billing-toggle">…</div>`
block in `index.html`. Monthly prices are then shown. To show per-lesson prices only, also change
`let billing = "monthly";` to `let billing = "lesson";` in `script.js`. Remove the unused option from the
"Payment option" list in the form too.

## 4. Publish for free

**GitHub Pages**
1. Push these files to the repository's default branch.
2. Go to *Settings → Pages*, choose *Deploy from a branch*, select the branch and `/ (root)`.
3. Your site will be available at `https://<username>.github.io/<repository>/`.

**Netlify**
1. Sign in at netlify.com and choose *Add new site → Import an existing project* (or drag and drop the folder).
2. No build command is needed; the publish directory is the project root.

A custom domain (for example `arabicwithyourname.com`) can be connected to either service later.

## Roadmap

Done in Version 2: pricing (monthly and per lesson), WhatsApp registration and chat button.

Next:
- Professional teacher profile with photo and credentials
- Stored registrations (e.g. Netlify Forms, Formspree or Google Sheets)
- Online payment (e.g. Stripe or PayPal payment links)
- Custom domain
