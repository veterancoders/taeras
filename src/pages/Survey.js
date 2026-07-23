import { useState, useRef } from 'react';
import { C, SectionLabel, LightCard, Reveal, tealGrad, PageHero } from '../components/UI';

// ─── QUESTION CONFIG ───────────────────────────────────────────────────────
const STEPS = [
  {
    title: 'About You',
    subtitle: "Let's start with the basics, this helps us understand who's answering.",
    questions: [
      { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'your@email.com' },
      { id: 'fullName', type: 'text', label: 'Full Name', required: true, placeholder: 'Your full name' },
      {
        id: 'education', type: 'radio', required: true,
        label: "What is the highest level of education you've completed?",
        options: ['High School', "Bachelor's Degree", "Master's Degree", 'Doctorate Degree', 'Prefer not to say'],
      },
      {
        id: 'age', type: 'radio', required: true, label: 'Age',
        options: ['<18', '18-25', '26-35', '36-45', '46-55', '55-65', '>65'],
      },
      {
        id: 'gender', type: 'radio', required: true, label: 'What is your gender?',
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
      },
      {
        id: 'country', type: 'radio', required: true, other: true, label: 'Where do you live?',
        options: ['Austria', 'Belgium', 'France', 'Nigeria', 'United Kingdom', 'Rest of EU', 'Other'],
      },
      {
        id: 'travelFrequency', type: 'radio', required: true,
        label: 'How frequently do you travel internationally per year?',
        options: [
          'Rarely (Less than once a year)',
          'Occasionally (1-2 times a year)',
          'Frequently (3-5 times a year)',
          'Very Often (6+ times a year)',
        ],
      },
      {
        id: 'industry', type: 'radio', required: true, other: true, label: 'Which industry are you working in?',
        options: [
          'Finance', 'Government', 'Education', 'Public Service', 'IT (Information Technology)',
          'Manufacturing', 'Travel & Tourism', 'Aviation and Hospitality', 'Real Estate', 'Digital Marketing', 'Other',
        ],
      },
      {
        id: 'travelPurpose', type: 'radio', required: true, other: true,
        label: 'What is the main purpose of your international travel?',
        options: [
          'Business — client meetings, conferences, corporate travel',
          'Leisure — holidays and personal trips',
          'Both business and leisure equally',
          'Family or personal reasons (visiting family, education)',
          'Other',
        ],
      },
      {
        id: 'paymentMethod', type: 'radio', required: true, other: true,
        label: 'Which payment method do you use most when spending abroad?',
        options: [
          'My standard home bank card (e.g., Erste, Raiffeisen, GTBank, Providus Bank etc.)',
          'A digital/buyback card (e.g., Revolut, Wise, Kuda, Opay etc.)',
          'Credit card',
          'Cash or currency exchange',
          'Other',
        ],
      },
    ],
  },
  {
    title: 'Hidden Fees & Lost Value',
    subtitle: 'This section explores your awareness of hidden fees, exchange rate markups, and the value generated from your travel spending that you may not currently receive.',
    questions: [
      {
        id: 'awareFxMarkup', type: 'radio', required: true,
        label: 'Were you aware that most traditional banks add a 2–4% markup on top of the official exchange rate on every foreign transaction?',
        options: [
          'Yes, I knew this and it frustrates me',
          'I suspected it but did not know the exact amount',
          'No — I assumed it was free or a small flat fee',
          'I knew but it does not bother me',
        ],
      },
      {
        id: 'hiddenFeePreference', type: 'radio', required: true,
        label: 'On a €2,000 holiday, that hidden markup can cost you €40–80. What would you prefer to do with that money?',
        options: [
          'Get it back as cash in my account',
          'Have it invested automatically into global stocks on my behalf',
          'Use it toward my next flight or hotel',
          'I would not miss it — it is not a significant amount to me',
        ],
      },
      {
        id: 'investingRelationship', type: 'radio', required: true,
        label: 'Which statement best describes your current relationship with investing?',
        options: [
          'I invest regularly and am comfortable with how it works',
          'I have been meaning to start but have not yet taken the first step',
          'I find the process too complicated or time-consuming',
          'I do not trust investment apps or am worried about losing money',
        ],
      },
    ],
  },
  {
    title: 'The Taeras Concept',
    subtitle: 'Imagine a different way to travel — one where everyday spending could help build long-term wealth instead of simply earning points. As you review the concept, please answer based on your honest first impressions.',
    questions: [
      {
        id: 'cardReaction', type: 'radio', required: true,
        label: 'Imagine a payment card that automatically converts the hidden interchange value from your travel spending into fractional shares in global companies — with no action required from you. Which best describes your reaction?',
        options: [
          'I would switch to this card immediately — this is exactly what I want',
          'I am interested — I would try it if setup takes under 2 minutes',
          'I like the idea but want to understand it better before deciding',
          'I prefer to keep my spending and investing completely separate',
        ],
      },
      {
        id: 'autoInvestFeeling', type: 'radio', required: true,
        label: "If you spent €1,000 on a business trip and the card automatically invested €7 into Apple, NVIDIA, or an S&P 500 ETF on your behalf — how would you feel about that?",
        options: [
          'Positive — small amounts compound into meaningful wealth over time',
          'Neutral — the amount is too small to feel meaningful',
          'Concerned — I would want to choose where my money is invested',
          'Negative — I do not want any automatic investing',
        ],
      },
      {
        id: 'regulationImportance', type: 'radio', required: true,
        label: 'How important is it that a travel card like this is regulated and backed by established European licensed banks and brokers?',
        options: [
          'Extremely important — regulation and safety are my top priority',
          'Important — I want to know it is regulated but the app experience matters more',
          'Somewhat important — low fees and ease of use matter more to me',
          'Not important — I am comfortable with unregulated fintech products',
        ],
      },
      {
        id: 'confidenceFeature', type: 'radio', required: true, other: true,
        label: 'Which of these features would most increase your confidence in using a new travel card? (Select the most important one)',
        options: [
          'It is issued under a banking licence (e.g., Treezor, Erste Bank, UBA, Zenith, Flutterwave)',
          "I don't care about the brand link as long as it serves the purpose",
          'Other',
        ],
      },
    ],
  },
  {
    title: 'Pain Points & Priorities',
    subtitle: 'Tell us what matters most when you manage money on the road.',
    questions: [
      {
        id: 'painPoints', type: 'checkbox', required: true,
        label: 'What are your biggest pain points when managing money while traveling?',
        options: [
          'High currency exchange fees',
          'Unfavorable exchange rates',
          'Security concerns (card theft/fraud)',
          'Difficulty tracking expenses in local currency',
          'Limited ATM access abroad',
          "Card being blocked due to 'suspicious' foreign activity",
          'Difficulty splitting bills with travel companions',
        ],
      },
      {
        id: 'featurePriority', type: 'matrix', required: true,
        label: 'Which of these features would you prioritize in a travel fintech app?',
        rows: ['Currency Exchange', 'Expense Tracking', 'Security Controls', 'Travel Budgeting', 'Instant Card Freezing'],
        columns: ['Not Important', 'Somewhat Important', 'Very Important', 'Essential'],
      },
      {
        id: 'benefitInterest', type: 'matrix', required: true,
        label: 'Rate your interest in the following proposed Taeras Travel Card benefits:',
        rows: [
          'Zero-fee foreign transactions',
          'Real-time travel insurance integration',
          "Automatic 'best rate' currency conversion",
          'Direct connection to local transit payment systems',
          'Exclusive airport lounge access',
        ],
        columns: ['Uninterested', 'Neutral', 'Interested', 'Very Interested'],
      },
    ],
  },
  {
    title: 'Card Preferences',
    subtitle: "A few more details about how you'd want this to work.",
    questions: [
      {
        id: 'fundingMethod', type: 'radio', required: true,
        label: 'How would you prefer to load funds onto your travel card?',
        options: ['Direct Bank Transfer', 'Credit/Debit Card Top-up', 'Apple Pay / Google Pay', 'Cryptocurrency', 'Third-party wallet (e.g. PayPal, Venmo, etc.)'],
      },
      {
        id: 'switchLikelihood', type: 'likert', required: true, min: 1, max: 5,
        minLabel: 'Not likely at all', maxLabel: 'Extremely likely',
        label: 'On a scale of 1-5, how likely are you to switch your primary travel spending to a dedicated travel fintech app?',
      },
      {
        id: 'dreamFeature', type: 'text', required: false,
        label: "If you could add one 'dream' feature to a travel card, what would it be?",
        placeholder: 'Tell us your idea...',
      },
      {
        id: 'trustRating', type: 'star', required: false, max: 5,
        label: 'How would you rate your overall trust in digital-only banking solutions for travel?',
      },
      {
        id: 'loyaltyPreference', type: 'radio', required: true,
        label: 'Which of the following loyalty or rewards structures would you find most appealing for a travel card?',
        options: [
          'Cashback on all international transactions',
          'Travel points redeemable for flights and hotels',
          'Tiered rewards based on annual spending',
          'Partner discounts for specific travel brands (airlines, booking sites)',
          'Complimentary travel perks (e.g. free Wi-Fi, luggage tags)',
        ],
      },
      {
        id: 'notificationPreference', type: 'checkbox', required: true,
        label: 'How would you prefer to receive notifications or alerts regarding your travel expenses?',
        options: [
          'Push notifications via the mobile app',
          'SMS/Text message alerts',
          'Email summaries',
          'Real-time spend updates on a smartwatch',
          'No notifications; I prefer to check manually',
        ],
      },
      {
        id: 'supportPreference', type: 'likert', required: true, min: 1, max: 10,
        minLabel: 'Prefer AI-driven automated assistance', maxLabel: 'Prefer 24/7 human customer support',
        label: 'On a scale of 1-10, how important is 24/7 human customer support compared to AI-driven automated assistance while you are traveling abroad?',
      },
    ],
  },
  {
    title: 'Founders Circle',
    subtitle: 'Almost done just one last thing.',
    questions: [
      {
        id: 'foundersCircle', type: 'radio', required: true,
        label: 'We are opening a Founders Circle for the first 1,500 users — with zero foreign exchange fees for life. Would you join the waitlist today?',
        options: [
          'Yes - sign me up immediately',
          'Yes - if I can move up the list by referring friends',
          'I will wait for public launch',
          'No',
        ],
      },
      {
        id: 'foundersEmail', type: 'text', required: false,
        label: 'Optional — leave your email to join the Founders Circle waitlist',
        placeholder: 'your@email.com',
      },
    ],
  },
];

// ─── SHARED SUB-COMPONENTS ─────────────────────────────────────────────────
function QuestionLabel({ text, required }) {
  return (
    <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 14, lineHeight: 1.55 }}>
      {text}{required && <span style={{ color: '#ef4444' }}> *</span>}
    </div>
  );
}

function ErrorText({ show, message }) {
  if (!show) return null;
  return <p style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>{message || 'This question is required.'}</p>;
}

function textInputStyle(hasError) {
  return {
    width: '100%', background: '#f8f9fa',
    border: `1px solid ${hasError ? '#ef4444' : '#e9ecef'}`,
    color: C.textDark, padding: '13px 16px', borderRadius: 12,
    fontSize: 14, fontFamily: "'DM Sans', sans-serif",
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  };
}

function OptionRow({ selected, onClick, children, multi = false }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
        border: `1px solid ${selected ? 'rgba(0,180,180,0.4)' : '#e9ecef'}`,
        background: selected ? '#f0fafa' : '#fff',
        transition: 'all 0.2s', marginBottom: 10,
      }}
    >
      <div style={{
        width: 19, height: 19, flexShrink: 0,
        borderRadius: multi ? 5 : '50%',
        border: `2px solid ${selected ? C.teal : '#cbd5e0'}`,
        background: selected ? C.teal : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}>
        {selected && (multi
          ? <span style={{ color: '#fff', fontSize: 12, lineHeight: 1 }}>✓</span>
          : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />)}
      </div>
      <span style={{ fontSize: 14, color: C.textDark, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

function MatrixQuestion({ id, rows, columns, value = {}, onChange, showError }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr>
            <th></th>
            {columns.map(c => (
              <th key={c} style={{ fontSize: 11, color: C.textLight, fontWeight: 600, padding: '0 8px 12px', textAlign: 'center', letterSpacing: 0.4 }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            const rowMissing = showError && !value[row];
            return (
              <tr key={row} style={{ borderTop: '1px solid #f0f0f0', background: rowMissing ? '#fef2f2' : 'transparent' }}>
                <td style={{ fontSize: 13, color: rowMissing ? '#ef4444' : C.textDark, padding: '13px 12px 13px 0', fontWeight: 500, whiteSpace: 'nowrap' }}>{row}</td>
                {columns.map(col => (
                  <td key={col} style={{ textAlign: 'center', padding: '13px 8px' }}>
                    <input
                      type="radio"
                      name={`${id}-${row}`}
                      checked={value[row] === col}
                      onChange={() => onChange(row, col)}
                      style={{ width: 17, height: 17, accentColor: C.teal, cursor: 'pointer' }}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LikertQuestion({ min, max, minLabel, maxLabel, value, onChange }) {
  const nums = [];
  for (let i = min; i <= max; i++) nums.push(i);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {nums.map(n => (
          <button
            key={n} type="button" onClick={() => onChange(n)}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: `2px solid ${value === n ? C.teal : '#e9ecef'}`,
              background: value === n ? C.teal : '#fff',
              color: value === n ? '#fff' : C.textMid,
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: "'DM Sans'",
            }}
          >{n}</button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, gap: 12 }}>
        <span style={{ fontSize: 11, color: C.textLight, maxWidth: 140 }}>{minLabel}</span>
        <span style={{ fontSize: 11, color: C.textLight, maxWidth: 140, textAlign: 'right' }}>{maxLabel}</span>
      </div>
    </div>
  );
}

function StarQuestion({ value, onChange, max = 5 }) {
  const [hover, setHover] = useState(0);
  const active = hover || value || 0;
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <span
          key={n}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{ fontSize: 36, cursor: 'pointer', color: active >= n ? '#d4af37' : '#e2e8f0', transition: 'color 0.15s', lineHeight: 1 }}
        >★</span>
      ))}
    </div>
  );
}

// ─── VALIDATION HELPERS ─────────────────────────────────────────────────────
function isAnswered(q, answers) {
  const v = answers[q.id];
  switch (q.type) {
    case 'text':
    case 'email':
      return typeof v === 'string' && v.trim().length > 0;
    case 'radio': {
      if (!v) return false;
      if (v === 'Other' && q.other) {
        const o = answers[`${q.id}_other`];
        return typeof o === 'string' && o.trim().length > 0;
      }
      return true;
    }
    case 'checkbox':
      return Array.isArray(v) && v.length > 0;
    case 'matrix':
      return !!v && q.rows.every(r => v[r]);
    case 'likert':
    case 'star':
      return typeof v === 'number';
    default:
      return true;
  }
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Survey() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errorIds, setErrorIds] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const questionRefs = useRef({});

  const step = STEPS[stepIdx];
  const isLastStep = stepIdx === STEPS.length - 1;

  const setValue = (id, val) => {
    setAnswers(a => ({ ...a, [id]: val }));
    setErrorIds(prev => { if (!prev.has(id)) return prev; const next = new Set(prev); next.delete(id); return next; });
  };

  const toggleCheckbox = (id, option) => {
    setAnswers(a => {
      const arr = a[id] ? [...a[id]] : [];
      const idx = arr.indexOf(option);
      if (idx > -1) arr.splice(idx, 1); else arr.push(option);
      return { ...a, [id]: arr };
    });
    setErrorIds(prev => { if (!prev.has(id)) return prev; const next = new Set(prev); next.delete(id); return next; });
  };

  const setMatrixValue = (id, row, col) => {
    setAnswers(a => ({ ...a, [id]: { ...(a[id] || {}), [row]: col } }));
    setErrorIds(prev => { if (!prev.has(id)) return prev; const next = new Set(prev); next.delete(id); return next; });
  };

  const validateStep = () => {
    const missing = step.questions.filter(q => q.required && !isAnswered(q, answers)).map(q => q.id);
    if (missing.length) {
      setErrorIds(new Set(missing));
      const el = questionRefs.current[missing[0]];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const focusable = el.querySelector('input, textarea, button');
        if (focusable) focusable.focus({ preventScroll: true });
      }
      return false;
    }
    return true;
  };

  const handleBack = () => {
    if (stepIdx === 0) return;
    setStepIdx(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    if (!isLastStep) {
      setStepIdx(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('api/survey.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: answers.email || '',
          fullName: answers.fullName || '',
          foundersCircle: answers.foundersCircle || '',
          responses: answers,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error || 'Server error — please try again');
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setSubmitError('Network error — please try again');
      setSubmitting(false);
    }
  };

  const renderQuestion = (q) => {
    const hasError = errorIds.has(q.id);
    return (
      <div key={q.id} ref={el => { questionRefs.current[q.id] = el; }} style={{ marginBottom: 36 }}>
        <QuestionLabel text={q.label} required={q.required} />

        {(q.type === 'text' || q.type === 'email') && (
          <input
            type={q.type}
            placeholder={q.placeholder || ''}
            value={answers[q.id] || ''}
            onChange={e => setValue(q.id, e.target.value)}
            style={textInputStyle(hasError)}
            onFocus={e => e.target.style.borderColor = C.teal}
            onBlur={e => e.target.style.borderColor = hasError ? '#ef4444' : '#e9ecef'}
          />
        )}

        {q.type === 'radio' && (
          <div>
            {q.options.map(opt => (
              <OptionRow key={opt} selected={answers[q.id] === opt} onClick={() => setValue(q.id, opt)}>{opt}</OptionRow>
            ))}
            {q.other && answers[q.id] === 'Other' && (
              <input
                type="text" placeholder="Please specify..."
                value={answers[`${q.id}_other`] || ''}
                onChange={e => setValue(`${q.id}_other`, e.target.value)}
                style={{ ...textInputStyle(hasError), marginTop: 4 }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = hasError ? '#ef4444' : '#e9ecef'}
              />
            )}
          </div>
        )}

        {q.type === 'checkbox' && (
          <div>
            {q.options.map(opt => (
              <OptionRow
                key={opt} multi
                selected={(answers[q.id] || []).includes(opt)}
                onClick={() => toggleCheckbox(q.id, opt)}
              >{opt}</OptionRow>
            ))}
          </div>
        )}

        {q.type === 'matrix' && (
          <MatrixQuestion id={q.id} rows={q.rows} columns={q.columns} value={answers[q.id]} onChange={(row, col) => setMatrixValue(q.id, row, col)} showError={hasError} />
        )}

        {q.type === 'likert' && (
          <LikertQuestion min={q.min} max={q.max} minLabel={q.minLabel} maxLabel={q.maxLabel} value={answers[q.id]} onChange={v => setValue(q.id, v)} />
        )}

        {q.type === 'star' && (
          <StarQuestion value={answers[q.id]} onChange={v => setValue(q.id, v)} max={q.max} />
        )}

        <ErrorText show={hasError} message={q.type === 'matrix' ? 'Please select one option for every row before continuing.' : undefined} />
      </div>
    );
  };

  if (submitted) {
    return (
      <div style={{ background: '#fff', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 5%', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,50px)', fontWeight: 700, color: C.textDark, marginBottom: 14 }}>
            Thank you for your feedback.<br /><span style={tealGrad}>You're helping shape Taeras.</span>
          </h2>
          <p style={{ color: C.textMid, fontSize: 16, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.7 }}>
            {answers.fullName ? `Thanks, ${answers.fullName.split(' ')[0]}. ` : ''}Your responses have been recorded and will directly inform how we build the Taeras travel card.
          </p>
          <div style={{ display: 'inline-block', background: '#f0fafa', color: C.teal, padding: '10px 24px', borderRadius: 20, fontSize: 13, border: '1px solid rgba(0,180,180,0.2)' }}>
            Private Beta
          </div>
        </div>
      </div>
    );
  }

  const progressPct = Math.round(((stepIdx + 1) / STEPS.length) * 100);

  return (
    <div style={{ background: '#fff' }}>
      <PageHero
        label="Market Research Survey"
        title={<>Help shape the<br /><span style={tealGrad}>future of travel finance.</span></>}
        subtitle="Your feedback will help us understand travelers’ experiences, preferences, and interest in new ways to make travel spending more rewarding. The survey takes approximately 3–5 minutes to complete."
      />

      <section style={{ background: '#fff', padding: '0 5% 120px', maxWidth: 1000, margin: '0 auto' }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.textLight, letterSpacing: 1 }}>STEP {stepIdx + 1} OF {STEPS.length}</span>
            <span style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>{progressPct}%</span>
          </div>
          <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg,#00b4b4,#00d4d4)', borderRadius: 3, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <Reveal key={stepIdx}>
          <LightCard style={{ padding: '40px 36px' }}>
            <SectionLabel>{step.title}</SectionLabel>
            <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.7, marginBottom: 30, marginTop: 10 }}>{step.subtitle}</p>

            {step.questions.map(renderQuestion)}

            {submitError && (
              <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>{submitError}</p>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 10 }}>
              <button
                onClick={handleBack}
                disabled={stepIdx === 0}
                style={{
                  background: '#fff', color: stepIdx === 0 ? '#ccc' : C.textMid,
                  border: '1px solid #e9ecef', padding: '14px 28px', borderRadius: 50,
                  fontSize: 14, fontWeight: 600, cursor: stepIdx === 0 ? 'default' : 'pointer',
                  fontFamily: "'DM Sans'",
                }}
              >← Back</button>
              <button
                onClick={handleNext}
                disabled={submitting}
                style={{
                  background: 'linear-gradient(135deg,#00b4b4,#008a8a)', color: '#fff', border: 'none',
                  padding: '14px 34px', borderRadius: 50, fontSize: 14, fontWeight: 700,
                  cursor: submitting ? 'default' : 'pointer', fontFamily: "'DM Sans'",
                  letterSpacing: 0.4, boxShadow: '0 6px 24px rgba(0,180,180,0.3)', opacity: submitting ? 0.7 : 1,
                }}
              >{submitting ? 'Submitting…' : isLastStep ? 'Submit Survey →' : 'Next →'}</button>
            </div>
          </LightCard>
        </Reveal>
      </section>
    </div>
  );
}
