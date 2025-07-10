import React, { useState } from 'react';
import Timer from '../components/Timer';
import GroupSelector from '../components/GroupSelector';
import ScoreList from '../components/ScoreList';
import CreateNewGroup from '../components/NewGroup';


export default function Home() {
  const [groups, setGroups] = useState(['Group 1']);
  const [selectedGroup, setSelectedGroup] = useState('Group 1');
  const [scoresByGroup, setScoresByGroup] = useState<{ [group: string]: number[] }>({
    'Group 1': [],
  });

  const handleSaveTime = (newTime: number) => {
    setScoresByGroup((prev) => ({
      ...prev,
      [selectedGroup]: [...prev[selectedGroup], newTime],
    }));
  };

  const handleNewGroup = (newGroup: string) => {
    setGroups((prev) => (
      [...prev, newGroup])
    );
    setScoresByGroup((prev) =>({
      ...prev,
      [newGroup]:[]
    })
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Rubic Cube Timer</h2>

      <GroupSelector
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
      />

      <CreateNewGroup onSave={handleNewGroup}/>

      <Timer onSave={handleSaveTime} />

      <ScoreList scores={scoresByGroup[selectedGroup] || []} groupName={selectedGroup} />
    </div>
  );
}
