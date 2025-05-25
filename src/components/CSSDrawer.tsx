
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

    function getGradientValue(gradientConfig: any) {
      if (!gradientConfig) return '';
      
      const directions = {
        'left-right': 'to right',
        'top-bottom': 'to bottom',
        '45deg': '45deg',
        '135deg': '135deg'
      };
      
      const direction = directions[gradientConfig.direction as keyof typeof directions] || 'to right';
      return `linear-gradient(${direction}, ${gradientConfig.start}, ${gradientConfig.end})`;
    }

    function getBackgroundValue(configState: any) {
      if (configState?.backgroundType === 'gradient') {
        return getGradientValue(configState.backgroundGradient);
      }
      return configState?.backgroundColor || '#3B82F6';
    }

    function getBorderValue(configState: any) {
      if (configState?.borderType === 'gradient') {
        return `${configState?.borderWidth || 1}px solid transparent`;
      }
      return `${configState?.borderWidth || 1}px solid ${configState?.borderColor || '#D1D5DB'}`;
    }

    function getBorderImageValue(configState: any) {
      if (configState?.borderType === 'gradient') {
        return `${getGradientValue(configState.borderGradient)} 1`;
      }
      return 'none';
    }

    function getAnimationTransforms(animations: any) {
      if (!animations) return '';
      
      const transforms = [];
      
      if (animations.scale?.enabled) {
        transforms.push(`scale(${animations.scale.value})`);
      }
      if (animations.translate?.enabled) {
        transforms.push(`translateY(${animations.translate.value}px)`);
      }
      if (animations.rotate?.enabled) {
        transforms.push(`rotate(${animations.rotate.value}deg)`);
      }
      
      return transforms.join(' ');
    }

    function generateKeyframes(animations: any) {
      if (!animations) return '';
      
      let keyframes = '';
      
      if (animations.shake?.enabled) {
        keyframes += `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-${animations.shake.value}px); }
  75% { transform: translateX(${animations.shake.value}px); }
}`;
      }
      
      if (animations.lamination?.enabled) {
        keyframes += `
@keyframes lamination-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`;
      }
      
      return keyframes;
    }

    function getAnimationProperty(animations: any) {
      if (!animations) return '';
      
      const animationProps = [];
      
      if (animations.shake?.enabled) {
        animationProps.push('shake 0.5s ease-in-out infinite');
      }
      if (animations.pulse?.enabled) {
        animationProps.push(`pulse ${animations.pulse.value}s ease-in-out infinite`);
      }
      
      return animationProps.length > 0 ? animationProps.join(', ') : '';
    }

    const baseBackground = getBackgroundValue(baseConfig);
    const baseBorder = getBorderValue(baseConfig);
    const baseBorderImage = getBorderImageValue(baseConfig);
    
    const hoverBackground = getBackgroundValue(hoverConfig);
    const hoverBorder = getBorderValue(hoverConfig);
    const hoverBorderImage = getBorderImageValue(hoverConfig);
    const hoverTransform = getAnimationTransforms(hoverConfig.animations);
    const hoverAnimation = getAnimationProperty(hoverConfig.animations);

    const keyframes = generateKeyframes(hoverConfig.animations);

    let css = keyframes;

    css += `
.custom-button {
  background: ${baseBackground};
  border: ${baseBorder};${baseBorderImage !== 'none' ? `\n  border-image: ${baseBorderImage};` : ''}
  border-radius: ${baseConfig.borderRadius || 6}px;
  opacity: ${(baseConfig.backgroundOpacity || 100) / 100};
  box-shadow: ${getShadow(baseConfig.shadowType || 'none')};
  transition: all ${baseConfig.transitionDuration || 200}ms ease;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;${hoverConfig.animations?.lamination?.enabled ? '\n  position: relative;\n  overflow: hidden;' : ''}
}

.custom-button:hover {
  background: ${hoverBackground};
  border: ${hoverBorder};${hoverBorderImage !== 'none' ? `\n  border-image: ${hoverBorderImage};` : ''}
  opacity: ${(hoverConfig.backgroundOpacity || 100) / 100};
  box-shadow: ${getShadow(hoverConfig.shadowType || 'md')};${hoverTransform ? `\n  transform: ${hoverTransform};` : ''}${hoverAnimation ? `\n  animation: ${hoverAnimation};` : ''}
}`;

    if (hoverConfig.animations?.lamination?.enabled) {
      css += `
.custom-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(${hoverConfig.animations.lamination.angle}deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left ${hoverConfig.animations.lamination.speed}s ease;
}

.custom-button:hover::before {
  left: 100%;
}`;
    }

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
