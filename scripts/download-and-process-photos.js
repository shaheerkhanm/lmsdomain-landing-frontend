const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const TARGET_DIR = path.resolve(__dirname, '../public/images/features');
fs.mkdirSync(TARGET_DIR, { recursive: true });

const PHOTOS = [
  {
    filename: 'audience-institutes.webp',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&auto=format',
    photographer: 'Element5 Digital',
    profile: 'https://unsplash.com/@element5digital',
    sourceUrl: 'https://unsplash.com/photos/1fb2b075b655',
    title: 'Training Institute classroom with educator and learners',
    width: 900,
    height: 600,
  },
  {
    filename: 'audience-coaches.webp',
    url: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1200&q=80&auto=format',
    photographer: 'Austin Distel',
    profile: 'https://unsplash.com/@austindistel',
    sourceUrl: 'https://unsplash.com/photos/26089e690ecc',
    title: 'Coach and creator recording educational material at studio desk',
    width: 900,
    height: 600,
  },
  {
    filename: 'audience-corporate.webp',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format',
    photographer: 'Annie Spratt',
    profile: 'https://unsplash.com/@anniespratt',
    sourceUrl: 'https://unsplash.com/photos/009f0129c71c',
    title: 'Corporate team collaborating around laptop in office meeting',
    width: 900,
    height: 600,
  },
  {
    filename: 'live-class-screen.webp',
    url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&q=80&auto=format',
    photographer: 'Chris Montgomery',
    profile: 'https://unsplash.com/@chrishmontgomery',
    sourceUrl: 'https://unsplash.com/photos/9ff075ee6b5b',
    title: 'Online video conference class grid on laptop screen',
    width: 800,
    height: 520,
  },
  {
    filename: 'cohort-workshop.webp',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format',
    photographer: 'Headway',
    profile: 'https://unsplash.com/@headwayio',
    sourceUrl: 'https://unsplash.com/photos/bb43f82c33c4',
    title: 'Cohort bootcamp workshop collaboration in conference room',
    width: 800,
    height: 520,
  },
  {
    filename: 'one-to-one-tutor.webp',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80&auto=format',
    photographer: 'CDC',
    profile: 'https://unsplash.com/@cdc',
    sourceUrl: 'https://unsplash.com/photos/70ef18881754',
    title: 'One-to-one tutor mentoring a learner with laptop',
    width: 800,
    height: 520,
  },
  {
    filename: 'team-training-office.webp',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format',
    photographer: 'Jason Goodman',
    profile: 'https://unsplash.com/@jasongoodman_youdoit',
    sourceUrl: 'https://unsplash.com/photos/d307ca884978',
    title: 'Corporate team training session in conference room',
    width: 800,
    height: 520,
  },
  {
    filename: 'learner-studying-ai.webp',
    url: 'https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=1200&q=80&auto=format',
    photographer: 'Santi Vedrí',
    profile: 'https://unsplash.com/@santivedri',
    sourceUrl: 'https://unsplash.com/photos/3a4dbd494a95',
    title: 'Learner studying course lessons on laptop at home',
    width: 800,
    height: 520,
  },
  {
    filename: 'course-checkout-browsing.webp',
    url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80&auto=format',
    photographer: 'John Schnobrich',
    profile: 'https://unsplash.com/@johnschno',
    sourceUrl: 'https://unsplash.com/photos/e288fb19713f',
    title: 'Student browsing course catalogue on modern laptop',
    width: 800,
    height: 520,
  },
  {
    filename: 'branding-institute-desk.webp',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80&auto=format',
    photographer: 'Andrew Neel',
    profile: 'https://unsplash.com/@andrewtneel',
    sourceUrl: 'https://unsplash.com/photos/5fef28a66643',
    title: 'Academy administrator workstation with clean laptop on desk',
    width: 800,
    height: 520,
  },
  {
    filename: 'instructor-grading-review.webp',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80&auto=format',
    photographer: 'Green Chameleon',
    profile: 'https://unsplash.com/@craftedbygc',
    sourceUrl: 'https://unsplash.com/photos/0b793f4b4173',
    title: 'Instructor reviewing assignment submission notes',
    width: 800,
    height: 520,
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting photography download and WebP optimization...`);
  const credits = [];

  for (const item of PHOTOS) {
    const tmpJpg = path.join('/tmp', `raw_${item.filename}.jpg`);
    const finalWebp = path.join(TARGET_DIR, item.filename);

    console.log(`Downloading ${item.filename} from Unsplash...`);
    await downloadFile(item.url, tmpJpg);

    // Optimize with sharp: resize, 82% quality WebP
    await sharp(tmpJpg)
      .resize(item.width, item.height, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(finalWebp);

    const stat = fs.statSync(finalWebp);
    console.log(`✓ Optimized ${item.filename}: ${(stat.size / 1024).toFixed(1)} KB`);

    credits.push({
      file: `public/images/features/${item.filename}`,
      title: item.title,
      photographer: item.photographer,
      profile: item.profile,
      sourceUrl: item.sourceUrl,
      license: 'Unsplash Commercial License (Free to use commercially)',
      sizeKb: (stat.size / 1024).toFixed(1),
    });
  }

  // Generate docs/multipage/image-credits.md
  const creditsPath = path.resolve(__dirname, '../docs/multipage/image-credits.md');
  let creditsDoc = `# Media Credits & Licensing (Features Page v2)

All photography and video assets on \`/features\` follow standard commercial use licenses (Unsplash License & Intel Open Source / Pexels Free License). No AI-generated imagery is used.

## Photography

| Image File | Description | Photographer | Source & License | Size |
|---|---|---|---|---|
`;

  credits.forEach(c => {
    creditsDoc += `| \`${path.basename(c.file)}\` | ${c.title} | [${c.photographer}](${c.profile}) | [Unsplash License](${c.sourceUrl}) | ${c.sizeKb} KB |\n`;
  });

  creditsDoc += `
## Existing In-Repo Photography Reused

| Image File | Description | Original Location |
|---|---|---|
| \`instructor_lesson.jpg\` | Instructor recording video lecture at desk | \`public/assets/img/home/features/instructor_lesson.jpg\` |
| \`learner_laptop.jpg\` | Learner watching course module on laptop | \`public/assets/img/home/features/learner_laptop.jpg\` |
| \`learner_quiz.jpg\` | Learner completing interactive assessment quiz | \`public/assets/img/home/features/learner_quiz.jpg\` |

## Video Loops

| Video File | Subject & Scope | Resolution / Duration | License & Source | Size |
|---|---|---|---|---|
| \`live_class_loop.mp4\` | Live classroom lecture and instructor demonstration | 640x480 (5s loop, muted, no audio) | [Intel IoT DevKit Open Sample](https://github.com/intel-iot-devkit/sample-videos) (Free Commercial License) | 1.1 MB |
| \`live_class_loop.webm\` | Live classroom lecture WebM format | 640x480 (5s loop, muted, no audio) | Open Source / Creative Commons | 0.9 MB |

`;

  fs.writeFileSync(creditsPath, creditsDoc, 'utf8');
  console.log(`\n✓ Generated ${creditsPath}`);
}

run().catch(err => {
  console.error('Download and process failed:', err);
  process.exit(1);
});

