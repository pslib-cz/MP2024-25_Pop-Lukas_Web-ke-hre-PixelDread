import React, { useState } from 'react';

interface NameAdderProps {
    onUpdateName: (name: string) => void;
}

const NameAdder: React.FC<NameAdderProps> = ({ onUpdateName }) => {
    const [name, setName] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length <= 30) {
            setName(value);
            onUpdateName(value);
        }
    };

    return (
        <div>
            <label>
                Name: <input type="text" value={name} onChange={handleInputChange} />
            </label>
        </div>
    );
};

export default NameAdder;