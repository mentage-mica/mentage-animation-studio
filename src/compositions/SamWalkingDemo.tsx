import React from 'react';
import { AbsoluteFill } from 'remotion';
import { mentageTheme } from '../theme/mentageTheme';

  export const SamWalkingDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: mentageTheme.colors.offWhite }}>
      <div style={{ padding: 60, color: mentageTheme.colors.darkCharcoal }}>
        <h1 style={{ fontSize: 72, marginBottom: 40 }}>Sam Walking Demo</h1>
        <p style={{ fontSize: 20 }}>Character animation composition - 12 seconds</p>
      </div>
      <div style={{
        position: 'absolute',
        bottom: 40,
        right: 60,
        color: mentageTheme.colors.deepGreen,
        fontSize: 20,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 3,
}}>
        Mentage
      </div>
    </AbsoluteFill>
  );
};
