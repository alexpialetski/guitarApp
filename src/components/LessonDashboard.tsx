import React, { useMemo } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import { LessonCard } from "components/LessonCard";
import { LessonConfig } from "types/lesson";

const CardLink = styled(Link)({ textDecoration: "none" });
const SummaryTypography = styled(Typography)(() => ({
  width: "33%",
  flexShrink: 0,
  fontWeight: "bold",
}));

type KeyLessonConfig<TGroups> = {
  key: string;
  config: LessonConfig<TGroups>;
};

export const groupLessons = <TGroups extends string>(
  lessons: Map<string, LessonConfig<TGroups>>
): Partial<Record<TGroups | "unknown", KeyLessonConfig<TGroups>[]>> =>
  Array.from(lessons.entries()).reduce<
    Partial<Record<TGroups | "unknown", KeyLessonConfig<TGroups>[]>>
  >((acc, [key, config]) => {
    if (!config.group) {
      if (!acc.unknown?.length) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc.unknown = [];
      }
      acc.unknown.push({ key, config });
    } else {
      if (!acc[config.group]?.length) {
        acc[config.group] = [];
      }
      acc[config.group]?.push({ key, config });
    }
    return acc;
  }, {});

export const LessonDashboard = <TGroups extends string>({
  lessons,
}: {
  lessons: Map<string, LessonConfig<TGroups>>;
}): JSX.Element => {
  const [expanded, setExpanded] = React.useState<TGroups | false>(false);

  const groupedLessons = useMemo(() => groupLessons(lessons), [lessons]);
  console.log(groupedLessons);

  const handleChange =
    (panel: TGroups) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {(
        Object.entries(groupedLessons) as Array<
          [TGroups | "unknown", KeyLessonConfig<TGroups>[]]
        >
      )
        .sort((a) => (a[0] === "unknown" ? 1 : 0))
        .map(([group, lessonConfigs]) => {
          const lessonGrid = (
            <Grid container spacing={2} justifyContent="center">
              {lessonConfigs.map(({ key, config }) => (
                <Grid key={key} item md={4} sm={6} xs={12}>
                  <CardLink to={`/lesson/${key}`}>
                    <LessonCard {...config} />
                  </CardLink>
                </Grid>
              ))}
            </Grid>
          );
          if (group === "unknown") {
            return lessonGrid;
          }

          return (
            <Accordion
              expanded={expanded === group}
              onChange={handleChange(group)}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${group}-content`}
                id={`${group}-header`}
              >
                <SummaryTypography variant="h5">{group}</SummaryTypography>
              </AccordionSummary>
              <AccordionDetails>{lessonGrid}</AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
};
