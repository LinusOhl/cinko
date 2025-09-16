import type { CrewCredit } from "./types/movies.types";

export const IMAGES_BASE_URL = "http://image.tmdb.org/t/p";

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

export const groupCrewByJob = (crew?: CrewCredit[]) => {
  if (!crew) return;

  const map = new Map<string, CrewCredit[]>();

  for (const member of crew) {
    if (!map.has(member.department)) {
      map.set(member.department, [member]);
    } else {
      map.get(member.department)?.push(member);
    }
  }

  return Array.from(map.entries()).map(([department, members]) => ({
    department,
    members,
  }));
};

export const getAge = (birthDateString?: string) => {
  if (!birthDateString) return;

  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const langToCountry: Record<string, string> = {
  en: "US",
};
