#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

const COPY_EXCLUDES = new Set([
  'node_modules',
  'build',
  '.docusaurus',
  '.git',
  'exports',
]);

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readExportConfig(configPath) {
  const raw = fs.readFileSync(configPath, 'utf8');
  const orgMatch = raw.match(/^\s*organizationName:\s*['"]([^'"]+)['"]/m);
  const baseMatch = raw.match(/^\s*baseUrl:\s*['"]([^'"]+)['"]/m);
  if (!orgMatch || !baseMatch) {
    throw new Error(`Could not parse organizationName/baseUrl from ${configPath}`);
  }
  const organizationName = orgMatch[1];
  let baseUrl = baseMatch[1];
  if (!baseUrl.startsWith('/')) baseUrl = `/${baseUrl}`;
  if (!baseUrl.endsWith('/')) baseUrl = `${baseUrl}/`;
  return { organizationName, baseUrl };
}

function sliceBalancedBraces(raw, openBraceIdx) {
  if (raw[openBraceIdx] !== '{') return null;
  let depth = 0;
  for (let i = openBraceIdx; i < raw.length; i++) {
    if (raw[i] === '{') depth++;
    else if (raw[i] === '}') {
      depth--;
      if (depth === 0) return raw.slice(openBraceIdx + 1, i);
    }
  }
  return null;
}

function parsePathAndRouteFromInner(inner) {
  const pathM = inner.match(/path:\s*['"]([^'"]+)['"]/);
  const routeM = inner.match(/routeBasePath:\s*['"]([^'"]+)['"]/);
  const contentPath = pathM ? pathM[1] : 'docs';
  const routeBasePath = routeM ? routeM[1] : contentPath;
  return { contentPath, routeBasePath };
}

function extractClassicPresetOptionsInner(raw) {
  const idx = raw.search(/['"]classic['"]\s*,\s*\{/);
  if (idx === -1) return null;
  const braceIdx = raw.indexOf('{', idx);
  return sliceBalancedBraces(raw, braceIdx);
}

function collectPresetDocInstance(raw) {
  const presetInner = extractClassicPresetOptionsInner(raw);
  if (!presetInner) return null;
  if (/docs:\s*false\b/.test(presetInner)) return null;
  const m = presetInner.match(/docs:\s*\{/);
  if (m) {
    const open = presetInner.indexOf(m[0]) + m[0].length - 1;
    const docsInner = sliceBalancedBraces(presetInner, open);
    if (!docsInner) return null;
    return parsePathAndRouteFromInner(docsInner);
  }
  return { contentPath: 'docs', routeBasePath: 'docs' };
}

function collectPluginDocInstances(raw) {
  const out = [];
  let searchFrom = 0;
  while (true) {
    const slice = raw.slice(searchFrom);
    const rel = slice.search(/['"]@docusaurus\/plugin-content-docs['"]/);
    if (rel === -1) break;
    const i = searchFrom + rel;
    const braceStart = raw.indexOf('{', i);
    if (braceStart === -1) break;
    const inner = sliceBalancedBraces(raw, braceStart);
    if (!inner) break;
    const pathM = inner.match(/^\s*path:\s*['"]([^'"]+)['"]/m);
    if (pathM) {
      const routeM = inner.match(/^\s*routeBasePath:\s*['"]([^'"]+)['"]/m);
      out.push({
        contentPath: pathM[1],
        routeBasePath: routeM ? routeM[1] : pathM[1],
      });
    }
    searchFrom = braceStart + inner.length + 2;
  }
  return out;
}

function discoverDocInstances(configPath) {
  const raw = fs.readFileSync(configPath, 'utf8');
  const list = [];
  const presetDoc = collectPresetDocInstance(raw);
  if (presetDoc) list.push(presetDoc);
  list.push(...collectPluginDocInstances(raw));

  const seen = new Set();
  const deduped = [];
  for (const inst of list) {
    if (seen.has(inst.contentPath)) continue;
    seen.add(inst.contentPath);
    deduped.push(inst);
  }
  deduped.sort((a, b) => b.contentPath.length - a.contentPath.length);

  if (deduped.length === 0 && fs.existsSync(path.join(REPO_ROOT, 'docs'))) {
    deduped.push({ contentPath: 'docs', routeBasePath: 'docs' });
  }
  return deduped;
}

function publicOriginFromConfig({ organizationName, baseUrl }) {
  if (process.env.DOCS_EXPORT_PUBLIC_ORIGIN) {
    let o = process.env.DOCS_EXPORT_PUBLIC_ORIGIN.trim();
    if (!o.endsWith('/')) o = `${o}/`;
    return o;
  }
  return new URL(baseUrl, `https://${organizationName}.github.io`).href;
}

function toAbsolute(origin, relativePath) {
  const base = origin.endsWith('/') ? origin : `${origin}/`;
  const rel = relativePath.replace(/^\/+/, '');
  return new URL(rel, base).href;
}

function readDocSlug(mdContent, fallbackBasename) {
  const fm = mdContent.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!fm) return fallbackBasename;
  const idLine = fm[1].match(/^\s*id:\s*(.+)$/m);
  if (!idLine) return fallbackBasename;
  return idLine[1].trim().replace(/^["']|["']$/g, '');
}

function markdownFileToBuiltHtml(mdAbsPath, repoRoot, buildDir, docInstances) {
  const rel = path.relative(repoRoot, mdAbsPath).replace(/\\/g, '/');
  if (!rel.endsWith('.md')) return null;
  const raw = fs.readFileSync(mdAbsPath, 'utf8');
  const withoutExt = rel.slice(0, -3);

  if (withoutExt.startsWith('src/pages/')) {
    const pagePath = withoutExt.slice('src/pages/'.length);
    const pageFallback = path.posix.basename(pagePath);
    const pageSlug = readDocSlug(raw, pageFallback);
    const dir = path.posix.dirname(pagePath);
    if (dir === '.' || dir === '') {
      return path.join(buildDir, pageSlug, 'index.html');
    }
    return path.join(buildDir, dir, pageSlug, 'index.html');
  }

  for (const { contentPath, routeBasePath } of docInstances) {
    if (rel === `${contentPath}.md` || rel.startsWith(`${contentPath}/`)) {
      const relUnder = path.posix.relative(contentPath, withoutExt);
      const relDir = path.posix.dirname(relUnder);
      const fallbackSlug = path.posix.basename(relUnder);
      const slug = readDocSlug(raw, fallbackSlug);
      const dirPart = relDir === '.' ? '' : relDir;
      return path.join(buildDir, routeBasePath, dirPart, slug, 'index.html');
    }
  }
  return null;
}

function markdownSliceForAssets(html) {
  const marker = 'theme-doc-markdown markdown';
  const mi = html.indexOf(marker);
  if (mi !== -1) return html.slice(mi);
  const m2 = html.indexOf('markdown-page');
  if (m2 !== -1) return html.slice(m2);
  return html;
}

function extractMdAssetRefs(md) {
  const refs = [];
  const re =
    /!\[[^\]]*\]\(\s*([^)\s]+?)(?:\s+"[^"]*")?\s*\)|\[[^\]]*\]\(\s*(\/resources\/[^)\s]+?)(?:\s+"[^"]*")?\s*\)/g;
  let m;
  while ((m = re.exec(md))) {
    const url = (m[1] || m[2]).trim();
    if (!url || /^https?:\/\//i.test(url)) continue;
    if (m[1]) {
      if (url.startsWith('/img/') || /^(?:\.\.\/)+static\/img\//.test(url)) {
        refs.push(url);
      }
    } else {
      refs.push(url);
    }
  }
  return refs;
}

function normalizeToImgPath(mdUrl) {
  if (mdUrl.startsWith('/img/')) return mdUrl.slice('/img/'.length);
  const m = mdUrl.match(/^(?:\.\.\/)+static\/img\/(.+)$/);
  if (m) return m[1];
  return null;
}

function resolveMdAssetRef(mdUrl, htmlSlice, origin, baseUrl, buildDir) {
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  if (mdUrl.startsWith('/resources/')) {
    const zipFile = mdUrl.slice('/resources/'.length);
    const baseName = zipFile.replace(/\.zip$/i, '');
    const re = new RegExp(
      `${escapeRegex(prefix)}(assets/files/${escapeRegex(baseName)}-[a-f0-9]+\\.zip)`,
      'i',
    );
    const m = htmlSlice.match(re);
    return m ? toAbsolute(origin, m[1]) : null;
  }

  const imgRel = normalizeToImgPath(mdUrl);
  if (!imgRel) return null;

  const bn = path.posix.basename(imgRel);
  const ext = path.posix.extname(bn).slice(1);
  const stem = bn.slice(0, -(ext.length + 1));

  const hashedRe = new RegExp(
    `${escapeRegex(prefix)}(assets/images/${escapeRegex(stem)}-[a-f0-9]+\\.${escapeRegex(ext)})`,
    'i',
  );
  const hm = htmlSlice.match(hashedRe);
  if (hm) return toAbsolute(origin, hm[1]);

  const staticRe = new RegExp(
    `${escapeRegex(prefix)}(img/${escapeRegex(imgRel)})`,
    'i',
  );
  const sm = htmlSlice.match(staticRe);
  if (sm) return toAbsolute(origin, sm[1]);

  const imgOnDisk = path.join(buildDir, 'img', ...imgRel.split('/'));
  if (fs.existsSync(imgOnDisk)) {
    return toAbsolute(origin, `img/${imgRel}`);
  }

  return null;
}

function mergeMapping(map, mdUrl, absoluteUrl, mdRelPath) {
  const prev = map.get(mdUrl);
  if (prev !== undefined && prev !== absoluteUrl) {
    throw new Error(
      `Conflicting deployed URLs for markdown source "${mdUrl}" (file ${mdRelPath}):\n  existing: ${prev}\n  new: ${absoluteUrl}`,
    );
  }
  map.set(mdUrl, absoluteUrl);
}

function buildUrlMap(mdFiles, repoRoot, buildDir, origin, baseUrl, docInstances) {
  const urlMap = new Map();

  for (const mdPath of mdFiles) {
    const raw = fs.readFileSync(mdPath, 'utf8');
    const refs = extractMdAssetRefs(raw);
    if (refs.length === 0) continue;

    const htmlPath = markdownFileToBuiltHtml(mdPath, repoRoot, buildDir, docInstances);
    const mdRel = path.relative(repoRoot, mdPath);
    if (!htmlPath || !fs.existsSync(htmlPath)) {
      continue;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const slice = markdownSliceForAssets(html);

    const uniqueRefs = [...new Set(refs)];
    for (const ref of uniqueRefs) {
      const absolute = resolveMdAssetRef(ref, slice, origin, baseUrl, buildDir);
      if (!absolute) {
        continue;
      }
      mergeMapping(urlMap, ref, absolute, mdRel);
    }
  }

  return urlMap;
}

function replaceMdUrlTargets(segment, urlMap) {
  let s = segment;
  const keys = [...urlMap.keys()].sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const esc = escapeRegex(key);
    const re = new RegExp(`\\]\\(\\s*${esc}(\\s+"[^"]*")?\\s*\\)`, 'g');
    s = s.replace(re, (_match, titlePart) => `](${urlMap.get(key)}${titlePart || ''})`);
  }
  return s;
}

function rewriteMarkdown(md, urlMap) {
  let out = '';
  let cursor = 0;
  while (cursor < md.length) {
    const open = md.indexOf('```', cursor);
    if (open === -1) {
      out += replaceMdUrlTargets(md.slice(cursor), urlMap);
      break;
    }
    out += replaceMdUrlTargets(md.slice(cursor, open), urlMap);
    const lineEnd = md.indexOf('\n', open);
    if (lineEnd === -1) {
      out += md.slice(open);
      break;
    }
    const close = md.indexOf('\n```', lineEnd);
    if (close === -1) {
      out += md.slice(open);
      break;
    }
    out += md.slice(open, close + '\n```'.length);
    cursor = close + '\n```'.length;
  }
  return out;
}

function shouldCopyEntry(relPath) {
  const normalized = relPath.split(path.sep).filter(Boolean);
  for (const segment of normalized) {
    if (COPY_EXCLUDES.has(segment)) return false;
  }
  return true;
}

function copyFiltered(srcRoot, destRoot) {
  fs.mkdirSync(destRoot, { recursive: true });
  const entries = fs.readdirSync(srcRoot, { withFileTypes: true });
  for (const ent of entries) {
    const src = path.join(srcRoot, ent.name);
    const dest = path.join(destRoot, ent.name);
    const rel = path.relative(REPO_ROOT, src);
    if (!shouldCopyEntry(rel)) continue;
    if (ent.isDirectory()) {
      copyFiltered(src, dest);
    } else if (ent.isFile() || ent.isSymbolicLink()) {
      fs.copyFileSync(src, dest);
    }
  }
}

function collectMarkdownFiles(rootDir, docInstances) {
  const files = [];
  for (const { contentPath } of docInstances) {
    const dir = path.join(rootDir, contentPath);
    if (fs.existsSync(dir)) walkMd(dir, files);
  }
  const pagesDir = path.join(rootDir, 'src', 'pages');
  if (fs.existsSync(pagesDir)) walkMd(pagesDir, files);
  return files;
}

function walkMd(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMd(full, acc);
    else if (ent.isFile() && ent.name.endsWith('.md')) acc.push(full);
  }
}

function rewriteAllMarkdown(tempRoot, urlMap, docInstances) {
  const mdFiles = collectMarkdownFiles(tempRoot, docInstances);
  for (const file of mdFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const next = rewriteMarkdown(raw, urlMap);
    if (next !== raw) {
      fs.writeFileSync(file, next, 'utf8');
    }
  }
}

function zipDirectory(sourceDir, zipPath) {
  const dir = path.dirname(zipPath);
  fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  const r = spawnSync('zip', ['-r', '-q', zipPath, '.', '-x', '*.DS_Store'], {
    cwd: sourceDir,
    encoding: 'utf8',
  });
  if (r.error) {
    throw new Error(
      `zip failed to spawn (${r.error.message}). Install a zip CLI or run on macOS/Linux.`,
    );
  }
  if (r.status !== 0) {
    throw new Error(`zip exited with ${r.status}: ${r.stderr || r.stdout || ''}`);
  }
}

function main() {
  const configPath = path.join(REPO_ROOT, 'docusaurus.config.ts');
  const cfg = readExportConfig(configPath);
  const origin = publicOriginFromConfig(cfg);

  const buildDir = path.join(REPO_ROOT, 'build');
  if (!fs.existsSync(buildDir)) {
    throw new Error(
      'Missing build/ directory. Run `npm run build` or deploy first so hashed asset paths exist.',
    );
  }

  const docInstances = discoverDocInstances(configPath);

  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'documentation-export-'));
  try {
    copyFiltered(REPO_ROOT, tmpRoot);

    const mdFiles = collectMarkdownFiles(tmpRoot, docInstances);
    const urlMap = buildUrlMap(mdFiles, tmpRoot, buildDir, origin, cfg.baseUrl, docInstances);
    rewriteAllMarkdown(tmpRoot, urlMap, docInstances);

    const zipPath = path.join(REPO_ROOT, 'exports', 'documentation-md-absolute.zip');
    zipDirectory(tmpRoot, zipPath);
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
}

main();
