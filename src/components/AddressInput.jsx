import { useEffect, useRef } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let loader;
function loadPlaces() {
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(API_KEY)}&libraries=places&loading=async`;
      script.async = true;
      script.onload = () => resolve(window.google);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return loader;
}

// Plain text input that gains Google Places autocomplete (US only) when
// VITE_GOOGLE_MAPS_API_KEY is set. Without the key, or if the script fails
// to load, it stays a normal text input, so the form always works.
export default function AddressInput({ onChange, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!API_KEY || !ref.current) return undefined;
    let listener;
    let cancelled = false;

    loadPlaces()
      .then(async (google) => {
        await google.maps.importLibrary('places');
        if (cancelled || !ref.current) return;
        const autocomplete = new google.maps.places.Autocomplete(ref.current, {
          componentRestrictions: { country: 'us' },
          fields: ['formatted_address', 'name'],
        });
        listener = autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          const value = place.formatted_address || place.name || ref.current.value;
          onChange({ target: { name: props.name, value, type: 'text' } });
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (listener) listener.remove();
    };
    // Attach once per mounted input; onChange identity changes every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <input ref={ref} onChange={onChange} {...props} />;
}
