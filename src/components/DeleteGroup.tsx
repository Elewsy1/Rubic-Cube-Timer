import React, { useState } from 'react';

interface DeleteGroupProps {
  groups: string[];
  onDelete: (groupName: string) => void;
}

export default function DeleteGroup({ groups, onDelete }: DeleteGroupProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = () => {
    if (groups.length <= 1) {
      setErrorMessage('Cannot delete the only remaining group.');
      return;
    }

    if (selectedGroup) {
      onDelete(selectedGroup);
      setSelectedGroup('');
      setShowModal(false);
      setErrorMessage('');
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete a group</button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '20px',
          zIndex: 1000
        }}>
          <h3>Select a group to delete</h3>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <option value="" disabled>Select group</option>
            {groups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
          )}

          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => {
              setShowModal(false);
              setErrorMessage('');
            }} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
