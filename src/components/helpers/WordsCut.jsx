const wordsHandler = (name, len) => {
  return name.length > len ? name.slice(0, len) + "...see" : name;
};

export default wordsHandler;
