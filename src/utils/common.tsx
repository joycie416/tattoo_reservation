const useParseText = (text: string) => {
  const parsedText = text.replaceAll("/n", "<br/>");

  return parsedText;
};
