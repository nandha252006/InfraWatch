# InfraWatch - Self-Hosted Infrastructure Monitoring & Alerting Platform

A modern, enterprise-grade, responsive web application for infrastructure monitoring and alerting, designed for network engineers, backend engineers, and SREs.

## Features

- 🎨 **Modern UI**: Dark mode default with glassmorphism effects
- 📊 **Real-time Monitoring**: Live metrics, charts, and alerts
- 🖥️ **Server Management**: Complete CRUD operations for server inventory
- 🚨 **Alert Management**: Acknowledge, silence, and filter alerts
- 📈 **Metrics Analytics**: Query builder with PromQL-style syntax
- 👥 **RBAC**: Role-based access control (Admin, SRE, Viewer)
- 🔔 **Notifications**: Email, Slack, and Webhook integration tracking
- ⚙️ **Configurable**: Polling intervals, thresholds, and retention policies
- 🔐 **Security**: MFA, API tokens, and session management

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with sidebar
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── TopBar.jsx      # Top navigation bar
│   ├── MetricCard.jsx  # Metric display card
│   ├── Chart.jsx       # Chart wrapper component
│   └── ...
├── pages/              # Page components
│   ├── Login.jsx      # Authentication page
│   ├── Dashboard.jsx  # Main dashboard
│   ├── Servers.jsx    # Server inventory
│   ├── Alerts.jsx     # Alerts management
│   └── ...
├── services/          # Data services
│   └── dummyData.js   # Dummy data for development
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Pages

1. **Dashboard**: Real-time overview with metric cards and charts
2. **Servers**: Server inventory with health monitoring
3. **Server Detail**: Detailed server metrics and service probes
4. **Alerts**: Alert management with filters and actions
5. **Metrics**: Analytics with query builder
6. **Notifications**: Delivery status tracking
7. **Users & RBAC**: User management and permissions
8. **Settings**: System configuration
9. **Profile**: User profile and session management

## Authentication

Currently uses localStorage for demo purposes. In production, integrate with your authentication backend.

**Demo**: Use any username/password to login.

## Customization

### Fonts

The app expects custom fonts in `/public/assets/fonts/`:
- Mona Sans (Regular, Medium, Bold) - WOFF2 format
- Hubot Sans (Regular, Bold) - WOFF2 format

For now, the app will fall back to system fonts if these are not available.

### Colors

Colors can be customized in `tailwind.config.js` and `src/index.css`.

## Future Enhancements

- WebSocket integration for real-time updates
- Backend API integration
- Service Worker for offline support
- IndexedDB for local caching
- Background images in `/public/assets/`
- Full TypeScript migration

## License

MIT
