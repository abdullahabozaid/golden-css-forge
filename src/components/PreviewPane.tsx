
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PreviewPaneProps {
  config: any;
  sidebarCollapsed: boolean;
}

const PreviewPane = ({ config, sidebarCollapsed }: PreviewPaneProps) => {
  const baseStyle = {
    backgroundColor: config.base?.backgroundColor || '#3B82F6',
    borderWidth: `${config.base?.borderWidth || 1}px`,
    borderColor: config.base?.borderColor || '#D1D5DB',
    borderRadius: `${config.base?.borderRadius || 6}px`,
    borderStyle: 'solid',
    opacity: (config.base?.backgroundOpacity || 100) / 100,
    boxShadow: getShadow(config.base?.shadowType || 'none'),
    transition: `all ${config.base?.transitionDuration || 200}ms ease`,
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const hoverStyle = {
    backgroundColor: config.hover?.backgroundColor || '#2563EB',
    borderColor: config.hover?.borderColor || '#D1D5DB',
    opacity: (config.hover?.backgroundOpacity || 100) / 100,
    boxShadow: getShadow(config.hover?.shadowType || 'md'),
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

  return (
    <div className={cn(
      "w-full collapse:w-96 collapse:fixed collapse:right-6 collapse:top-24 collapse:bottom-6",
      "max-collapse:relative max-collapse:mt-8"
    )}>
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
            className="focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
          >
            {config.base?.label || config.hover?.label || 'Preview Button'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewPane;
