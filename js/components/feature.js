/**
 * FEATURES — one object per card. No category grouping anymore (removed
 * per feedback); this is a flat list. Add/remove features by editing
 * this array only — no other code changes needed.
 */

const FEATURES = [
  { title: 'Procedure', description: 'Document those step by step procedures. Get them out of your head and into the hands of your staff.' },
  { title: 'Policies', description: 'Keep your company policies alongside your procedures and processes. Directly link to policies from within procedures and processes.' },
  { title: 'Processes', description: 'Combine multiple procedures together to make an over-arching workflow.' },
  { title: 'Quizzes', description: "Quickly assess and enhance your team's grasp of company policies, processes and procedures." },
  { title: 'Assign and track tasks', description: 'Turn your procedures and processes into actionable tasks for your staff and teams to follow; track as every step is checked off until completion.' },
  { title: 'Teammates and Managers', description: 'Give every teammate the ability to suggest improvements and give managers the power to approve them.' },
  { title: 'Teams', description: 'Set up teams to reflect how your company runs. Restrict procedures, processes and policy access to just those team members.' },
  { title: 'Knowledge Base', description: 'Create beautiful public or private knowledge bases from the procedures and policies you already have. Hosted on your own domain.' },
  { title: 'Automatically write documents with Artificial Intelligence', description: 'Have policies and procedures tailored specifically for your situation; you just think of the document title, AI will do the rest.' },
  { title: 'Integrate with 1000+ apps', description: 'Connect with any other app directly via our API or through Zapier.' },
  { title: 'SCIM Integration', description: 'Effortlessly manage user identities and access with our SCIM integration.' },
  { title: 'Smart record your workflows direct to procedure', description: 'Transform every click into a streamlined smart procedure with our intuitive browser plugin.' },
  { title: 'Version history', description: 'See tracked highlighted changes for every change made to every procedure, process and policy. Roll back to any version at any time.' },
  { title: 'Process maps', description: 'Beautiful diagrams will bring your procedures to life, allowing you to visually explore every decision and step like never before.' },
  { title: 'Embed files and videos', description: 'Set your procedures, processes and policies apart from the rest with files, images and videos added to any step.' },
  { title: 'Collaborate in real time', description: 'Work as a team to update procedures, complete tasks, discuss changes and submit to a manager for approval.' },
  { title: 'Data Capture', description: 'Simple to use form builder to capture information as your team is filling out a task.' },
  { title: 'Two-Factor authentication', description: 'Keep access to your account locked down with two factor authentication.' },
  { title: 'Email and phone support', description: 'Let one of our team take a guided tour through SweetProcess; email or call us if you need any help.' },
  { title: 'Single Sign On', description: 'Use your existing single sign on system (SAML or Active Directory, email us if you have another) to give your team access to SweetProcess.' },
  { title: 'Image editor', description: 'Edit images and screenshots directly from within SweetProcess to draw arrows, add text, anything!' },
  { title: 'Print documents for offline viewing', description: 'Turn your SweetProcess procedures and policies into an offline manual — export to both PDF and Word format.' },
];

function renderFeatureCard(feature) {
  return `
    <div class="features-grid__card">
      <h5 class="features-grid__title">${feature.title}</h5>
      <p class="features-grid__desc">${feature.description}</p>
    </div>
  `;
}

const grid = document.querySelector('[data-features-grid]');
if (grid) {
  grid.innerHTML = FEATURES.map(renderFeatureCard).join('');
}