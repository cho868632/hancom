const Link = ({ href, text, icon, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {icon}
      {text}
      {children}
    </a>
  );
};

export default Link;
