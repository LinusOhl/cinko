import type { CrewCredit } from "./types/movies.types";

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

export const groupCrewByJob = (crew?: CrewCredit[]) => {
  if (!crew) return;

  const map = new Map<string, CrewCredit[]>()

  for (const member of crew) {
    if (!map.has(member.department)) {
      map.set(member.department, [member])
    } else {
      map.get(member.department)?.push(member)
    }
  }

  return Array.from(map.entries()).map(([department, members]) => ({
    department,
    members
  }))
}
