import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import HomeTab from './HomeTab';

const App: React.FC = () => {
  return (
    <div className="App">
      <Pivot>
        <PivotItem headerText="Home">
          <HomeTab />
        </PivotItem>
        <PivotItem headerText="Pdf Title"></PivotItem>
      </Pivot>
    </div>
  );
};

export default App;
