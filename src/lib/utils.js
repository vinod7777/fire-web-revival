import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function scrollToElement(id, offset = -70) {
  const cleanId = typeof id === 'string' ? id.replace(/^#/, '') : '';
  const el = cleanId ? document.getElementById(cleanId) : id;

  if (window.__lenis) {
    window.__lenis.scrollTo(el || `#${cleanId}`, { offset, duration: 1.2 });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (cleanId) {
    const queried = document.querySelector(`#${cleanId}`);
    if (queried) {
      queried.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
