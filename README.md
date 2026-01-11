<div align="center">

<h3>🔄 Automation Workflow (Miro Board View)</h3>

```mermaid
graph TD
    %% --- GLOBAL STYLING (Miro Feel) ---
    %% Google Sheet: Green
    classDef sheet fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,rx:10,ry:10;
    %% Google Apps Script: Post-it Yellow
    classDef script fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,stroke-dasharray: 5 5,rx:5,ry:5;
    %% Triggers: Action Orange
    classDef trigger fill:#FFF3E0,stroke:#E65100,stroke-width:2px,rx:5,ry:5;
    %% Slack: Brand Purple
    classDef slack fill:#4A154B,stroke:#000,stroke-width:2px,color:#fff,rx:5,ry:5;
    
    %% --- NODES ---
    %% We use quotes " " inside the brackets to allow special characters like ()
    Sheet[("📄 Google Sheet<br/>(Data Source)")]:::sheet
    
    subgraph " "
        direction TB
        Script("⚡ Google Apps Script<br/>Logic Controller"):::script
    end

    %% --- TRIGGERS ---
    %% Times removed, descriptive logic added
    T1{{"⏰ Daily Trigger<br/>(Tomorrow's Joiner)"}}:::trigger
    T2{{"⏰ Daily Trigger<br/>(10 Days Before Joining)"}}:::trigger
    T3{{"📅 Weekly Trigger<br/>(Next 14 Days)"}}:::trigger

    %% --- FLOW ---
    Sheet ==> Script
    
    Script --> T1
    Script --> T2
    Script --> T3

    %% --- LOGIC BRANCHES ---
    %% Quotes added here to fix the Parse Error, and "via Webhook" added
    T1 -- "Date = Tomorrow?" --> Alert1["🚀 Send to Slack<br/>(via Webhook)"]:::slack
    T2 -- "Date = Today + 10?" --> Alert2["⚠️ Send to Slack<br/>(via Webhook)"]:::slack
    T3 -- "Date = Next 14 Days?" --> Alert3["📅 Send to Slack<br/>(via Webhook)"]:::slack

    %% --- LINKS ---
    linkStyle 0 stroke:#333,stroke-width:2px;
    linkStyle 1,2,3 stroke:#333,stroke-width:2px;