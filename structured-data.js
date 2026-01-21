// structured-data.js
const script = document.createElement('script');
script.type = "application/ld+json";
script.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nathaniel Andrei Gonzales",
  "url": "https://nathprofile.netlify.app",
  "sameAs": [
    "https://www.linkedin.com/in/your-linkedin",
    "https://github.com/your-github"
  ]
});
document.head.appendChild(script);
