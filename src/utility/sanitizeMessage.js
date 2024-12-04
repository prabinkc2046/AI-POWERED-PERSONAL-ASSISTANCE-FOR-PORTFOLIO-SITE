export const sanitizeMessage = message => {
  return message
    .replace(/['"?!:;,.\/\\@#$%^&*()_+\-=[\]{}|<>`~]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
};
