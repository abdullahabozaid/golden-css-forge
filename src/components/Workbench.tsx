
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface WorkbenchProps {
  activeCategory: string;
  sidebarCollapsed: boolean;
  buttonState: 'base' | 'hover';
  onStateChange: (state: 'base' | 'hover') => void;
  config: any;
  onConfigChange: (key: string, value: any) => void;
}

const Workbench = ({ 
  activeCategory, 
  sidebarCollapsed, 
  buttonState, 
  onStateChange, 
  config, 
  onConfigChange 
}: WorkbenchProps) => {
  return (
    <div className={cn(
      "flex-1 p-6 transition-all duration-200",
      sidebarCollapsed ? "collapse:ml-16" : "collapse:ml-60",
      "max-collapse:ml-0"
    )}>
      <div className="max-w-4xl mx-auto">
        {/* State Tabs */}
        <Tabs value={buttonState} onValueChange={onStateChange} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="base" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Base State
            </TabsTrigger>
            <TabsTrigger value="hover" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Hover State
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category Title */}
        <h2 className="text-2xl font-bold text-gold mb-6 capitalize">
          {activeCategory} Configuration
        </h2>

        {/* Configuration Cards */}
        <div className="space-y-6">
          {/* Label Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Label</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="label-text" className="text-sm font-medium text-gray-700">
                  Button Text
                </Label>
                <Input
                  id="label-text"
                  value={config[buttonState]?.label || 'Button'}
                  onChange={(e) => onConfigChange('label', e.target.value)}
                  className="mt-1 focus:ring-gold focus:border-gold"
                  placeholder="Enter button text"
                />
              </div>
            </CardContent>
          </Card>

          {/* Background Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bg-color" className="text-sm font-medium text-gray-700">
                  Background Color
                </Label>
                <Input
                  id="bg-color"
                  type="color"
                  value={config[buttonState]?.backgroundColor || '#3B82F6'}
                  onChange={(e) => onConfigChange('backgroundColor', e.target.value)}
                  className="mt-1 h-10 focus:ring-gold focus:border-gold"
                />
              </div>
              
              <div>
                <Label htmlFor="bg-opacity" className="text-sm font-medium text-gray-700">
                  Opacity ({config[buttonState]?.backgroundOpacity || 100}%)
                </Label>
                <Slider
                  id="bg-opacity"
                  min={0}
                  max={100}
                  step={1}
                  value={[config[buttonState]?.backgroundOpacity || 100]}
                  onValueChange={(value) => onConfigChange('backgroundOpacity', value[0])}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Border Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Border</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="border-width" className="text-sm font-medium text-gray-700">
                  Border Width ({config[buttonState]?.borderWidth || 1}px)
                </Label>
                <Slider
                  id="border-width"
                  min={0}
                  max={10}
                  step={1}
                  value={[config[buttonState]?.borderWidth || 1]}
                  onValueChange={(value) => onConfigChange('borderWidth', value[0])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="border-color" className="text-sm font-medium text-gray-700">
                  Border Color
                </Label>
                <Input
                  id="border-color"
                  type="color"
                  value={config[buttonState]?.borderColor || '#D1D5DB'}
                  onChange={(e) => onConfigChange('borderColor', e.target.value)}
                  className="mt-1 h-10 focus:ring-gold focus:border-gold"
                />
              </div>
            </CardContent>
          </Card>

          {/* Border Radius Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Border Radius</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="border-radius" className="text-sm font-medium text-gray-700">
                  Radius ({config[buttonState]?.borderRadius || 6}px)
                </Label>
                <Slider
                  id="border-radius"
                  min={0}
                  max={50}
                  step={1}
                  value={[config[buttonState]?.borderRadius || 6]}
                  onValueChange={(value) => onConfigChange('borderRadius', value[0])}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Shadow Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Shadow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="shadow-type" className="text-sm font-medium text-gray-700">
                  Shadow Type
                </Label>
                <Select
                  value={config[buttonState]?.shadowType || 'none'}
                  onValueChange={(value) => onConfigChange('shadowType', value)}
                >
                  <SelectTrigger className="mt-1 focus:ring-gold focus:border-gold">
                    <SelectValue placeholder="Select shadow type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Animation Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Animation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transition-duration" className="text-sm font-medium text-gray-700">
                  Transition Duration ({config[buttonState]?.transitionDuration || 200}ms)
                </Label>
                <Slider
                  id="transition-duration"
                  min={0}
                  max={1000}
                  step={50}
                  value={[config[buttonState]?.transitionDuration || 200]}
                  onValueChange={(value) => onConfigChange('transitionDuration', value[0])}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Workbench;
