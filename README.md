# ✍️ CRDT Collaborative Editor

> Real-time, conflict-free collaborative editing for the web.

## The Problem

Automattic tried to bring real-time collaboration to WordPress 7.0. It was pulled at the last minute because of technical problems at scale. Multiple users editing the same post caused merge conflicts, data loss, and sync failures. 

Competitors like Notion and Google Docs solved this years ago using Conflict-Free Replicated Data Types (CRDTs). WordPress never did.

## The Solution

A real-time collaborative text editor built on CRDTs. Two users type in the same document at the same time. Both see the other's changes instantly. No conflicts. No data loss. No central server needed.

## 🚀 Features

- 🔄 **Real-Time Sync** — Text updates appear instantly across all connected clients
- 🧠 **Conflict-Free** — Powered by Yjs, the industry-standard CRDT engine
- 👥 **Multi-User Presence** — Shows live user count and connection status
- ⚡ **WebSocket Transport** — Fast, bidirectional communication
- 🎨 **Modern UI** — Next.js + Tailwind CSS dark mode interface

## ⚙️ Quick Start

### 1. Start the Sync Server
cd server
npm install
npm start

### 2. Start the Client
cd client
npm install
npm run dev

### 3. Test It
Open http://localhost:3000 in two browser tabs side by side.
Type in one tab. Watch it appear in the other instantly.

## 🧠 How It Works

1. **Yjs** creates a CRDT document for the shared text
2. **WebSocket Server** syncs the document state across all connected clients
3. **Awareness Protocol** tracks user presence and cursors
4. **React Client** renders the textarea and binds it to the Yjs document
5. **CRDT Algorithm** automatically resolves any conflicts without a central authority

## 🎯 Why This Matters

- **WordPress 7.0 Failure** — This is the exact feature Automattic abandoned
- **Competitive Gap** — Notion, Google Docs, and Coda all have this; WordPress doesn't
- **Scalable** — CRDTs work offline and sync when reconnected, no central server required

## 👤 Author

Built by [Abhisharydv90](https://github.com/Abhisharydv90).  