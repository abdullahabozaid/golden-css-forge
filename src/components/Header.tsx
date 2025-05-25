
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onSave: () => void;
  onReset: () => void;
  onExport: () => void;
}

const Header = ({ onSave, onReset, onExport }: HeaderProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Saved successfully",
      description: "Your workspace has been saved.",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gold">GHL Code Builder</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="border-gold text-gold hover:bg-gold hover:text-white transition-all duration-200"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="border-gold text-gold hover:bg-gold hover:text-white transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="border-gold text-gold hover:bg-gold hover:text-white transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSS
        </Button>
      </div>
    </header>
  );
};

export default Header;
