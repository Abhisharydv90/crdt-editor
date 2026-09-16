'use client';

import { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export default function Editor() {
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState(0);
  const [text, setText] = useState('');
  const ytextRef = useRef<Y.Text | null>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider('ws://localhost:1234', 'demo-doc', ydoc);
    const ytext = ydoc.getText('shared-text');
    ytextRef.current = ytext;

    provider.on('status', (event: { status: string }) => {
      setConnected(event.status === 'connected');
    });

    provider.awareness.on('change', () => {
      setUsers(provider.awareness.getStates().size);
    });

    ytext.observe(() => {
      setText(ytext.toString());
    });

    setText(ytext.toString());

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (ytextRef.current) {
      ytextRef.current.delete(0, ytextRef.current.length);
      ytextRef.current.insert(0, newText);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">✍️ CRDT Collaborative Editor</h1>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${connected ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {connected ? 'Connected' : 'Disconnected'}
            </div>
            <div className="text-blue-400">
              👥 {users} user{users !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start typing... Open this page in another tab to see real-time sync."
          className="w-full bg-gray-800 rounded-lg p-6 min-h-[400px] outline-none border border-gray-700 focus:border-blue-500 transition-colors text-lg leading-relaxed resize-none font-mono"
        />

        <div className="mt-6 text-gray-400 text-sm">
          <p>💡 Open this page in another browser tab. Type in both. Watch the magic.</p>
          <p>🔗 Connected to: ws://localhost:1234</p>
        </div>
      </div>
    </div>
  );
}