export default function SectionHeading({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
