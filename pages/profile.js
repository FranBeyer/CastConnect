import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Only create Supabase client on the client-side
const supabase = typeof window !== 'undefined'
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  : null;

export default function Profile() {
  const [aiOptIn, setAiOptIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    const fetchData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && !userError) {
        const { data, error } = await supabase
          .from('users')
          .select('ai_opt_in')
          .eq('id', user.id)
          .single();

        if (data && !error) {
          setAiOptIn(data.ai_opt_in);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = async () => {
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newStatus = !aiOptIn;
    const { error } = await supabase
      .from('users')
      .update({ ai_opt_in: newStatus })
      .eq('id', user.id);

    if (!error) {
      setAiOptIn(newStatus);
    }
  };

  if (loading) return <p>Loading...</p>;

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

