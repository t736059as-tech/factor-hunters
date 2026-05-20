export default function TabMenu({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? 'active' : ''}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
