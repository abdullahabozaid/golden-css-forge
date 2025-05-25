
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PreviewPaneProps {
  config: any;
  sidebarCollapsed: boolean;
}

const PreviewPane = ({ config, sidebarCollapsed }: PreviewPaneProps) => {
  const getGradientValue = (gradientConfig: any) => {
    if (!gradientConfig) return '';
    
    const directions = {
      'left-right': 'to right',
      'top-bottom': 'to bottom',
      '45deg': '45deg',
      '135deg': '135deg'
    };
    
    const direction = directions[gradientConfig.direction as keyof typeof directions] || 'to right';
    return `linear-gradient(${direction}, ${gradientConfig.start}, ${gradientConfig.end})`;
  };

  const getBackgroundStyle = (configState: any) => {
    if (configState?.backgroundType === 'gradient') {
      return getGradientValue(configState.backgroundGradient);
    }
    return configState?.backgroundColor || '#3B82F6';
  };

  const getBorderStyle = (configState: any) => {
    if (configState?.borderType === 'gradient') {
      return `${configState?.borderWidth || 1}px solid transparent`;
    }
    return `${configState?.borderWidth || 1}px solid ${configState?.borderColor || '#D1D5DB'}`;
  };

  const getBorderImageStyle = (configState: any) => {
    if (configState?.borderType === 'gradient') {
      return `${getGradientValue(configState.borderGradient)} 1`;
    }
    return 'none';
  };

  const getAnimationTransforms = (animations: any) => {
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
  };

  const getAnimationClasses = (animations: any) => {
    if (!animations) return '';
    
    const classes = [];
    
    if (animations.shake?.enabled) {
      classes.push('animate-shake');
    }
    if (animations.pulse?.enabled) {
      classes.push('animate-pulse');
    }
    
    return classes.join(' ');
  };

  const baseStyle = {
    background: getBackgroundStyle(config.base),
    border: getBorderStyle(config.base),
    borderImage: getBorderImageStyle(config.base),
    borderRadius: `${config.base?.borderRadius || 6}px`,
    opacity: (config.base?.backgroundOpacity || 100) / 100,
    boxShadow: getShadow(config.base?.shadowType || 'none'),
    transition: `all ${config.base?.transitionDuration || 200}ms ease`,
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const hoverStyle = {
    background: getBackgroundStyle(config.hover),
    border: getBorderStyle(config.hover),
    borderImage: getBorderImageStyle(config.hover),
    opacity: (config.hover?.backgroundOpacity || 100) / 100,
    boxShadow: getShadow(config.hover?.shadowType || 'md'),
    transform: getAnimationTransforms(config.hover?.animations),
  };

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

  const getLaminationStyle = (animations: any) => {
    if (!animations?.lamination?.enabled) return {};
    
    return {
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(${animations.lamination.angle}deg, transparent, rgba(255,255,255,0.3), transparent)`,
        transition: `left ${animations.lamination.speed}s ease`,
      },
      ':hover::before': {
        left: '100%',
      }
    };
  };

  return (
    <div className="w-80 flex-shrink-0 p-6">
      <Card className="border-gray-200 h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gold">Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px]">
          <button
            style={baseStyle}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              Object.assign(target.style, hoverStyle);
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              Object.assign(target.style, baseStyle);
            }}
            className={cn(
              "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50",
              getAnimationClasses(config.hover?.animations)
            )}
          >
            {config.base?.label || config.hover?.label || 'Preview Button'}
            {config.hover?.animations?.lamination?.enabled && (
              <span 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: `linear-gradient(${config.hover.animations.lamination.angle}deg, transparent, rgba(255,255,255,0.3), transparent)`,
                  animation: `sweep ${config.hover.animations.lamination.speed}s ease infinite`,
                }}
              />
            )}
          </button>
        </CardContent>
      </Card>
      
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-${config.hover?.animations?.shake?.value || 2}px); }
          75% { transform: translateX(${config.hover?.animations?.shake?.value || 2}px); }
        }
        .animate-shake:hover {
          animation: shake 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PreviewPane;
