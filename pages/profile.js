import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Profile() {
  const [aiOptIn, setAiOptIn] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('users') // Or 'Talent' if that's the correct table
        .select('ai_opt_in')
        .limit(1)
        .single();

      if (data) {
        setAiOptIn(data.ai_opt_in);
      }
    };

    fetchProfile();
  }, []);

  const handleToggle = async () => {
    setAiOptIn(!aiOptIn);
    const { error } = await supabase
      .from('users') // Or 'Talent' if using Talent table
      .update({ ai_opt_in: !aiOptIn })
      .eq('id', 1); // Replace with actual user ID or session ID

    if (error) console.error(error);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧑‍💻 Profile Settings</h1>
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        marginTop: '1rem'
      }}>
        <h2>🤖 AI Consent</h2>
        <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
          <input
            type="checkbox"
            checked={aiOptIn}
            onChange={handleToggle}
          />
          I consent to AI usage of my likeness.
        </label>
        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
          You can withdraw this at any time. Licensing fees may apply.
        </p>
      </div>
    </div>
  );
}

