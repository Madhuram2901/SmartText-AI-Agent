# ✨ SmartMail AI – Universal Tone Rewriter Chrome Extension

**SmartMail AI** is a privacy-first Chrome extension that transforms selected text on **any website** into your desired tone — Formal, Casual, Professional, or Funny — using **locally hosted LLMs** (via Ollama + FastAPI). 

All rewriting happens **offline and securely on your machine** using models like Mistral or LLaMA3.

---

## 🔍 What It Does

> Select any text on any web page → Right-click → Choose a tone → Get rewritten text instantly  
> No cloud APIs. No data leaks. Just smart, local rewriting.

---

## ✨ Features

- 🖱 **Universal Rewriting** – Works on any website: Gmail, Notion, LinkedIn, blogs, etc.
- 🧠 **Tone Options** – Formal, Casual, Funny, and Professional
- 🧩 **Right-click Menu or Floating Toolbar** – Choose tone from either method
- 🛡️ **Fully Local AI** – Powered by Ollama + FastAPI, runs offline
- 🔁 **Clipboard & Replace Support** – Copy or auto-replace editable text (optional)

---

## 🧠 Use Cases

- Rewrite an email in Gmail  
- Fix your bio on LinkedIn  
- Make a tweet sound wittier  
- Polish your reply in Reddit or ChatGPT  
- Improve tone in blog editors or documents  

---

## 🛠 Tech Stack

| Layer         | Tool                      | Description                                |
|--------------|---------------------------|--------------------------------------------|
| Extension UI | Chrome Extension (MV3)    | Toolbar + Context Menu + Event Scripts     |
| Backend      | FastAPI                   | Handles local rewrite requests             |
| AI Engine    | Ollama + Mistral/LLaMA3   | Local LLM model powering tone conversion   |
| Transport    | HTTP (localhost)          | Extension ↔ Backend communication          |

---

## 🚀 Demo Flow (Coming Soon)

1. Select text on any webpage  
2. Right-click → “Rewrite with SmartMail AI”  
3. Choose a tone → Formal / Casual / Funny / Professional  
4. Text is rewritten and shown in a popup with copy/replace options  

---


