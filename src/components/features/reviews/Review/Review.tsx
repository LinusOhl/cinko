import {
  Accordion,
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { RatingScores } from "../../ratings/MovieRatings/MovieRatings.parts";

export const Review = () => {
  return (
    <Paper p="xs" shadow="md">
      <Stack gap="xs">
        <Group>
          <Avatar>SB</Avatar>

          <Text>Simon Belmont</Text>
        </Group>

        <Text fz="xl" fw={600}>
          Review title
        </Text>

        <Text lineClamp={3}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque omnis
          ea aliquid cupiditate harum debitis vitae dolorum reiciendis
          recusandae blanditiis nesciunt, culpa, error ipsam vero soluta eius
          quam rem exercitationem?
        </Text>

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
      </Stack>
    </Paper>
  );
};
