
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Workbench from '@/components/Workbench';
import PreviewPane from '@/components/PreviewPane';
import CSSDrawer from '@/components/CSSDrawer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('buttons');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [buttonState, setButtonState] = useState<'base' | 'hover'>('base');
  const [config, setConfig] = useState({
    base: {
      label: 'Preview Button',
      backgroundColor: '#3B82F6',
      backgroundOpacity: 100,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 6,
      shadowType: 'none',
      transitionDuration: 200,
    },
    hover: {
      label: 'Preview Button',
      backgroundColor: '#2563EB',
      backgroundOpacity: 100,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 6,
      shadowType: 'md',
      transitionDuration: 200,
    },
  });
  
  const { toast } = useToast();

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setSidebarCollapsed(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [buttonState]: {
        ...prev[buttonState],
        [key]: value,
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('ghl-code-builder-config', JSON.stringify(config));
    console.log('Configuration saved:', config);
  };

  const handleReset = () => {
    const defaultConfig = {
      base: {
        label: 'Preview Button',
        backgroundColor: '#3B82F6',
        backgroundOpacity: 100,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        shadowType: 'none',
        transitionDuration: 200,
      },
      hover: {
        label: 'Preview Button',
        backgroundColor: '#2563EB',
        backgroundOpacity: 100,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        shadowType: 'md',
        transitionDuration: 200,
      },
    };
    setConfig(defaultConfig);
    toast({
      title: "Reset Complete",
      description: "All settings have been reset to default values.",
    });
  };

  const handleExport = () => {
    // This would typically trigger the CSS drawer to open
    toast({
      title: "CSS Generated",
      description: "Check the bottom drawer for your generated CSS code.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSave={handleSave}
        onReset={handleReset}
        onExport={handleExport}
      />
      
      <div className="pt-16 flex">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex max-collapse:flex-col">
          <Workbench
            activeCategory={activeCategory}
            sidebarCollapsed={sidebarCollapsed}
            buttonState={buttonState}
            onStateChange={setButtonState}
            config={config}
            onConfigChange={handleConfigChange}
          />
          
          <PreviewPane
            config={config}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </div>
      
      <CSSDrawer
        config={config}
        sidebarCollapsed={sidebarCollapsed}
      />
    </div>
  );
};

export default Index;
