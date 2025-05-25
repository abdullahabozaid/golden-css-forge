
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
      backgroundType: 'solid' as 'solid' | 'gradient',
      backgroundGradient: {
        start: '#3B82F6',
        end: '#1E40AF',
        direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
      },
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderType: 'solid' as 'solid' | 'gradient',
      borderGradient: {
        start: '#D1D5DB',
        end: '#9CA3AF',
        direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
      },
      borderRadius: 6,
      shadowType: 'none',
      transitionDuration: 200,
      animations: {
        scale: { enabled: false, value: 1.05 },
        translate: { enabled: false, value: -2 },
        rotate: { enabled: false, value: 0 },
        shake: { enabled: false, value: 2 },
        pulse: { enabled: false, value: 1 },
        lamination: { enabled: false, speed: 1, angle: 45 }
      }
    },
    hover: {
      label: 'Preview Button',
      backgroundColor: '#2563EB',
      backgroundOpacity: 100,
      backgroundType: 'solid' as 'solid' | 'gradient',
      backgroundGradient: {
        start: '#2563EB',
        end: '#1D4ED8',
        direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
      },
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderType: 'solid' as 'solid' | 'gradient',
      borderGradient: {
        start: '#D1D5DB',
        end: '#9CA3AF',
        direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
      },
      borderRadius: 6,
      shadowType: 'md',
      transitionDuration: 200,
      animations: {
        scale: { enabled: false, value: 1.05 },
        translate: { enabled: false, value: -2 },
        rotate: { enabled: false, value: 0 },
        shake: { enabled: false, value: 2 },
        pulse: { enabled: false, value: 1 },
        lamination: { enabled: false, speed: 1, angle: 45 }
      }
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
        backgroundType: 'solid' as 'solid' | 'gradient',
        backgroundGradient: {
          start: '#3B82F6',
          end: '#1E40AF',
          direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
        },
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderType: 'solid' as 'solid' | 'gradient',
        borderGradient: {
          start: '#D1D5DB',
          end: '#9CA3AF',
          direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
        },
        borderRadius: 6,
        shadowType: 'none',
        transitionDuration: 200,
        animations: {
          scale: { enabled: false, value: 1.05 },
          translate: { enabled: false, value: -2 },
          rotate: { enabled: false, value: 0 },
          shake: { enabled: false, value: 2 },
          pulse: { enabled: false, value: 1 },
          lamination: { enabled: false, speed: 1, angle: 45 }
        }
      },
      hover: {
        label: 'Preview Button',
        backgroundColor: '#2563EB',
        backgroundOpacity: 100,
        backgroundType: 'solid' as 'solid' | 'gradient',
        backgroundGradient: {
          start: '#2563EB',
          end: '#1D4ED8',
          direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
        },
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderType: 'solid' as 'solid' | 'gradient',
        borderGradient: {
          start: '#D1D5DB',
          end: '#9CA3AF',
          direction: 'left-right' as 'left-right' | 'top-bottom' | '45deg' | '135deg'
        },
        borderRadius: 6,
        shadowType: 'md',
        transitionDuration: 200,
        animations: {
          scale: { enabled: false, value: 1.05 },
          translate: { enabled: false, value: -2 },
          rotate: { enabled: false, value: 0 },
          shake: { enabled: false, value: 2 },
          pulse: { enabled: false, value: 1 },
          lamination: { enabled: false, speed: 1, angle: 45 }
        }
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
      
      <div className="pt-16 flex h-[calc(100vh-4rem)]">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex flex-1 min-w-0">
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
