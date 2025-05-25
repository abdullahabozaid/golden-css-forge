
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import ColorSwatch from '@/components/ColorSwatch';
import AnimationCard from '@/components/AnimationCard';

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
  const currentConfig = config[buttonState] || {};

  const handleGradientChange = (type: 'background' | 'border', key: string, value: any) => {
    const gradientKey = type === 'background' ? 'backgroundGradient' : 'borderGradient';
    onConfigChange(gradientKey, {
      ...currentConfig[gradientKey],
      [key]: value
    });
  };

  const handleAnimationChange = (animationType: string, key: string, value: any) => {
    onConfigChange('animations', {
      ...currentConfig.animations,
      [animationType]: {
        ...currentConfig.animations?.[animationType],
        [key]: value
      }
    });
  };

  const getDirectionFromSliderValue = (value: number) => {
    const directions = ['left-right', 'top-bottom', '45deg', '135deg'];
    return directions[Math.floor(value)] || 'left-right';
  };

  const getSliderValueFromDirection = (direction: string) => {
    const directions = ['left-right', 'top-bottom', '45deg', '135deg'];
    return directions.indexOf(direction);
  };

  const getDirectionLabel = (direction: string) => {
    const labels = {
      'left-right': 'Left→Right',
      'top-bottom': 'Top→Bottom',
      '45deg': '45°',
      '135deg': '135°'
    };
    return labels[direction as keyof typeof labels] || 'Left→Right';
  };

  return (
    <div className={cn(
      "p-6 pl-16 transition-all duration-200 max-collapse:ml-0",
      sidebarCollapsed ? "collapse:ml-16" : "collapse:ml-60",
      // Add proper width constraints to prevent overlap
      "collapse:max-w-[calc(100vw-480px)]", // Leave space for preview pane (384px + 96px margin)
      "max-collapse:max-w-none"
    )}>
      <div className="max-w-2xl"> {/* Reduced from max-w-4xl to max-w-2xl */}
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
                  value={currentConfig?.label || 'Button'}
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Type</Label>
                <ToggleGroup
                  type="single"
                  value={currentConfig?.backgroundType || 'solid'}
                  onValueChange={(value) => value && onConfigChange('backgroundType', value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="solid" className="data-[state=on]:bg-gold data-[state=on]:text-white">
                    Solid
                  </ToggleGroupItem>
                  <ToggleGroupItem value="gradient" className="data-[state=on]:bg-gold data-[state=on]:text-white">
                    Gradient
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {currentConfig?.backgroundType === 'solid' ? (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Background Color
                  </Label>
                  <ColorSwatch
                    value={currentConfig?.backgroundColor || '#3B82F6'}
                    onChange={(value) => onConfigChange('backgroundColor', value)}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Start Color</Label>
                      <ColorSwatch
                        value={currentConfig?.backgroundGradient?.start || '#3B82F6'}
                        onChange={(value) => handleGradientChange('background', 'start', value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">End Color</Label>
                      <ColorSwatch
                        value={currentConfig?.backgroundGradient?.end || '#1E40AF'}
                        onChange={(value) => handleGradientChange('background', 'end', value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Direction: {getDirectionLabel(currentConfig?.backgroundGradient?.direction || 'left-right')}
                    </Label>
                    <Slider
                      min={0}
                      max={3}
                      step={1}
                      value={[getSliderValueFromDirection(currentConfig?.backgroundGradient?.direction || 'left-right')]}
                      onValueChange={(value) => handleGradientChange('background', 'direction', getDirectionFromSliderValue(value[0]))}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="bg-opacity" className="text-sm font-medium text-gray-700">
                  Opacity ({currentConfig?.backgroundOpacity || 100}%)
                </Label>
                <Slider
                  id="bg-opacity"
                  min={0}
                  max={100}
                  step={1}
                  value={[currentConfig?.backgroundOpacity || 100]}
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
                  Border Width ({currentConfig?.borderWidth || 1}px)
                </Label>
                <Slider
                  id="border-width"
                  min={0}
                  max={10}
                  step={1}
                  value={[currentConfig?.borderWidth || 1]}
                  onValueChange={(value) => onConfigChange('borderWidth', value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Type</Label>
                <ToggleGroup
                  type="single"
                  value={currentConfig?.borderType || 'solid'}
                  onValueChange={(value) => value && onConfigChange('borderType', value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="solid" className="data-[state=on]:bg-gold data-[state=on]:text-white">
                    Solid
                  </ToggleGroupItem>
                  <ToggleGroupItem value="gradient" className="data-[state=on]:bg-gold data-[state=on]:text-white">
                    Gradient
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {currentConfig?.borderType === 'solid' ? (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Border Color
                  </Label>
                  <ColorSwatch
                    value={currentConfig?.borderColor || '#D1D5DB'}
                    onChange={(value) => onConfigChange('borderColor', value)}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Start Color</Label>
                      <ColorSwatch
                        value={currentConfig?.borderGradient?.start || '#D1D5DB'}
                        onChange={(value) => handleGradientChange('border', 'start', value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">End Color</Label>
                      <ColorSwatch
                        value={currentConfig?.borderGradient?.end || '#9CA3AF'}
                        onChange={(value) => handleGradientChange('border', 'end', value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Direction: {getDirectionLabel(currentConfig?.borderGradient?.direction || 'left-right')}
                    </Label>
                    <Slider
                      min={0}
                      max={3}
                      step={1}
                      value={[getSliderValueFromDirection(currentConfig?.borderGradient?.direction || 'left-right')]}
                      onValueChange={(value) => handleGradientChange('border', 'direction', getDirectionFromSliderValue(value[0]))}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
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
                  Radius ({currentConfig?.borderRadius || 6}px)
                </Label>
                <Slider
                  id="border-radius"
                  min={0}
                  max={50}
                  step={1}
                  value={[currentConfig?.borderRadius || 6]}
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
                  value={currentConfig?.shadowType || 'none'}
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

          {/* Animation Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gold">Animation Presets</h3>
            
            <AnimationCard
              title="Scale"
              enabled={currentConfig?.animations?.scale?.enabled || false}
              onEnabledChange={(enabled) => handleAnimationChange('scale', 'enabled', enabled)}
            >
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Scale to ({currentConfig?.animations?.scale?.value || 1.05}×)
                </Label>
                <Slider
                  min={1}
                  max={2}
                  step={0.05}
                  value={[currentConfig?.animations?.scale?.value || 1.05]}
                  onValueChange={(value) => handleAnimationChange('scale', 'value', value[0])}
                  className="mt-2"
                />
              </div>
            </AnimationCard>

            <AnimationCard
              title="Translate"
              enabled={currentConfig?.animations?.translate?.enabled || false}
              onEnabledChange={(enabled) => handleAnimationChange('translate', 'enabled', enabled)}
            >
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Translate Y ({currentConfig?.animations?.translate?.value || -2}px)
                </Label>
                <Slider
                  min={-20}
                  max={20}
                  step={1}
                  value={[currentConfig?.animations?.translate?.value || -2]}
                  onValueChange={(value) => handleAnimationChange('translate', 'value', value[0])}
                  className="mt-2"
                />
              </div>
            </AnimationCard>

            <AnimationCard
              title="Rotate"
              enabled={currentConfig?.animations?.rotate?.enabled || false}
              onEnabledChange={(enabled) => handleAnimationChange('rotate', 'enabled', enabled)}
            >
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Rotate ({currentConfig?.animations?.rotate?.value || 0}°)
                </Label>
                <Slider
                  min={0}
                  max={45}
                  step={1}
                  value={[currentConfig?.animations?.rotate?.value || 0]}
                  onValueChange={(value) => handleAnimationChange('rotate', 'value', value[0])}
                  className="mt-2"
                />
              </div>
            </AnimationCard>

            <AnimationCard
              title="Shake"
              enabled={currentConfig?.animations?.shake?.enabled || false}
              onEnabledChange={(enabled) => handleAnimationChange('shake', 'enabled', enabled)}
            >
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Shake intensity ({currentConfig?.animations?.shake?.value || 2}px)
                </Label>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[currentConfig?.animations?.shake?.value || 2]}
                  onValueChange={(value) => handleAnimationChange('shake', 'value', value[0])}
                  className="mt-2"
                />
              </div>
            </AnimationCard>

            <AnimationCard
              title="Pulse"
              enabled={currentConfig?.animations?.pulse?.enabled || false}
              onEnabledChange={(enabled) => handleAnimationChange('pulse', 'enabled', enabled)}
            >
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Pulse duration ({currentConfig?.animations?.pulse?.value || 1}s)
                </Label>
                <Slider
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={[currentConfig?.animations?.pulse?.value || 1]}
                  onValueChange={(value) => handleAnimationChange('pulse', 'value', value[0])}
                  className="mt-2"
                />
              </div>
            </AnimationCard>

            <AnimationCard
              title="Lamination Sweep"
              enabled={currentConfig?.animations?.lamination?.enabled || false}
              onEnabledChange={(enabled) => handleAnimationChange('lamination', 'enabled', enabled)}
            >
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Sweep speed ({currentConfig?.animations?.lamination?.speed || 1}s)
                  </Label>
                  <Slider
                    min={0.5}
                    max={5}
                    step={0.1}
                    value={[currentConfig?.animations?.lamination?.speed || 1]}
                    onValueChange={(value) => handleAnimationChange('lamination', 'speed', value[0])}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Angle ({currentConfig?.animations?.lamination?.angle || 45}°)
                  </Label>
                  <Slider
                    min={0}
                    max={90}
                    step={1}
                    value={[currentConfig?.animations?.lamination?.angle || 45]}
                    onValueChange={(value) => handleAnimationChange('lamination', 'angle', value[0])}
                    className="mt-2"
                  />
                </div>
              </div>
            </AnimationCard>
          </div>

          {/* Transition Duration Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gold">Transition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transition-duration" className="text-sm font-medium text-gray-700">
                  Transition Duration ({currentConfig?.transitionDuration || 200}ms)
                </Label>
                <Slider
                  id="transition-duration"
                  min={0}
                  max={1000}
                  step={50}
                  value={[currentConfig?.transitionDuration || 200]}
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
