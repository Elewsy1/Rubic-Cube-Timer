import React, { useState } from 'react';
import './Home.css';
import Timer from '../components/Timer';
import GroupSelector from '../components/GroupSelector';
import ScoreList from '../components/ScoreList';
import CreateNewGroup from '../components/NewGroup';
import DeleteGroup from '../components/DeleteGroup';


export default function Home() {
  const [groups, setGroups] = useState(['Group 1']);
  const [selectedGroup, setSelectedGroup] = useState('Group 1');
  const [scoresByGroup, setScoresByGroup] = useState<{ [group: string]: number[] }>({
    'Group 1': [],
  });

  // Get the time
  const handleSaveTime = (newTime: number) => {
    setScoresByGroup((prev) => ({
      ...prev,
      [selectedGroup]: [...prev[selectedGroup], newTime],
    }));
  };

  // Get the new group
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

  // Delete a group
  const handleDeleteGroup = (groupName: string) => {
    setGroups((prev) => prev.filter((g) => g !== groupName));
    setScoresByGroup((prev) => {
      const newScores = { ...prev };
      delete newScores[groupName];
      return newScores;
    });
    setSelectedGroup((prev) => (groupName === prev && groups.length > 1 ? groups[0] : prev));
  };

  const handleDeleteLastN = (n: number) => {
    setScoresByGroup((prev) => {
      const updatedScores = prev[selectedGroup].slice(0, -n);
      return {
        ...prev,
        [selectedGroup]: updatedScores,
      };
    });
  };

  const handleDeleteAll = () => {
    setScoresByGroup((prev) => ({
      ...prev,
      [selectedGroup]: [],
    }));
  };
  return (
    <div style={{ textAlign: 'center' }}>
    <h2>Rubic Cube Timer</h2>

    <GroupSelector
      groups={groups}
      selectedGroup={selectedGroup}
      onSelectGroup={setSelectedGroup}
    />

    <CreateNewGroup onSave={handleNewGroup} />
    <DeleteGroup groups={groups} onDelete={handleDeleteGroup} />

    <div className="layout-container">
      <div className="score-panel">
        <ScoreList
          scores={scoresByGroup[selectedGroup] || []}
          groupName={selectedGroup}
          onDeleteLastN={handleDeleteLastN}
          onDeleteAll={handleDeleteAll}
        />
      </div>
      <div className="timer-panel">
        <Timer onSave={handleSaveTime} />
      </div>
    </div>
  </div>
  );
}
