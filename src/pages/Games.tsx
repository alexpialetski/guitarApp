import React from "react";

import { GAMES } from "constants/games";
import { LessonDashboard } from "components/LessonDashboard";

export const Games: React.FC = () => <LessonDashboard lessons={GAMES} />;
