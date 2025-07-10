import React, { useState, useEffect } from 'react';

interface NameProps{
    onSave: (Group: string) => void;
}

export default function CreateNewGroup({onSave} : NameProps){

    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleSave = () => {
    if (groupName.trim() !== '') {
        onSave(groupName.trim());
        setGroupName('');
        setShowModal(false);
    }
    };

    return (
    <div>
        <button onClick={() => setShowModal(true)}>Create a new group</button>

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
            <h3>Please enter the group name</h3>
            <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ marginBottom: '10px' }}
            />
            <div>
            <button onClick={handleSave}>save</button>
            <button onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>
                cancel
            </button>
            </div>
        </div>
        )}
    </div>
    );
}