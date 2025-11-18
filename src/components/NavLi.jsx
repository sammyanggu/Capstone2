// Shared component for documentation navigation
import React from 'react';

export default function NavLi({ href, children }) {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    // Check if this section is active when component mounts and when URL hash changes
    const checkActive = () => {
      setIsActive(window.location.hash === href);
    };

    checkActive(); // Initial check
    window.addEventListener('hashchange', checkActive);
    
    return () => window.removeEventListener('hashchange', checkActive);
  }, [href]);

  return (
    <li>
      <a href={href} className={`block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-600 transition ${isActive ? 'text-emerald-400' : ''}`}>
        {children}
      </a>
    </li>
  );
}