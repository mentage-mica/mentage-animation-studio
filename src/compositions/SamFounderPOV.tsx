import React from "react";
import { AbsoluteFill } from "remotion";
import { mentageTheme } from "../theme/mentageTheme";

export const SamFounderPOV: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: mentageTheme.colors.offWhite }}>
      <div style={{ padding: 60, color: mentageTheme.colors.darkCharcoal }}>
        <h1 style={{ fontSize: 72, marginBottom: 40 }}>Founder POV</h1>
        <p style={{ fontSize: 20, maxWidth: 800 }}>
          A video series exploring insights from founders and mentors.
        </p>
      </div>
    </AbsoluteFill>
  );
};
