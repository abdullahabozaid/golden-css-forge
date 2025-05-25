
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Copy, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CSSDrawerProps {
  config: any;
  sidebarCollapsed: boolean;
}

const CSSDrawer = ({ config, sidebarCollapsed }: CSSDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const generateCSS = () => {
    const baseConfig = config.base || {};
    const hoverConfig = config.hover || {};

    function getShadow(type: string) {
      const shadows = {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      };
      return shadows[type as keyof typeof shadows] || shadows.none;
    }

    const css = `.custom-button {
  background-color: ${baseConfig.backgroundColor || '#3B82F6'};
  border: ${baseConfig.borderWidth || 1}px solid ${baseConfig.borderColor || '#D1D5DB'};
  border-radius: ${baseConfig.borderRadius || 6}px;
  opacity: ${(baseConfig.backgroundOpacity || 100) / 100};
  box-shadow: ${getShadow(baseConfig.shadowType || 'none')};
  transition: all ${baseConfig.transitionDuration || 200}ms ease;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
}

.custom-button:hover {
  background-color: ${hoverConfig.backgroundColor || '#2563EB'};
  border-color: ${hoverConfig.borderColor || '#D1D5DB'};
  opacity: ${(hoverConfig.backgroundOpacity || 100) / 100};
  box-shadow: ${getShadow(hoverConfig.shadowType || 'md')};
}`;

    return css;
  };

  const handleCopyCSS = async () => {
    const css = generateCSS();
    try {
      await navigator.clipboard.writeText(css);
      toast({
        title: "CSS Copied!",
        description: "The generated CSS has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy CSS to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40 transition-all duration-200",
      sidebarCollapsed ? "collapse:left-16" : "collapse:left-60",
      "max-collapse:left-0"
    )}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="border-t-2 border-gold rounded-t-lg rounded-b-none shadow-lg">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gold flex items-center gap-2">
                  Generated CSS
                  <Copy 
                    className="w-4 h-4 cursor-pointer hover:text-gold-dark transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCSS();
                    }}
                  />
                </CardTitle>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-gold" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-gold" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="max-h-80 overflow-auto">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-800 overflow-x-auto">
                {generateCSS()}
              </pre>
              
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleCopyCSS}
                  className="bg-gold hover:bg-gold-dark text-white transition-all duration-200"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default CSSDrawer;
