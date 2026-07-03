import React, {useState, type ReactNode, type FormEvent} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './contact.module.css';

/**
 * Every pathway to a human ends here. Submissions are delivered by email
 * to suraj@zkagi.ai via FormSubmit's AJAX endpoint (static-site friendly,
 * works on Vercel with no server). Swap ENDPOINT for a webhook later if
 * you ever want to route through Make/CRM instead.
 */
const ENDPOINT = 'https://formsubmit.co/ajax/suraj@zkagi.ai';

const TOPICS = [
  'Get an API key',
  'Production deployment (tier / perimeter / compiler)',
  'Audit preparation help',
  'Explorer / receipts access',
  'Security report',
  'Community, partnerships & everything else',
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact(): ReactNode {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bots fill this; humans never see it
    setStatus('sending');
    setError('');
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
          ...data,
          _subject: `[zkAGI docs] ${data.topic || 'New message'} · ${data.name || 'someone'}`,
          _template: 'table',
        }),
      });
      const body = await r.json().catch(() => ({}));
      if (!r.ok || body.success === 'false' || body.success === false) {
        throw new Error(body.message || `Delivery failed (${r.status})`);
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <Layout
      title="Talk to us"
      description="Get an API key, plan a deployment, prepare for an audit, or just say hi. A human reads every message.">
      <main className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className={styles.kicker}>talk to us</p>
            <Heading as="h1" className={styles.title}>
              A human reads<br />every message.
            </Heading>
            <p className={styles.lede}>
              API keys, deployments, audit prep, security reports, or a simple
              hello from the community. It all lands in the same place, and it
              all gets read. Usually we reply within a day or two.
            </p>
            <ul className={styles.notes}>
              <li>
                <strong>Security reports:</strong> put SECURITY in your message
                and we'll move fast.
              </li>
              <li>
                <strong>Auditors:</strong> ask for a sample receipt pack. We
                help you prepare; the audit stays yours.
              </li>
              <li>
                <strong>Old friends from the node-runner days:</strong> it's
                good to see you. Say hi.
              </li>
            </ul>
            <p className={styles.privacyNote}>
              We use what you send only to reply to you. No lists, no drip
              campaigns.
            </p>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Your name</span>
                <input name="name" type="text" required placeholder="Ada Lovelace" />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input name="email" type="email" required placeholder="ada@hospital.org" />
              </label>
            </div>
            <label className={styles.field}>
              <span>Organization <em>(optional)</em></span>
              <input name="organization" type="text" placeholder="Analytical Engines Ltd." />
            </label>
            <label className={styles.field}>
              <span>What brings you here?</span>
              <select name="topic" defaultValue={TOPICS[0]}>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Your message</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell us about the data, the constraints, and what your auditors accept. Or just say hello."
              />
            </label>
            {/* honeypot — humans never see it, bots can't resist it */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className={styles.honey} />

            <button
              type="submit"
              className={styles.submit}
              disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send it'}
            </button>

            {status === 'sent' && (
              <p className={styles.sent} role="status">
                ✓ Sent. Thank you. A real person will read this soon.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.error} role="alert">
                Delivery hiccup: {error} You can also email us directly at{' '}
                <a href="mailto:suraj@zkagi.ai">suraj@zkagi.ai</a>.
              </p>
            )}
          </form>
        </div>
      </main>
    </Layout>
  );
}
