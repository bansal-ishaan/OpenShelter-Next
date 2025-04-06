<a id="top"></a>

<pre align="center">
 ██████╗ ██████╗ ███████╗███╗   ██╗     ██████╗██╗  ██╗███████╗██╗     ████████╗███████╗██████╗ 
██╔═══██╗██╔══██╗██╔════╝████╗  ██║    ██╔════╝██║  ██║██╔════╝██║     ╚══██╔══╝██╔════╝██╔══██╗
██║   ██║██████╔╝█████╗  ██╔██╗ ██║   ╚█████╗  ███████║█████╗  ██║        ██║   █████╗  ██████╔╝
██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║     ╚═══██╗██╔══██║██╔══╝  ██║        ██║   ██╔══╝  ██╔══██╗
╚██████╔╝██║     ███████╗██║ ╚████║    ██████╔╝██║  ██║███████╗███████╗   ██║   ███████╗██║  ██║
 ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
</pre>

# 🛠️ OPENShelter — Symbolic of digital protection

OPENShelter is a sleek, responsive Web3-ready frontend boilerplate built using **Next.js 15**, **Tailwind CSS v4**, **TypeScript**, and modern UI utilities like **Radix UI**, **Framer Motion**, and **Lucide Icons**. Ideal for building fast, accessible, and animated dApps.

## 🌍 Problem Statement

Refugees and displaced individuals face systemic challenges due to the **lack of legal identity**, resulting in:

- ❌ No access to banking, microloans, or stable employment  
- 🔓 No privacy: centralized systems expose sensitive data  
- 🤝 No trust: NGOs and governments struggle to verify credentials across borders

---

## ✅ Our Solution

RefugeID leverages cutting-edge Web3 technologies to build a trustless, privacy-preserving identity and financial framework:

### 🧬 Soulbound Tokens (SBTs)
- Non-transferable identity tokens issued by trusted agencies (e.g., UNHCR)
- Store **biometrics**, **education**, **medical history**, and **legal status**
- Immutable and verifiable on-chain

### 🕵️‍♂️ Zero-Knowledge Proofs (ZKPs)
- Refugees can prove statements like:
  - ✅ "I have no criminal record"
  - ✅ "I completed education X"
- Without revealing underlying sensitive data

## 🔐 Core Features

- 🧠 Identity onboarding via NGOs (biometric verification → SBT)
- 🔏 ZK-enabled credential proof without exposing raw data
- 💱 Peer-to-peer or protocol-based lending
- 📱 Wallet and dApp UI with secure login and usage history


## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 15** | React Framework |
| **Tailwind CSS v4** | Utility-first styling |
| **TypeScript** | Static typing |
| **Framer Motion** | Animations |
| **Radix UI** | Accessible UI primitives |
| **Lucide React** | Icon components |
| **next-themes** | Light/Dark mode |
| **clsx** + `class-variance-authority` | Class name utilities |

## **📁 Project Structure**  
```bash
opennext/
├── src/
│   ├── app/                          # Main Next.js app directory
│   │   ├── layout.tsx               # Root layout for the app
│   │   ├── page.tsx                 # Root page (Landing Page)
│   │   └── get-started/page.tsx     # Route: /get-started
│
│   ├── components/                  
│   │   └── ui/                      # Reusable UI components
│   │       ├── navbar.tsx          # Top navigation bar
│   │       ├── hero-section.tsx    # Hero/banner section
│   │       ├── how-it-works.tsx    # Workflow explanation section
│   │       ├── partners-section.tsx# Section showing partners
│   │       ├── footer.tsx          # Page footer
│   │       └── ...                 # Other section components
│
│   └── lib/utils.ts                 # Helper utility functions
│
├── tailwind.config.ts              # TailwindCSS configuration
├── next.config.ts                  # Next.js project configuration
├── package.json                    # Project metadata and dependencies
```

## **📌 Getting Started**  

### **💻 Prerequisites**  
Before you begin, ensure you have the following installed:  
✔ **Git**  
✔ **Node.js** (Recommended: v18.x or later)  
✔ **npm** (Comes with Node.js)  

---

### **⚙️ Installation**  

#### **1️⃣ Fork & Clone the Repository**  
- Navigate to the project repository on GitHub
- Click the "Fork" button in the top-right corner of the page
- This creates a copy of the repository in your GitHub account
- Choose your personal account as the destination for the fork
```bash
git clone https://github.com/<your-username>/student-hub.git
cd student-hub
```

#### **2️⃣ Install Dependencies**  
```bash
npm install
```

#### **3️⃣ Run the Development Server**  
```bash
npm run dev
```

The app will be available at **http://localhost:3000**.  

---

## **⭐ Support & Community**  
- **Have an idea or suggestion?** Open an issue!  
- **Found a bug?** Report it in [GitHub Issues](https://github.com/iiitl/student-hub/issues). 
- **Like the project?** ⭐ Star the repository to support us!  

---

<p align="center">
  <a href="#top">
    <img src="https://img.shields.io/badge/%E2%AC%86-Back%20to%20Top-blue?style=for-the-badge" alt="Back to Top"/>
  </a>
</p>