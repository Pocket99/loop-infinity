import React from 'react';

const StoryCard = ({ story }) => {
  return (
    <div className="story-card">
      <img src={story.imageURL} alt={story.title} />
      <h2>{story.title}</h2>
      <p>{story.summary}</p>
      {/* Additional story details like author, date, etc. */}
      <button>Read More</button>
    </div>
  );
};

export default StoryCard;
