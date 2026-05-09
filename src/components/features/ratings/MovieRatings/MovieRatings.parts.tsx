import {
  Accordion,
  type MantineColor,
  Progress,
  Stack,
  Text,
} from "@mantine/core";

interface RatingScoreProps {
  label: string;
  score: number;
  color: MantineColor;
}

const RatingScore = ({ label, score, color }: RatingScoreProps) => {
  return (
    <Stack gap="xs">
      <Text fz="sm">{label}</Text>
      <Progress value={score} size="xs" color={color} />
    </Stack>
  );
};

interface RatingScoresProps {
  actingScore: number;
  directionScore: number;
  musicScore: number;
  writingScore: number;
  cinematographyScore: number;
  editingScore: number;
  aestheticsScore: number;
  soundScore: number;
  effectsScore: number;
}

export const RatingScores = ({
  actingScore,
  directionScore,
  musicScore,
  writingScore,
  cinematographyScore,
  editingScore,
  aestheticsScore,
  soundScore,
  effectsScore,
}: RatingScoresProps) => {
  return (
    <Stack gap="xs">
      <RatingScore
        label="Acting/Performance"
        score={actingScore * 2 * 10}
        color="cyan"
      />
      <RatingScore
        label="Direction"
        score={directionScore * 2 * 10}
        color="green"
      />
      <RatingScore label="Music" score={musicScore * 2 * 10} color="pink" />
      <RatingScore
        label="Story & Writing"
        score={writingScore * 2 * 10}
        color="grape"
      />

      <Accordion order={3}>
        <Accordion.Item value="technical-scores">
          <Accordion.Control>Technical scores</Accordion.Control>
          <Accordion.Panel>
            <Stack gap="xs">
              <RatingScore
                label="Cinematography"
                score={cinematographyScore * 2 * 10}
                color="orange"
              />
              <RatingScore
                label="Editing"
                score={editingScore * 2 * 10}
                color="indigo"
              />
              <RatingScore
                label="Aesthetics"
                score={aestheticsScore * 2 * 10}
                color="yellow"
              />
              <RatingScore
                label="Sound"
                score={soundScore * 2 * 10}
                color="red"
              />
              <RatingScore
                label="Effects"
                score={effectsScore * 2 * 10}
                color="violet"
              />
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};
