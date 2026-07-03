import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/* ---------------- starfield: a quiet drift of stars behind the hero ------- */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * DPR;
      canvas.height = canvas.offsetHeight * DPR;
    };
    resize();
    window.addEventListener('resize', resize);
    const N = 130;
    const stars = Array.from({length: N}, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8, // depth: speed + brightness
      tw: Math.random() * Math.PI * 2,
    }));
    const tick = (t: number) => {
      const {width: w, height: h} = canvas;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x -= 0.0001 * s.z;
        if (s.x < 0) s.x = 1;
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.0012 * s.z + s.tw);
        const r = s.z * 1.3 * DPR;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.z > 0.75
            ? `rgba(112,169,255,${0.5 * twinkle})`
            : `rgba(204,214,246,${0.4 * twinkle})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={ref} className={styles.starfield} aria-hidden="true" />;
}

/* ------------- the receipt that types itself, over and over --------------- */
const RECEIPT_LINES = [
  '$ curl https://infer.zkagi.ai/v1/chat/completions \\',
  '    -H "Authorization: Bearer $ZKAGI_KEY" \\',
  '    -d \'{"tier":"sovereign","messages":[…]}\'',
  '',
  '"receipt": {',
  '   "trust_domain": "mathematics",',
  '   "tier":         "sovereign-mpc",',
  '   "guarantee":    "information-theoretic",',
  '   "egress":       "none",',
  '   "proof":        "stark:0x9f3a…c481"   ✓ VERIFIED',
  '}',
];

function TypingReceipt() {
  const [out, setOut] = useState<string[]>([]);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setOut(RECEIPT_LINES);
      return;
    }
    let line = 0;
    let ch = 0;
    let buf: string[] = [''];
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const cur = RECEIPT_LINES[line] ?? '';
      if (ch <= cur.length) {
        buf[line] = cur.slice(0, ch);
        setOut([...buf]);
        ch += 1 + Math.floor(Math.random() * 2);
        timer = setTimeout(step, cur.startsWith('$') ? 14 : 8);
      } else if (line < RECEIPT_LINES.length - 1) {
        line += 1;
        ch = 0;
        buf = [...buf, ''];
        timer = setTimeout(step, cur === '' ? 260 : 60);
      } else {
        timer = setTimeout(() => {
          line = 0;
          ch = 0;
          buf = [''];
          step();
        }, 5200);
      }
    };
    timer = setTimeout(step, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.terminal} aria-label="Example inference receipt">
      <div className={styles.terminalBar}>
        <span /><span /><span />
        <em>inference-receipt · live</em>
      </div>
      <pre className={styles.terminalBody}>
        {out.map((l, i) => (
          <div
            key={i}
            className={clsx(
              l.includes('VERIFIED') && styles.lineVerified,
              l.trimStart().startsWith('"') && styles.lineKey,
            )}>
            {l || ' '}
          </div>
        ))}
        <div className={styles.cursor}>▌</div>
      </pre>
    </div>
  );
}

/* ------------------------------ page body -------------------------------- */
const PILLARS = [
  {
    n: '01',
    title: 'Define your trust domain',
    body: 'Silicon, mathematics, or both. You pick the anchor your compliance framework already approves; the platform enforces it on every call.',
    to: '/docs/trust/trust-domains',
  },
  {
    n: '02',
    title: 'The compiler assembles it',
    body: 'Anchor, tier and perimeter go in. An OpenAI-compatible endpoint comes out, hosted inside your boundary. You never hand-pick MPC vs FHE vs enclaves.',
    to: '/docs/platform/compiler',
  },
  {
    n: '03',
    title: 'Every call returns a receipt',
    body: 'Which guarantee ran, where, with a proof your auditor can check without asking us anything. Evidence, not promises.',
    to: '/docs/platform/receipts',
  },
];

const FLOW =
  'you ──▶ [ anchor ✓ tier ✓ perimeter ✓ ] ──▶ altaica compiler ──▶ endpoint in YOUR perimeter ──▶ answer + receipt ✦ ';

export default function Home(): ReactNode {
  return (
    <Layout
      title="zkAGI Docs · privacy you can prove"
      description="Documentation for zkAGI: user-defined trust domains, tiers of assurance, the Altaica compiler, verifiable receipts, and selective disclosure.">
      <header className={styles.hero}>
        <Starfield />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={clsx('container', styles.heroInner)}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>zkagi documentation · swiss-governed · built in the open</p>
            <Heading as="h1" className={styles.title}>
              Privacy you can <span className={styles.gradient}>prove</span>,<br />
              not just promise.
            </Heading>
            <p className={styles.subtitle}>
              Run AI on the data that can't leave your control. You define the
              trust domain, the compiler enforces it, and every call comes back
              wearing a receipt.
            </p>
            <div className={styles.ctas}>
              <Link className={styles.ctaPrimary} to="/docs">
                Read the docs
              </Link>
              <Link className={styles.ctaGhost} to="/docs/api/quickstart">
                Quickstart →
              </Link>
              <Link className={styles.ctaGhost} to="/contact">
                Talk to us
              </Link>
            </div>
            <p className={styles.honest}>
              <span className="zk-status zk-status--rnd">◐ some of this is active R&D</span>
              {' '}and we{' '}
              <Link to="/docs/trust-center/status">label it honestly</Link>.
            </p>
          </div>
          <div className={styles.heroTerm}>
            <TypingReceipt />
          </div>
        </div>
      </header>

      <main>
        {/* the flow, as one long ascii breath */}
        <section className={styles.flowStrip} aria-label="How zkAGI flows">
          <div className={styles.flowTrack}>
            <span>{FLOW}</span>
            <span aria-hidden="true">{FLOW}</span>
          </div>
        </section>

        {/* three moves */}
        <section className="container margin-vert--xl">
          <div className={styles.pillars}>
            {PILLARS.map((p) => (
              <Link key={p.n} to={p.to} className={styles.pillar}>
                <span className={styles.pillarN}>{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className={styles.pillarMore}>read more →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* selective disclosure teaser */}
        <section className={styles.feature}>
          <div className="container">
            <div className={styles.featureInner}>
              <div>
                <p className={styles.kicker}>the favorite trick</p>
                <Heading as="h2">A proof that opens a document.</Heading>
                <p>
                  Upload a document. A zero-knowledge proof is generated on
                  <em> your</em> machine, and that proof becomes the key to a
                  private Q&A session over exactly that data. Couple it with the
                  Sovereign MPC tier and you get private introspection: ask hard
                  questions of sensitive documents, and nobody, us included,
                  can listen in.
                </p>
                <Link className={styles.ctaGhost} to="/docs/platform/selective-disclosure">
                  How selective disclosure works →
                </Link>
              </div>
              <pre className={styles.featureCode}>
{`# 1. the proof is the key (generated client-side)
POST /v1/generate_proof   file=contract.pdf → proof.json

# 2. the proof unlocks a session on that data
POST /v1/ask   query="termination clauses?"
               proof_file=proof.json

→ answer + receipt · raw document never leaves`}
              </pre>
            </div>
          </div>
        </section>

        {/* gratitude */}
        <section className={styles.thanks}>
          <div className="container">
            <p className={styles.kicker}>from us, to you</p>
            <Heading as="h2">Built with a community, not just for one.</Heading>
            <p className={styles.thanksBody}>
              zkAGI has been built in the open since 2019. Node runners who kept
              GPUs humming through the night. Contributors who filed the issue
              instead of closing the tab. Builders who shipped agents on a young
              substrate, and early believers who told a friend. This chapter is
              quieter and more institutional, but it stands on everything you
              helped prove. Thank you. The door is always open.
            </p>
            <Link className={styles.ctaGhost} to="/contact">
              Come say hi →
            </Link>
          </div>
        </section>

        {/* closing CTA */}
        <section className={styles.closing}>
          <div className="container">
            <Heading as="h2">
              We don't tell you who to trust.<br />
              <span className={styles.gradient}>We give you the tools to enforce it.</span>
            </Heading>
            <div className={styles.ctas} style={{justifyContent: 'center'}}>
              <Link className={styles.ctaPrimary} to="/contact">
                Talk to us
              </Link>
              <Link className={styles.ctaGhost} to="/docs">
                Start reading
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
