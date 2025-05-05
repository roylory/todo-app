import React from "react";

interface FooterProps {
  version: string;
}

const Footer: React.FC<FooterProps> = ({ version }) => (
  <footer className="py-4 text-center text-gray-500 text-sm">
    v{version}
  </footer>
);

export default Footer;