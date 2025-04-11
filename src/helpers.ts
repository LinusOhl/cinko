export const IMAGES_BASE_URL = "https://image.tmdb.org/t/p";

export const getGender = (genderNumber?: number) => {
  switch (genderNumber) {
    case 0:
      return "Not specified";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
    default:
      return "Not specified";
  }
};
