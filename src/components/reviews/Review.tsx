import {
  Accordion,
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconStarFilled,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import { RatingScores } from "../ratings/MovieRatings.parts";

interface ReviewProps {
  title: string;
  author: string;
  simplified?: boolean;
}

export const Review = ({ title, author, simplified }: ReviewProps) => {
  const theme = useMantineTheme();

  return (
    <Paper p="xs" shadow="md">
      <Stack gap="xs">
        <Group justify="space-between">
          <Group align="center" gap="0.4rem">
            <IconStarFilled
              color={theme.colors.cinkoYellow[6]}
              size={theme.fontSizes.md}
            />

            <Text fz="h4" fw={600} c="white">
              4.3/5
            </Text>
          </Group>

          <Group>
            <Avatar>{author}</Avatar>

            <Text>{author}</Text>
          </Group>
        </Group>

        <Text fz="xl" fw={600}>
          {title}
        </Text>

        <Text lineClamp={3}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque omnis
          ea aliquid cupiditate harum debitis vitae dolorum reiciendis
          recusandae blanditiis nesciunt, culpa, error ipsam vero soluta eius
          quam rem exercitationem?
        </Text>

        {!simplified ? (
          <>
            <Group>
              <ActionIcon.Group>
                <ActionIcon variant="default" size="lg">
                  <IconThumbUp size={20} />
                </ActionIcon>
                <ActionIcon variant="default" size="lg">
                  <IconThumbDown size={20} />
                </ActionIcon>
              </ActionIcon.Group>

              <Text>31,284 likes</Text>
            </Group>

            <Accordion>
              <Accordion.Item value="ratings">
                <Accordion.Control>Ratings</Accordion.Control>
                <Accordion.Panel>
                  <RatingScores
                    actingScore={3}
                    aestheticsScore={3}
                    cinematographyScore={3}
                    directionScore={3}
                    editingScore={3}
                    effectsScore={3}
                    musicScore={3}
                    soundScore={3}
                    writingScore={3}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </>
        ) : (
          <Group justify="end">
            <Avatar>{author}</Avatar>

            <Text>{author}</Text>
          </Group>
        )}
      </Stack>
    </Paper>
  );
};
