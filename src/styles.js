// src/styles.js

export const commonTextStyles = {
  truncated: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  truncatedMultiline: lines => ({
    display: '-webkit-box',
    WebkitLineClamp: lines, // Specify the number of lines to show
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};
