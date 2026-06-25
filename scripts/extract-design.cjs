/* One-shot generator: turns the Claude Design .dc.html into Next.js files. */
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];
const ROOT = path.resolve(__dirname, '..');
const raw = fs.readFileSync(SRC, 'utf8');
const obj = JSON.parse(raw);
const html = obj.content;

// --- style block (keyframes, resets, media queries) ---
const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');
const style = html.slice(styleStart + '<style>'.length, styleEnd).trim();

// --- body: the #ekRoot element ---
const bodyStart = html.indexOf('<div id="ekRoot"');
const bodyEnd = html.indexOf('</x-dc>');
let body = html.slice(bodyStart, bodyEnd).trim();
// point local image refs at /public/assets, real model at /public/models
body = body
  .replace(/src="assets\//g, 'src="/assets/')
  .replace(/data-lb="assets\//g, 'data-lb="/assets/');

// Inject a "Blog" link next to each "İletişim" (Contact) nav item — both the
// desktop nav and the mobile menu — reusing that item's own styling so it
// matches. Done here (not by hand) so it survives every design re-import.
{
  const re = /(<a href="#iletisim"[^>]*style="([^"]*)"[^>]*>İletişim<\/a>)/g;
  let count = 0;
  body = body.replace(re, (_m, fullTag, style) => {
    count++;
    return `${fullTag}<a href="/blog" data-en="Blog" style="${style}">Blog</a>`;
  });
  if (count === 0) console.warn('Blog nav link: no #iletisim anchors found to anchor on');
  else console.log('Blog nav link injected at', count, 'nav location(s)');
}

// --- props: defaults the DC runtime would inject as this.props ---
// (parsed from the dc <script>'s data-props schema so the design renders as authored)
function htmlUnescape(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
let propDefaults = {};
const dpMatch = html.match(/data-props="([^"]*)"/);
if (dpMatch) {
  try {
    const schema = JSON.parse(htmlUnescape(dpMatch[1]));
    for (const [k, v] of Object.entries(schema)) {
      if (k === '$preview') continue;
      if (v && typeof v === 'object' && 'default' in v) propDefaults[k] = v.default;
    }
  } catch (e) {
    console.warn('could not parse data-props:', e.message);
  }
}

// --- logic: the DCLogic component class -> plain class ---
const sStart = html.indexOf('class Component extends DCLogic');
const sEnd = html.indexOf('</script>', sStart);
let logic = html.slice(sStart, sEnd).trim();
logic = logic
  .replace('class Component extends DCLogic', 'class EKDesign')
  .replace("'assets/clipper.glb'", "'/models/clipper.glb'");

// --- write files ---
const designDir = path.join(ROOT, 'app', '_design');
fs.mkdirSync(designDir, { recursive: true });

fs.writeFileSync(
  path.join(designDir, 'markup.ts'),
  '// AUTO-GENERATED from Claude Design "Erdal Kara.dc.html". Do not edit by hand.\n' +
  'export const MARKUP = ' + JSON.stringify(body) + ';\n'
);

fs.writeFileSync(
  path.join(designDir, 'logic.ts'),
  '/* eslint-disable */\n// @ts-nocheck\n' +
  '// AUTO-GENERATED from Claude Design "Erdal Kara.dc.html". Do not edit by hand.\n' +
  'export function initDesign() {\n' +
  logic + '\n' +
  '  const __ek = new EKDesign();\n' +
  '  __ek.props = ' + JSON.stringify(propDefaults) + ';\n' +
  '  __ek.componentDidMount();\n' +
  '}\n'
);

fs.writeFileSync(
  path.join(designDir, 'design.css'),
  '/* AUTO-GENERATED from Claude Design "Erdal Kara.dc.html". */\n' + style + '\n'
);

console.log('markup.ts bytes:', JSON.stringify(body).length);
console.log('logic.ts bytes :', logic.length);
console.log('design.css bytes:', style.length);
console.log('OK');
