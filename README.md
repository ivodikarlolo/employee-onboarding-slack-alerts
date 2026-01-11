# 🚀 Google Sheets to Slack: Employee Onboarding Automation

> **Automated HR & BizOps notifications driven by Google Sheets data.**
> *Replaces expensive HRMS triggers and manual memory tracking with a custom, zero-cost solution.*

---

## 🧐 The Challenge
Before this automation, the HR & BizOps team faced significant operational inefficiencies:

* **🧠 Reliance on Memory:** The team tracked new joiners and critical dates purely by memory. There was no central digital trigger system, leading to high cognitive load and the risk of forgetting tasks during busy periods.
* **💰 Cost Constraints (Keka HRMS):** While the company used **Keka** for HR management, the specific automation triggers required for this workflow were behind a paywall (premium feature).
* **⚠️ Compliance & Planning Risks:** Without automated alerts, initiating Background Verification (BGV) on time (T-10 days) and planning for upcoming joiners became reactive rather than proactive.

## 💡 The Solution
Instead of purchasing expensive HRMS add-ons, I engineered a **custom, cost-effective middleware** using Google Sheets and Google Apps Script.

**How I solved it:**
I created a centralized Google Sheet to act as the "Trigger Engine." I wrote a script that runs daily checks against this data and sends Webhook notifications to Slack, effectively solving three distinct problems at once:

1.  **Daily Operations:** A "Heads Up" alert for joiners arriving tomorrow (replaces memory).
2.  **HR Compliance:** An automatic trigger to start BGV 10 days prior (standardizes the process).
3.  **Weekly Planning:** A Friday forecast of all joiners for the next 14 days (improves team readiness).

---

## 🔄 Workflow Architecture

<div align="center">

```mermaid
graph TD
    %% --- GLOBAL STYLING ---
    %% Google Sheet: Green
    classDef sheet fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,rx:10,ry:10;
    %% Google Apps Script: Post-it Yellow
    classDef script fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,stroke-dasharray: 5 5,rx:5,ry:5;
    %% Triggers: Action Orange
    classDef trigger fill:#FFF3E0,stroke:#E65100,stroke-width:2px,rx:5,ry:5;
    %% Slack: Brand Purple
    classDef slack fill:#4A154B,stroke:#000,stroke-width:2px,color:#fff,rx:5,ry:5;
    
    %% --- NODES ---
    Sheet[("📄 Google Sheet<br/>(Data Source)")]:::sheet
    
    subgraph " "
        direction TB
        Script("⚡ Google Apps Script<br/>Logic Controller"):::script
    end

    %% --- TRIGGERS ---
    T1{{"⏰ Daily Trigger<br/>(Tomorrow's Joiner)"}}:::trigger
    T2{{"⏰ Daily Trigger<br/>(10 Days Before Joining)"}}:::trigger
    T3{{"📅 Weekly Trigger<br/>(Next 14 Days)"}}:::trigger

    %% --- FLOW ---
    Sheet ==> Script
    
    Script --> T1
    Script --> T2
    Script --> T3

    %% --- LOGIC BRANCHES ---
    T1 -- "Date = Tomorrow?" --> Alert1["🚀 Send to Slack<br/>(via Webhook)"]:::slack
    T2 -- "Date = Today + 10?" --> Alert2["⚠️ Send to Slack<br/>(via Webhook)"]:::slack
    T3 -- "Date = Next 14 Days?" --> Alert3["📅 Send to Slack<br/>(via Webhook)"]:::slack

    %% --- LINKS ---
    linkStyle 0 stroke:#333,stroke-width:2px;
    linkStyle 1,2,3 stroke:#333,stroke-width:2px;
</div>

    employee-onboarding-slack-alerts/
├── doc/
│   └── manual_setup.md       # 📖 Guide for setting up Triggers in UI
├── src/
│   ├── daily-reminder.js     # ⚡ Operations Logic (T+1 Day)
│   ├── bgv-trigger.js        # ⚡ Compliance Logic (T+10 Days)
│   ├── weekly-summary.js     # ⚡ Planning Logic (Friday Forecast)
│   └── utils.js              # 🛠️ Shared Helpers (Date formatting, API)
├── appsscript.json           # ⚙️ Manifest & Permissions
└── README.md                 # 📄 Project Documentation