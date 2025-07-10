import React from 'react';

interface GroupSelectorProps {
  groups: string[];
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
}

export default function GroupSelector({ groups, selectedGroup, onSelectGroup }: GroupSelectorProps) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="group-select" style={{ fontSize: '14px' }}>Select Group: </label>
      <select
        id="group-select"
        value={selectedGroup}
        onChange={(e) => onSelectGroup(e.target.value)}
      >
        {groups.map((group) => (
          <option key={group} value={group}>{group}</option>
        ))}
      </select>
    </div>
  );
}

