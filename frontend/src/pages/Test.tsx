import React, { useState } from 'react';

const Test: React.FC = () => {
    const [output_test_1, setOutput1] = useState<string>('');
    const [output_test_2, setOutput2] = useState<string>('');
    const [input, setInput] = useState<string>('');

    const handleSimpleTest = async () => {
        const res = await fetch('/api/test')
            .then(res => res.text())
            .then(data => {
                setOutput1(data);
            });
    };

    const handleInputTest = async () => {
        // Placeholder for API call with input
        console.log('Input value:', input);
        const res = await fetch(`/api/test/${input}`)
            .then(res => res.text())
            .then(data => {
                setOutput2(data);
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <h2>Simple API Test</h2>
                <button onClick={handleSimpleTest}>
                    Test API
                </button>
                <textarea 
                    value={output_test_1}
                    readOnly
                    style={{ 
                        display: 'block', 
                        marginTop: '10px',
                        width: '300px',
                        height: '100px'
                    }}
                />
            </div>

            <div style={{ marginTop: '30px' }}>
                <h2>API Test with Input</h2>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleInputTest}>
                    Test with Input
                </button>
                <textarea 
                    value={output_test_2}
                    readOnly
                    style={{ 
                        display: 'block', 
                        marginTop: '10px',
                        width: '300px',
                        height: '100px'
                    }}
                />
            </div>
        </div>
    );
};

export default Test;