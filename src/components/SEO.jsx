import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://avishkaar.co";
const DEFAULT_TITLE = "Avishkaar Season 4 | National Innovation Hackathon 2026 - AITAM";
const DEFAULT_DESC =
  "Avishkaar Season 4 is India's premier national innovation hackathon organized by AITAM. 48-hour challenge across AI, Web3, IoT, and Robotics with ₹1,00,000+ prize pool.";

const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
};

export default function SEO({
  title,
  description = DEFAULT_DESC,
  keywords,
  canonicalPath,
  ogType = "website",
  schemaJson,
}) {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === "/" ? "" : currentPath}`;
  const fullTitle = title ? `${title} | Avishkaar Season 4` : DEFAULT_TITLE;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Standard Meta
    setMetaTag("name", "title", fullTitle);
    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }

    // Canonical
    setCanonical(canonicalUrl);

    // Open Graph
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);

    // Twitter Card
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);

    // Optional dynamic JSON-LD injection
    let scriptTag = null;
    if (schemaJson) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.id = "page-dynamic-schema";
      scriptTag.text = JSON.stringify(schemaJson);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [fullTitle, description, keywords, canonicalUrl, ogType, schemaJson]);

  return null;
}
