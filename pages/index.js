
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    const fetchTalents = async () => {
      const { data, error } = await supabase
        .from('Talent')
        .select('*')
        .limit(12);
      if (error) console.error(error);
      else setTalents(data);
    };

    fetchTalents();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
        🌟 Welcome to CastConnect
      </h1>

      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Featured Talent</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {talents.map(talent => (
            <div key={talent.id} style={{
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <img src={talent.photo} alt={talent.name} style={{
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                marginBottom: '1rem'
              }} />
              <h3>{talent.name}</h3>
              <p>{talent.location}</p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>{talent.category}</p>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.5rem 0' }}>
                {talent.bio}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>
                <strong>Skills:</strong> {talent.special_skills?.join(', ') || 'N/A'}
              </p>
              <button style={{
                marginTop: '0.5rem',
                backgroundColor: '#008080',
                color: '#fff',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>View Profile</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
