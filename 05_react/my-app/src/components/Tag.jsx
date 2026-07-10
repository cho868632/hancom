const Tag = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
};

export default Tag;
