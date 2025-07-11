import React, { useState, useEffect } from 'react';
import './Home.css';
import Timer from '../components/Timer';
import GroupSelector from '../components/GroupSelector';
import ScoreList from '../components/ScoreList';
import CreateNewGroup from '../components/NewGroup';
import DeleteGroup from '../components/DeleteGroup';

export default function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [scoresByGroup, setScoresByGroup] = useState<{ [group: string]: number[] }>({});

  useEffect(() => {
    const fetchGroupsAndScores = async () => {
      let groupRes = await fetch('http://localhost:3001/api/groups');
      let groupList = await groupRes.json();

      if (groupList.length === 0) {
        await fetch('http://localhost:3001/api/groups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Group 1' }),
        });
        groupList = ['Group 1'];
      }

      setGroups(groupList);
      setSelectedGroup(groupList[0]);

      const scoresMap: { [group: string]: number[] } = {};
      for (const group of groupList) {
        const scoreRes = await fetch(`http://localhost:3001/api/scores/${group}`);
        const scoreList = await scoreRes.json();
        scoresMap[group] = scoreList;
      }
      setScoresByGroup(scoresMap);
    };

    fetchGroupsAndScores();
  }, []);

  const handleSaveTime = async (newTime: number) => {
    if (!selectedGroup) return;

    await fetch('http://localhost:3001/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group: selectedGroup, time: newTime }),
    });

    setScoresByGroup((prev) => ({
      ...prev,
      [selectedGroup]: [...(prev[selectedGroup] || []), newTime],
    }));
  };

  const handleNewGroup = async (newGroup: string) => {
    await fetch('http://localhost:3001/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGroup }),
    });

    setGroups((prev) => [...prev, newGroup]);
    setScoresByGroup((prev) => ({ ...prev, [newGroup]: [] }));
    setSelectedGroup(newGroup);
  };

  const handleDeleteGroup = (groupName: string) => {
    setGroups((prev) => prev.filter((g) => g !== groupName));
    setScoresByGroup((prev) => {
      const newScores = { ...prev };
      delete newScores[groupName];
      return newScores;
    });

    // 切换到另一个存在的组
    setSelectedGroup((prev) =>
      groupName === prev && groups.length > 1
        ? groups.find((g) => g !== groupName) || null
        : prev
    );
  };

  const handleDeleteAll = async () => {
    if (!selectedGroup) return;

    await fetch(`http://localhost:3001/api/scores/${selectedGroup}`, {
      method: 'DELETE',
    });

    setScoresByGroup((prev) => ({
      ...prev,
      [selectedGroup]: [],
    }));
  };

  const handleDeleteLastN = async (n: number) => {
    if (!selectedGroup) return;

    await fetch(`http://localhost:3001/api/scores/${selectedGroup}/last/${n}`, {
      method: 'DELETE',
    });

    setScoresByGroup((prev) => {
      const existing = prev[selectedGroup] || [];
      return {
        ...prev,
        [selectedGroup]: existing.slice(0, -n),
      };
    });
  };

  if (!selectedGroup) return <div>Loading...</div>;

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
