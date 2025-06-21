import React, { useState } from 'react';

export default function Home() {
  const [aiOptIn, setAiOptIn] = useState(false);

  const handleToggle = () => {
    setAiOptIn(!aiOptIn);
    // You could later connect this to a Supabase update
  };

  const talents = [
    {
      id: 1,
      name: "Alex Rivera",
      location: "London, UK",
      category: "Actor, Model",
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Maya Chen",
      location: "New York, USA",
      category: "Dancer",
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Leo Smith",
      location: "Sydney, Australia",
      category: "Actor",
      photo: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
        🌟 Welcome to CastConnect
      </h1>

      {/* Talent Grid */}
      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Featured Talent</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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

      {/* AI Opt-in Section */}
      <section style={{
        marginTop: '4rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🤖 AI Model Consent</h2>
        <p style={{ marginBottom: '1rem' }}>
          Would you like to opt-in to allow your face to be used in AI-generated casting visuals for commercial use?
          If selected, you may be eligible for additional licensing fees.
        </p>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontWeight: 'bold'
        }}>
          <input type="checkbox" checked={aiOptIn} onChange={handleToggle} />
          I consent to AI usage of my likeness.
        </label>
        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
          You can withdraw this consent at any time. For details, please see our policy.
        </p>
      </section>
    </div>
  );
}

