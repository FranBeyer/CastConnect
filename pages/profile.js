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

  const handleChange = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newStatus = !aiOptIn;
    const { error } = await supabase
      .from('users')
      .update({ ai_opt_in: newStatus })
      .eq('id', user.id);

    if (!error) setAiOptIn(newStatus);
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={aiOptIn}
          onChange={handleChange}
        />
        I agree my face may be used for AI creation (a fee will be paid)
      </label>
    </div>
  );
}

