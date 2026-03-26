import { Tooltip } from "@mantine/core";
import {
  IconMoodCrazyHappy,
  IconMoodCry,
  IconMoodHappy,
  IconMoodSad,
  IconMoodSmile,
} from "@tabler/icons-react";

export const getIconStyle = (color?: string) => ({
  width: 32,
  height: 32,
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

export const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle();

  switch (value) {
    case 1:
      return <IconMoodCry style={iconStyle} />;
    case 2:
      return <IconMoodSad style={iconStyle} />;
    case 3:
      return <IconMoodSmile style={iconStyle} />;
    case 4:
      return <IconMoodHappy style={iconStyle} />;
    case 5:
      return <IconMoodCrazyHappy style={iconStyle} />;
    default:
      return null;
  }
};

export const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return (
        <Tooltip label="Terrible" withArrow>
          <IconMoodCry style={getIconStyle("red")} />
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip label="Bad" withArrow>
          <IconMoodSad style={getIconStyle("orange")} />
        </Tooltip>
      );
    case 3:
      return (
        <Tooltip label="Okay" withArrow>
          <IconMoodSmile style={getIconStyle("yellow")} />
        </Tooltip>
      );
    case 4:
      return (
        <Tooltip label="Good" withArrow>
          <IconMoodHappy style={getIconStyle("lime")} />
        </Tooltip>
      );
    case 5:
      return (
        <Tooltip label="Great" withArrow>
          <IconMoodCrazyHappy style={getIconStyle("green")} />
        </Tooltip>
      );
    default:
      return null;
  }
};
