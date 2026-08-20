import { Link } from 'react-router-dom';

export default function Button({ to, children, variant = 'primary', className = '' }) {
  return <Link className={`button button-${variant} ${className}`} to={to}>{children}</Link>;
}
