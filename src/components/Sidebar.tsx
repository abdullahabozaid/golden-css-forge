
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MousePointer, 
  Sliders, 
  Palette, 
  Type, 
  Star, 
  Square, 
  Circle,
  Menu,
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const categories = [
  { id: 'buttons', label: 'Buttons', icon: MousePointer },
  { id: 'sliders', label: 'Sliders', icon: Sliders },
  { id: 'backgrounds', label: 'Backgrounds', icon: Palette },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'icons', label: 'Icons', icon: Star },
  { id: 'borders', label: 'Borders', icon: Square },
  { id: 'shapes', label: 'Shapes', icon: Circle },
];

const Sidebar = ({ activeCategory, onCategoryChange, isCollapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 collapse:hidden"
          onClick={onToggleCollapse}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 z-50 transition-all duration-200",
        isCollapsed ? "w-16" : "w-60",
        "collapse:relative collapse:z-auto"
      )}>
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="mb-4 w-full justify-start collapse:hidden"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4 mr-2" />}
            {!isCollapsed && "Collapse"}
          </Button>
          
          <nav className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left",
                    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50",
                    isActive 
                      ? "bg-gold bg-opacity-10 text-gold font-bold border-l-4 border-gold" 
                      : "text-gray-700"
                  )}
                  aria-label={category.label}
                >
                  <Icon className={cn("w-5 h-5", isCollapsed ? "mx-auto" : "mr-3")} />
                  {!isCollapsed && (
                    <span className="truncate">{category.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
