import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Profile() {
  const [aiOptIn, setAiOptIn] = useState(false);

  useEffect(() => {
    // Load user's existing opt-in status
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('ai_opt_in')
          .eq('id', user.id)
          .single();
        if (data) setAiOptIn(data.ai_opt_in);
      }
    };
    fetchData();
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
