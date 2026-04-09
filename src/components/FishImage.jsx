import { useState } from 'react';
import { colors, fonts } from '../utils/colors';
import { categorizeSpecies } from '../utils/helpers';

/**
 * Displays a fish species image with a styled fallback placeholder.
 * Images are loaded from /fish-images/{slug}.jpg
 * If no image exists, shows a gradient placeholder with the species initial.
 */

const categoryGradients = {
  Freshwater: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 60%, #40916c 100%)',
  Saltwater: 'linear-gradient(135deg, #0B1D3A 0%, #1a3a52 60%, #264653 100%)',
  Shark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
  Tropical: 'linear-gradient(135deg, #7f4f24 0%, #c87941 60%, #dda15e 100%)',
  Other: 'linear-gradient(135deg, #292524 0%, #44403c 60%, #57534e 100%)',
};

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function FishImage({ name, scientificName, size = 'card', className = '', record = null }) {
  const [imgError, setImgError] = useState(false);
  const slug = slugify(name);
  // categorizeSpecies expects a record object, not a string
  const fakeRecord = record || { common_name: name, country: '' };
  const categories = categorizeSpecies(fakeRecord);
  const category = categories.length > 0 ? categories[0] : 'Other';
  const gradient = categoryGradients[category] || categoryGradients.Other;

  // Get first letter of the common name (after the comma if present)
  const displayName = name.includes(',') ? name.split(',')[0].trim() : name;
  const initial = displayName.charAt(0).toUpperCase();

  const sizeStyles = {
    card: { height: '180px' },
    detail: { height: '320px' },
    hero: { height: '400px' },
  };

  const containerStyle = {
    width: '100%',
    ...sizeStyles[size],
    overflow: 'hidden',
    position: 'relative',
  };

  if (imgError) {
    // Stylish placeholder
    return (
      <div className={className} style={{ ...containerStyle, background: gradient }}>
        {/* Subtle wave pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Cpath d='M0,100 Q200,50 400,100 T800,100 L800,200 L0,200 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '400px 100px',
            backgroundPosition: 'bottom',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: size === 'card' ? '3rem' : '5rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.15)',
              lineHeight: 1,
            }}
          >
            {initial}
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginTop: '0.5rem',
            }}
          >
            {category}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <img
        src={`/fish-images/${slug}.jpg`}
        alt={name}
        onError={() => setImgError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />
    </div>
  );
}
