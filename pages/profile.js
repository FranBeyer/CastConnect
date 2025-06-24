import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [aiOptIn, setAiOptIn] = useState(false);

  useEffect(() => {
    // ✅ Simulate a logged-in user for now (replace this with real auth later)
    const userId = 'your-user-id-here'; // replace with real user ID from Supabase Auth

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('Talent')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) console.error(error);
      else {
        setProfile(data);
        setAiOptIn(data.ai_opt_in); // load opt-in state
      }
    };

    fetchProfile();
  }, []);

  const handleOptInChange = async (e) => {
    const newValue = e.target.checked;
    setAiOptIn(newValue);

    // ✅ Simulate the same user ID
    const userId = 'your-user-id-here'; // replace with real user ID

    const { error } = await supabase
      .from('Talent')
      .update({ ai_opt_in: newValue })
      .eq('id', userId);

    if (error) console.error('Error updating opt-in status:', error);
    else console.log('AI opt-in updated to:', newValue);
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Category:</strong> {profile.category}</p>

      {/* ✅ AI Opt-in Toggle */}
      <div style={{ marginTop: '2rem' }}>
        <label>
          <input
            type="checkbox"
            checked={aiOptIn}
            onChange={handleOptInChange}
          />
          &nbsp; I agree to have my face used in AI content generation (opt-in)
        </label>
      </div>
    </div>
  );
}
