const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const TARGET_DIR = path.resolve(__dirname, '../public/images/features');
fs.mkdirSync(TARGET_DIR, { recursive: true });

const PHOTOS = [
  {
    slot: 'audience-institutes',
    filename: 'audience-institutes.webp',
    id: '8197551',
    photographer: 'Yan Krukau',
    profileUrl: 'https://www.pexels.com/@yankrukau/',
    pageUrl: 'https://www.pexels.com/photo/professor-standing-in-front-of-his-students-8197551/',
    downloadUrl: 'https://images.pexels.com/photos/8197551/pexels-photo-8197551.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Professor presenting course materials in front of university classroom students',
    alt: 'Training institute educator presenting lesson to academy students in classroom',
    width: 900,
    height: 600,
  },
  {
    slot: 'audience-coaches',
    filename: 'audience-coaches.webp',
    id: '14772072',
    photographer: 'Benjamin Dominguez',
    profileUrl: 'https://www.pexels.com/@benjamin-dominguez-284998877/',
    pageUrl: 'https://www.pexels.com/photo/man-sitting-at-a-desk-next-to-a-microphone-14772072/',
    downloadUrl: 'https://images.pexels.com/photos/14772072/pexels-photo-14772072.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Creator sitting at recording studio desk with microphone and headphones',
    alt: 'Creator recording educational course lesson at studio desk with microphone',
    width: 900,
    height: 600,
  },
  {
    slot: 'audience-corporate',
    filename: 'audience-corporate.webp',
    id: '7644071',
    photographer: 'MART PRODUCTION',
    profileUrl: 'https://www.pexels.com/@mart-production/',
    pageUrl: 'https://www.pexels.com/photo/woman-in-glasses-smiling-and-pointing-at-laptop-while-standing-near-colleagues-7644071/',
    downloadUrl: 'https://images.pexels.com/photos/7644071/pexels-photo-7644071.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Corporate team collaborating around laptop in office meeting',
    alt: 'Corporate team conducting employee onboarding and training session with laptop',
    width: 900,
    height: 600,
  },
  {
    slot: 'live-class-screen',
    filename: 'live-class-screen.webp',
    id: '8512131',
    photographer: 'Artem Podrez',
    profileUrl: 'https://www.pexels.com/@artempodrez/',
    pageUrl: 'https://www.pexels.com/photo/photo-of-a-woman-on-the-screen-of-a-laptop-8512131/',
    downloadUrl: 'https://images.pexels.com/photos/8512131/pexels-photo-8512131.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Live interactive video lecture on laptop screen',
    alt: 'Interactive live classroom video conference on laptop screen',
    width: 800,
    height: 520,
  },
  {
    slot: 'cohort-workshop',
    filename: 'cohort-workshop.webp',
    id: '17724731',
    photographer: 'Walls.io',
    profileUrl: 'https://www.pexels.com/@walls-io/',
    pageUrl: 'https://www.pexels.com/photo/colleagues-standing-by-whiteboard-17724731/',
    downloadUrl: 'https://images.pexels.com/photos/17724731/pexels-photo-17724731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Cohort bootcamp team collaborating around workshop whiteboard',
    alt: 'Cohort bootcamp learners collaborating during scheduled workshop session',
    width: 800,
    height: 520,
  },
  {
    slot: 'one-to-one-tutor',
    filename: 'one-to-one-tutor.webp',
    id: '35745569',
    photographer: 'Ahmet Kurt',
    profileUrl: 'https://www.pexels.com/@ahmetkurt/',
    pageUrl: 'https://www.pexels.com/photo/teacher-assisting-student-in-classroom-setting-35745569/',
    downloadUrl: 'https://images.pexels.com/photos/35745569/pexels-photo-35745569.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Teacher providing one-to-one tutoring and mentoring with laptop',
    alt: 'Tutor providing individual guidance to learner in 1-on-1 coaching session',
    width: 800,
    height: 520,
  },
  {
    slot: 'team-training-office',
    filename: 'team-training-office.webp',
    id: '8761327',
    photographer: 'Pavel Danilyuk',
    profileUrl: 'https://www.pexels.com/@pavel-danilyuk/',
    pageUrl: 'https://www.pexels.com/photo/man-in-black-blazer-having-a-presentation-8761327/',
    downloadUrl: 'https://images.pexels.com/photos/8761327/pexels-photo-8761327.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Corporate team training session in modern conference room',
    alt: 'Team training presentation for enterprise employee development',
    width: 800,
    height: 520,
  },
  {
    slot: 'learner-studying-ai',
    filename: 'learner-studying-ai.webp',
    id: '5537527',
    photographer: 'Zen Chung',
    profileUrl: 'https://www.pexels.com/@zen-chung/',
    pageUrl: 'https://www.pexels.com/photo/crop-multiethnic-students-with-laptop-studying-at-table-5537527/',
    downloadUrl: 'https://images.pexels.com/photos/5537527/pexels-photo-5537527.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Learner studying course lessons on laptop with notebook',
    alt: 'Student asking HelpDesk AI questions while studying on laptop',
    width: 800,
    height: 520,
  },
  {
    slot: 'course-checkout-browsing',
    filename: 'course-checkout-browsing.webp',
    id: '23496958',
    photographer: 'Vitaly Gariev',
    profileUrl: 'https://www.pexels.com/@vitaly-gariev/',
    pageUrl: 'https://www.pexels.com/photo/a-man-in-glasses-and-a-suit-is-sitting-at-a-table-with-a-laptop-23496958/',
    downloadUrl: 'https://images.pexels.com/photos/23496958/pexels-photo-23496958.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Student browsing course catalogue on modern laptop',
    alt: 'Student exploring course catalogue and checkout storefront on laptop',
    width: 800,
    height: 520,
  },
  {
    slot: 'branding-institute-desk',
    filename: 'branding-institute-desk.webp',
    id: '8092461',
    photographer: 'Kaboompics.com',
    profileUrl: 'https://www.pexels.com/@kaboompics/',
    pageUrl: 'https://www.pexels.com/photo/laptop-and-notebook-on-brown-wooden-table-8092461/',
    downloadUrl: 'https://images.pexels.com/photos/8092461/pexels-photo-8092461.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Academy administrator clean workspace with laptop and notebook',
    alt: 'Academy administrator workspace configured with custom domain and brand identity',
    width: 800,
    height: 520,
  },
  {
    slot: 'instructor-grading-review',
    filename: 'instructor-grading-review.webp',
    id: '6684360',
    photographer: 'Andy Barbour',
    profileUrl: 'https://www.pexels.com/@andy-barbour/',
    pageUrl: 'https://www.pexels.com/photo/a-person-holding-a-marker-6684360/',
    downloadUrl: 'https://images.pexels.com/photos/6684360/pexels-photo-6684360.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Instructor grading assignment submissions and adding feedback notes',
    alt: 'Instructor reviewing and grading course assignment submission',
    width: 800,
    height: 520,
  },
];

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: Status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading and optimizing 11 verified photos...');
  for (const item of PHOTOS) {
    console.log(`Downloading ${item.filename} from ${item.downloadUrl}...`);
    const buffer = await downloadFile(item.downloadUrl);
    const destPath = path.join(TARGET_DIR, item.filename);
    await sharp(buffer)
      .resize(item.width, item.height, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(destPath);
    const stat = fs.statSync(destPath);
    console.log(`✓ Saved ${item.filename} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
  console.log('All photos downloaded and optimized successfully!');
}

run().catch(err => {
  console.error('Error processing photos:', err);
  process.exit(1);
});
